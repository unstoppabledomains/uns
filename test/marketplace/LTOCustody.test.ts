import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { CreateOrderAction, CreateOrderInput, SeaportContract } from '@opensea/seaport-js/lib/types';
import { expect } from 'chai';
import { namehash, Signature, Signer, TypedDataEncoder } from 'ethers';
import { ethers } from 'hardhat';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { OrderStruct } from '@opensea/seaport-js/lib/typechain-types/seaport-core/src/lib/Consideration';
import { EIP_712_ORDER_TYPE, ItemType } from '@opensea/seaport-js/lib/constants';
import { getAdvancedOrderNumeratorDenominator } from '@opensea/seaport-js/lib/utils/fulfill';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
import { ConduitController__factory } from '../../types/factories/seaport-core/src/conduit';
import { Seaport__factory as SeaportContract__factory } from '../../types/factories/seaport-core/src';
import {
  MintingManager,
  MintingManager__factory,
  LTOCustody,
  LTOCustody__factory,
  RegistrarCustody,
  RegistrarCustody__factory,
  SeaportProxyBuyer,
  SeaportProxyBuyer__factory,
  UNSRegistry,
  UNSRegistry__factory,
  ERC20Mock,
  ConduitController,
  ERC20Mock__factory,
} from '../../types';
import { deployProxy } from '../../src/helpers';
import { ZERO_ADDRESS } from '../helpers/constants';
import { getLatestBlockTimestamp } from '../helpers/utils';

describe('LTOCustody', () => {
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    registrar: SignerWithAddress,
    custodyAdmin: SignerWithAddress,
    seller: SignerWithAddress,
    buyer: SignerWithAddress,
    otherUser: SignerWithAddress,
    feesRecipient: SignerWithAddress;

  let seaportContract: SeaportContract,
    conduitController: ConduitController,
    usdcMock: ERC20Mock,
    seaportProxyBuyerFactory: SeaportProxyBuyer__factory,
    seaportProxyBuyer: SeaportProxyBuyer,
    seaportSdk: seaportjs,
    unsRegistry: UNSRegistry,
    mintingManager: MintingManager,
    ltoCustody: LTOCustody,
    registrarCustody: RegistrarCustody;

  let provider: HardhatEthersProvider;
  let latestBlockTimestamp: number;

  const registrarId = BigInt(42);
  let snapshotId: unknown;
  let nftIdToTrade: bigint;

  const generateOrderInputData = async (
    tokenIdentifier: bigint,
    priceToSell: bigint,
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
    };
  };

  const createOrder = async (tokenIdentifier: bigint, price: bigint, customer: SignerWithAddress, zone?: string) => {
    seaportSdk = new seaportjs(customer as unknown as Signer, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });

    const order = await seaportSdk.createOrder(
      await generateOrderInputData(tokenIdentifier, price, zone),
      customer.address,
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
    return { fulfillOrderData, numerator, denominator, hash };
  };

  const createRegistrarCustodyOrder = async (tokenId: bigint, priceToSell: bigint, zone?: string) => {
    seaportSdk = new seaportjs(registrar as unknown as Signer, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });

    const order = await seaportSdk.createOrder(
      await generateOrderInputData(tokenId, priceToSell, zone),
      await registrarCustody.getAddress(),
    );
    const createOrderAction = order.actions[0] as CreateOrderAction;

    const { domain, message } = JSON.parse(await createOrderAction.getMessageToSign());
    const eip712Hash = TypedDataEncoder.hash(domain, EIP_712_ORDER_TYPE, message);

    const seaportOrderData = await order.executeAllActions();
    const fulfillOrderData: OrderStruct = {
      signature: Signature.from(seaportOrderData.signature).serialized,
      parameters: {
        ...seaportOrderData.parameters,
        consideration: seaportOrderData.parameters.consideration,
        totalOriginalConsiderationItems: seaportOrderData.parameters.consideration.length,
      },
    };
    const { numerator, denominator } = getAdvancedOrderNumeratorDenominator(seaportOrderData);

    return { fulfillOrderData, eip712Hash, numerator, denominator };
  };

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [coinbase, registrar, custodyAdmin, seller, buyer, otherUser, feesRecipient] = signers;

    unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
    mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
    await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    await mintingManager.initialize(
      await unsRegistry.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.setTokenURIPrefix('/');
    await mintingManager.addTld('com', true);
    await mintingManager.addTld('crypto', false);

    latestBlockTimestamp = await getLatestBlockTimestamp();

    // setup seaport for initializing ltos
    conduitController = await new ConduitController__factory().connect(coinbase).deploy();
    seaportContract = await new SeaportContract__factory()
      .connect(coinbase)
      .deploy(await conduitController.getAddress());
    usdcMock = await new ERC20Mock__factory().connect(coinbase).deploy();

    seaportProxyBuyerFactory = new SeaportProxyBuyer__factory().connect(coinbase);
    seaportProxyBuyer = (await deployProxy<SeaportProxyBuyer>(
      seaportProxyBuyerFactory,
      [await seaportContract.getAddress(), await usdcMock.getAddress()],
      { initializer: false },
    )) as SeaportProxyBuyer;
    await seaportProxyBuyer.initialize(await seaportContract.getAddress());
    await seaportProxyBuyer.connect(coinbase).approve(await usdcMock.getAddress());
    await seaportProxyBuyer.addMinter(coinbase.address);

    seaportSdk = new seaportjs(registrar as unknown as Signer, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });

    await usdcMock.mint(await seaportProxyBuyer.getAddress(), ethers.parseUnits('250000', 6));

    ltoCustody = await deployProxy(new LTOCustody__factory().connect(coinbase), [
      await unsRegistry.getAddress(),
      await seaportProxyBuyer.getAddress(),
    ]);

    await ltoCustody.connect(coinbase).addCustodyAdmin(custodyAdmin.address);
    await seaportProxyBuyer.addMinter(await ltoCustody.getAddress());

    // registrar custody for testing registrar custody integration
    registrarCustody = await deployProxy(new RegistrarCustody__factory().connect(coinbase), [
      await unsRegistry.getAddress(),
      await mintingManager.getAddress(),
    ]);

    await mintingManager.addMinter(registrar.address);
    await mintingManager.addMinter(await registrarCustody.getAddress());

    await registrarCustody.connect(coinbase).addAdmin(registrar.address);
    await registrarCustody.connect(coinbase).addRegistrar(registrarId, registrar.address);
    await registrarCustody.connect(coinbase).setApprovalForAll(await seaportContract.getAddress(), true);

    const labels = ['brad', 'crypto'];
    nftIdToTrade = await unsRegistry.namehash(labels);
    await mintingManager.connect(registrar).issueWithRecords(seller.address, labels, [], [], true);

    await usdcMock.mint(await seaportProxyBuyer.getAddress(), ethers.parseUnits('250000', 6));
  });

  beforeEach(async () => {
    snapshotId = await provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await provider.send('evm_revert', [snapshotId]);
  });

  describe('initiate lto', () => {
    it('should initiate lto from order', async () => {
      const priceToSell = ethers.parseUnits('100', 6);
      const { fulfillOrderData, numerator, denominator } = await createOrder(
        nftIdToTrade,
        priceToSell,
        seller,
        await seaportProxyBuyer.getAddress(),
      );
      const ltoId = BigInt(1);
      await ltoCustody
        .connect(custodyAdmin)
        .initiateLTOFromOrder(
          ltoId,
          { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
          [],
          ethers.ZeroHash,
          buyer.address,
        );

      const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(domainOwner).to.be.eq(await ltoCustody.getAddress());

      const lto = await ltoCustody.getLTOData(ltoId);
      expect(lto.seller).to.be.eq(seller.address);
      expect(lto.buyer).to.be.eq(buyer.address);
      expect(lto.tokenId).to.be.eq(nftIdToTrade);
    });

    it('should initiate lto directly', async () => {
      const ltoId = BigInt(1);
      await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
      await ltoCustody.connect(custodyAdmin).initiateLTO(ltoId, seller.address, buyer.address, nftIdToTrade);

      const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(domainOwner).to.be.eq(await ltoCustody.getAddress());

      const lto = await ltoCustody.getLTOData(ltoId);
      expect(lto.seller).to.be.eq(seller.address);
      expect(lto.buyer).to.be.eq(buyer.address);
      expect(lto.tokenId).to.be.eq(nftIdToTrade);
    });
  });

  describe('lifecycle functions', () => {
    const ltoId = BigInt(1);

    beforeEach(async () => {
      await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
      await ltoCustody.connect(custodyAdmin).initiateLTO(ltoId, seller.address, buyer.address, nftIdToTrade);
    });

    it('should complete lto', async () => {
      await ltoCustody.connect(custodyAdmin).complete(ltoId);

      const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(domainOwner).to.be.eq(buyer.address);

      const lto = await ltoCustody.getLTOData(ltoId);
      expect(lto.isFinalized).to.be.eq(true);
      const owner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(owner).to.be.eq(buyer.address);
    });

    it('should cancel lto', async () => {
      await ltoCustody.connect(custodyAdmin).cancel(ltoId);

      const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(domainOwner).to.be.eq(seller.address);

      const lto = await ltoCustody.getLTOData(ltoId);
      expect(lto.isFinalized).to.be.eq(true);
      const owner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(owner).to.be.eq(seller.address);
    });

    it('should transfer lto seller', async () => {
      await ltoCustody.connect(custodyAdmin).transferSeller(ltoId, otherUser.address);

      const lto = await ltoCustody.getLTOData(ltoId);
      expect(lto.seller).to.be.eq(otherUser.address);
      expect(lto.buyer).to.be.eq(buyer.address);
      expect(lto.tokenId).to.be.eq(nftIdToTrade);
    });

    it('should transfer lto buyer', async () => {
      await ltoCustody.connect(custodyAdmin).transferBuyer(ltoId, otherUser.address);

      const lto = await ltoCustody.getLTOData(ltoId);
      expect(lto.seller).to.be.eq(seller.address);
      expect(lto.buyer).to.be.eq(otherUser.address);
      expect(lto.tokenId).to.be.eq(nftIdToTrade);
    });

    describe('management in custody', () => {
      it('should set many records', async () => {
        await ltoCustody.connect(buyer).setMany(ltoId, ['key_1', 'key_2'], ['value_1', 'value_2']);

        const records = await unsRegistry.getMany(['key_1', 'key_2'], nftIdToTrade);
        expect(records).to.deep.eq(['value_1', 'value_2']);
      });
    });
  });

  describe('integration with registrar custody', () => {
    it('should initiate lto while domain is in registrar custody', async () => {
      const labels = ['seaport-order', 'com'];
      const tokenId = await unsRegistry.namehash(labels);
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, seller.address);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());

      const priceToSell = ethers.parseUnits('100', 6);
      const { fulfillOrderData, numerator, denominator } = await createRegistrarCustodyOrder(
        tokenId,
        priceToSell,
        await seaportProxyBuyer.getAddress(),
      );

      const ltoId = BigInt(1);
      await ltoCustody
        .connect(custodyAdmin)
        .initiateLTOFromOrder(
          ltoId,
          { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
          [],
          ethers.ZeroHash,
          buyer.address,
        );

      const domainOwner = await unsRegistry.ownerOf(tokenId);
      expect(domainOwner).to.be.eq(await ltoCustody.getAddress());

      const lto = await ltoCustody.getLTOData(ltoId);
      expect(lto.seller).to.be.eq(await registrarCustody.getAddress());
      expect(lto.buyer).to.be.eq(buyer.address);
      expect(lto.tokenId).to.be.eq(tokenId);
    });
  });
});
