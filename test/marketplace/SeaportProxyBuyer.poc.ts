import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { getAdvancedOrderNumeratorDenominator } from '@opensea/seaport-js/lib/utils/fulfill';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { CreateOrderInput, MatchOrdersFulfillment } from '@opensea/seaport-js/lib/types';
import { AdvancedOrderStruct } from '@opensea/seaport-js/lib/typechain-types/seaport/contracts/Seaport';
import { mintRandomDomain } from '../helpers/registry';
import { UNSRegistry } from '../../types/contracts';
import { UNSRegistry__factory } from '../../types/factories/contracts';
import { ERC20Mock__factory } from '../../types/factories/contracts/mocks';
import { Seaport__factory as SeaportContract__factory } from '../../types/factories/seaport-core/src';
import { ConduitController__factory } from '../../types/factories/seaport-core/src/conduit';
import { Seaport as SeaportContract } from '../../types/seaport-core/src';
import { ConduitController } from '../../types/seaport-core/src/conduit';
import { ERC20Mock } from '../../types/contracts/mocks/ERC20Mock';
import { ZERO_ADDRESS } from '../helpers/constants';
import { TLD } from '../../src/tlds';
import { OrderStruct } from '../../types/seaport-core/src/Seaport';

describe('SeaportProxyBuyer-POC', async () => {
  let unsRegistry: UNSRegistry,
    seaportContract: SeaportContract,
    conduitController: ConduitController,
    usdcMock: ERC20Mock;

  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    seller: SignerWithAddress,
    buyer: SignerWithAddress,
    reader: SignerWithAddress,
    feesRecipient: SignerWithAddress;

  let tokenIdToSell: bigint;
  let seaportSdk: seaportjs;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, seller, buyer, reader, feesRecipient] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.crypto.hash, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
    await unsRegistry.addProxyReader(reader.address);

    conduitController = await new ConduitController__factory(coinbase).deploy();
    seaportContract = await new SeaportContract__factory(coinbase).deploy(await conduitController.getAddress());
    usdcMock = await new ERC20Mock__factory(coinbase).deploy();

    seaportSdk = new seaportjs(seller, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });
  });

  beforeEach(async () => {
    await usdcMock.mint(buyer.address, ethers.parseUnits('250000', 6));
    tokenIdToSell = await mintRandomDomain({ unsRegistry, owner: seller.address, tld: 'crypto' });
  });

  const createAndSignOrder = async (createOrderInput: CreateOrderInput, signer: SignerWithAddress) => {
    seaportSdk = new seaportjs(signer, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });
    const order = await seaportSdk.createOrder(createOrderInput, signer.address);
    const seaportOrderData = await order.executeAllActions();
    const fulfillOrderData: OrderStruct = {
      ...seaportOrderData,
      parameters: {
        ...seaportOrderData.parameters,
        consideration: seaportOrderData.parameters.consideration,
        totalOriginalConsiderationItems: seaportOrderData.parameters.consideration.length,
      },
    };
    const { numerator, denominator } = getAdvancedOrderNumeratorDenominator(seaportOrderData);

    return { ...fulfillOrderData, numerator, denominator, extraData: '0x' };
  };

  describe('Regular transactions', async () => {
    it('should match two seaport orders', async () => {
      await usdcMock.connect(buyer).approve(await seaportContract.getAddress(), ethers.MaxUint256);
      await unsRegistry.connect(seller).setApprovalForAll(await seaportContract.getAddress(), true);

      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const feesAmount = (priceToSell * recipientFeesBasisPoints) / BigInt(10000);

      const domainsSellerOfferData: CreateOrderInput = {
        offer: [
          {
            token: await unsRegistry.getAddress(),
            itemType: ItemType.ERC721,
            identifier: tokenIdToSell.toString(),
          },
        ],
        consideration: [
          {
            token: await usdcMock.getAddress(),
            amount: priceToSell.toString(),
          },
        ],
        fees: [
          {
            recipient: feesRecipient.address,
            basisPoints: Number(recipientFeesBasisPoints),
          },
        ],
      };

      const counterOfferData: CreateOrderInput = {
        offer: [
          {
            token: await usdcMock.getAddress(),
            amount: priceToSell.toString(),
          },
        ],
        consideration: [
          {
            token: await unsRegistry.getAddress(),
            itemType: ItemType.ERC721,
            identifier: tokenIdToSell.toString(),
          },
        ],
      };

      const domainSellerOrder = await createAndSignOrder(domainsSellerOfferData, seller);
      const counterOrder = await createAndSignOrder(counterOfferData, buyer);

      const orders: AdvancedOrderStruct[] = [domainSellerOrder, counterOrder];
      const fulfillments: MatchOrdersFulfillment[] = [
        {
          offerComponents: [{ orderIndex: 0, itemIndex: 0 }],
          considerationComponents: [{ orderIndex: 1, itemIndex: 0 }],
        }, // NFT from Order 1 to Buyer in Order 2
        {
          offerComponents: [{ orderIndex: 1, itemIndex: 0 }],
          considerationComponents: [{ orderIndex: 0, itemIndex: 0 }],
        }, // USDC from Order 2 to Seller in Order 1
        {
          offerComponents: [{ orderIndex: 1, itemIndex: 0 }],
          considerationComponents: [{ orderIndex: 0, itemIndex: 1 }],
        }, // USDC from Order 2 to Marketplace in Order 1
      ];

      const initialBuyerBalance = await usdcMock.balanceOf(buyer.address);
      const initialSellerBalance = await usdcMock.balanceOf(seller.address);
      const initialFeesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      await seaportContract.connect(reader).matchAdvancedOrders(orders, [], fulfillments, ZERO_ADDRESS);

      const sellerBalance = await usdcMock.balanceOf(seller.address);
      const buyerBalance = await usdcMock.balanceOf(buyer.address);
      const domainOwner = await unsRegistry.ownerOf(tokenIdToSell);
      const feesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      const readerBalance = await usdcMock.balanceOf(reader.address);

      expect(sellerBalance).to.be.eq(initialSellerBalance + priceToSell - feesAmount);
      expect(feesRecipientBalance).to.be.eq(initialFeesRecipientBalance + feesAmount);
      expect(buyerBalance).to.be.eq(initialBuyerBalance - priceToSell);
      expect(domainOwner).to.be.eq(buyer.address);
      expect(readerBalance).to.be.eq(0);
    });
  });
});
