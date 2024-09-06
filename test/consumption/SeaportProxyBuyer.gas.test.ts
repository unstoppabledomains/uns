import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { getAdvancedOrderNumeratorDenominator } from '@opensea/seaport-js/lib/utils/fulfill';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { CreateOrderInput } from '@opensea/seaport-js/lib/types';
import { mintRandomDomain } from '../helpers/registry';
import { UNSRegistry } from '../../types/contracts';
import { UNSRegistry__factory } from '../../types/factories/contracts';
import { ERC20Mock__factory } from '../../types/factories/contracts/mocks';
import { SeaportProxyBuyer__factory } from '../../types/factories/contracts/marketplace';
import { Seaport__factory as SeaportContract__factory } from '../../types/factories/seaport-core/src';
import { ConduitController__factory } from '../../types/factories/seaport-core/src/conduit';
import { SeaportProxyBuyer } from '../../types/contracts/marketplace';
import { Seaport as SeaportContract } from '../../types/seaport-core/src';
import { ConduitController } from '../../types/seaport-core/src/conduit';
import { ERC20Mock } from '../../types/contracts/mocks/ERC20Mock';
import { ZERO_ADDRESS } from '../helpers/constants';
import { TLD } from '../../src/tlds';
import { deployProxy } from '../../src/helpers';
import { OrderStruct } from '../../types/seaport-core/src/Seaport';
import { ExecuteFunc, buildExecuteFunc } from '../helpers/metatx';

describe('SeaportProxyBuyer (consumption)', () => {
  let unsRegistry: UNSRegistry,
    seaportProxyBuyer: SeaportProxyBuyer,
    seaportContract: SeaportContract,
    conduitController: ConduitController,
    usdcMock: ERC20Mock,
    seaportProxyBuyerFactory: SeaportProxyBuyer__factory;

  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    seller: SignerWithAddress,
    buyer: SignerWithAddress,
    reader: SignerWithAddress,
    feesRecipient: SignerWithAddress;

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

    seaportProxyBuyerFactory = new SeaportProxyBuyer__factory(coinbase);
    seaportProxyBuyer = (await deployProxy<SeaportProxyBuyer>(
      seaportProxyBuyerFactory,
      [await seaportContract.getAddress(), await usdcMock.getAddress()],
      { initializer: false },
    )) as SeaportProxyBuyer;
    await seaportProxyBuyer.initialize(await seaportContract.getAddress());
    await seaportProxyBuyer.connect(coinbase).approve(await usdcMock.getAddress());
    await seaportProxyBuyer.addMinter(coinbase.address);
    seaportSdk = new seaportjs(seller, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });
  });

  beforeEach(async () => {
    await usdcMock.mint(await seaportProxyBuyer.getAddress(), ethers.parseUnits('250000', 6));
    await unsRegistry.connect(seller).setApprovalForAll(await seaportContract.getAddress(), true);
  });

  const generateOrderInputData = async (
    tokenIdentifier: bigint,
    priceToSell: bigint,
    recipientFeesBasisPoints: bigint,
    zone?: string,
  ): Promise<CreateOrderInput> => {
    return {
      zone,
      restrictedByZone: true,
      offer: [
        {
          token: await unsRegistry.getAddress(),
          itemType: ItemType.ERC721,
          identifier: tokenIdentifier.toString(),
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
  };

  const createOrder = async (priceToSell: bigint, recipientFeesBasisPoints: bigint, zone?: string) => {
    const tokenIdToSell = await mintRandomDomain({ unsRegistry, owner: seller.address, tld: 'x' });
    const order = await seaportSdk.createOrder(
      await generateOrderInputData(tokenIdToSell, priceToSell, recipientFeesBasisPoints, zone),
      seller.address,
    );
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

    const hash = ethers.toBigInt(seaportSdk.getOrderHash(seaportOrderData.parameters));
    return { fulfillOrderData, numerator, denominator, hash, tokenId: tokenIdToSell.toString() };
  };

  const createBulkOrders = async (
    priceToSell: bigint,
    recipientFeesBasisPoints: bigint,
    zone?: string,
    domainsAmount = 10,
  ) => {
    const mintingPromises = Array.from({ length: domainsAmount }, async () => {
      return await mintRandomDomain({ unsRegistry, owner: seller.address, tld: 'x' });
    });
    const mintedTokenIds = await Promise.all(mintingPromises);
    const orderInputDataPromises = mintedTokenIds.map(async (tokenId) => {
      return await generateOrderInputData(tokenId, priceToSell, recipientFeesBasisPoints, zone);
    });
    const orderInputData = await Promise.all(orderInputDataPromises);
    const bulkOrder = await seaportSdk.createBulkOrders(orderInputData, seller.address);
    const seaportBulkOrderData = await bulkOrder.executeAllActions();
    const bulksFullfillOrdersData: {
      fulfillOrderData: OrderStruct;
      numerator: bigint;
      denominator: bigint;
      hash: bigint;
      tokenId: string;
    }[] = seaportBulkOrderData.map((orderData) => {
      const fulfillOrderData: OrderStruct = {
        ...orderData,
        parameters: {
          ...orderData.parameters,
          consideration: orderData.parameters.consideration,
          totalOriginalConsiderationItems: orderData.parameters.consideration.length,
        },
      };
      const { numerator, denominator } = getAdvancedOrderNumeratorDenominator(orderData);
      const hash = ethers.toBigInt(seaportSdk.getOrderHash(orderData.parameters));
      return {
        fulfillOrderData,
        numerator,
        denominator,
        hash,
        tokenId: orderData.parameters.offer[0].identifierOrCriteria,
      };
    });

    return bulksFullfillOrdersData;
  };

  describe('Meta transactions', () => {
    let buildExecuteParams: ExecuteFunc;

    before(async () => {
      buildExecuteParams = buildExecuteFunc(
        seaportProxyBuyer.interface,
        await seaportProxyBuyer.getAddress(),
        seaportProxyBuyer,
      );
    });

    const executeOrder = async (order: {
      fulfillOrderData: OrderStruct;
      numerator: bigint;
      denominator: bigint;
      hash: bigint;
      tokenId: string;
    }) => {
      const { fulfillOrderData, numerator, denominator, hash } = order;
      const { req, signature } = await buildExecuteParams(
        'fulfillAdvancedOrder',
        [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
        coinbase,
        hash,
      );
      return await (await seaportProxyBuyer.connect(seller).execute(req, signature)).wait();
    };

    it('should estimate gas for single order', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const zone = await seaportProxyBuyer.getAddress();
      const order = await createOrder(priceToSell, recipientFeesBasisPoints, zone);
      const receipt = await executeOrder(order);
      console.table([{ gasUsed: receipt?.gasUsed.toString() }]);
    });

    it('should estimate gas for bulk orders', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const zone = await seaportProxyBuyer.getAddress();
      const receiptPromises: Promise<{ ordersAmount: number; gasUsed: string | undefined }>[] = [];
      for (const i of [1, 10, 50, 100]) {
        const orders = await createBulkOrders(priceToSell, recipientFeesBasisPoints, zone, i);
        receiptPromises.push(
          (async () => {
            const receipt = await executeOrder(orders[0]);
            return {
              ordersAmount: i,
              gasUsed: receipt?.gasUsed.toString(),
            };
          })(),
        );
      }
      const result = await Promise.all(receiptPromises);
      console.table(result);
    });
  });
});
