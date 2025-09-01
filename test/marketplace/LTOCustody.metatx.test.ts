import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { CreateOrderInput, SeaportContract } from '@opensea/seaport-js/lib/types';
import { expect } from 'chai';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { OrderStruct } from '@opensea/seaport-js/lib/typechain-types/seaport-core/src/lib/Consideration';
import { ItemType } from '@opensea/seaport-js/lib/constants';
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
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';

describe('LTOCustody (metatx)', () => {
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    registrar: SignerWithAddress,
    custodyAdmin: SignerWithAddress,
    seller: SignerWithAddress,
    buyer: SignerWithAddress,
    otherUser: SignerWithAddress;

  let buildExecuteParams: ExecuteFunc;

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

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [coinbase, registrar, custodyAdmin, seller, buyer, otherUser] = signers;

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
      await mintingManager.getAddress(),
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

    buildExecuteParams = buildExecuteFunc(ltoCustody.interface, await ltoCustody.getAddress(), ltoCustody);
  });

  afterEach(async () => {
    await provider.send('evm_revert', [snapshotId]);
  });

  it('should initiate lto from order', async () => {
    const priceToSell = ethers.parseUnits('100', 6);
    const { fulfillOrderData, numerator, denominator } = await createOrder(
      nftIdToTrade,
      priceToSell,
      seller,
      await seaportProxyBuyer.getAddress(),
    );
    const ltoId = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, nftIdToTrade, 0);

    const { req, signature } = await buildExecuteParams(
      ltoCustody.interface.getFunction('initiateLTOFromOrder'),
      [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
      custodyAdmin,
      nftIdToTrade,
    );
    await ltoCustody.connect(coinbase).execute(req, signature);

    const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
    expect(domainOwner).to.be.eq(await ltoCustody.getAddress());

    const lto = await ltoCustody.ltoAssets(ltoId);
    expect(lto.seller).to.be.eq(seller.address);
    expect(lto.buyer).to.be.eq(buyer.address);
    expect(lto.tokenId).to.be.eq(nftIdToTrade);
  });

  describe('lifecycle functions', () => {
    let ltoId: bigint;

    beforeEach(async () => {
      ltoId = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, nftIdToTrade, 0);
      await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
      await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade);
    });

    it('should complete lto', async () => {
      const { req, signature } = await buildExecuteParams('complete(uint256)', [ltoId], custodyAdmin, ltoId);
      await ltoCustody.connect(coinbase).execute(req, signature);

      const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(domainOwner).to.be.eq(buyer.address);

      const lto = await ltoCustody.ltoAssets(ltoId);
      expect(lto.isFinalized).to.be.eq(true);
      const owner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(owner).to.be.eq(buyer.address);
    });

    it('should cancel lto', async () => {
      const { req, signature } = await buildExecuteParams('cancel(uint256)', [ltoId], custodyAdmin, ltoId);
      await ltoCustody.connect(coinbase).execute(req, signature);

      const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(domainOwner).to.be.eq(seller.address);

      const lto = await ltoCustody.ltoAssets(ltoId);
      expect(lto.isFinalized).to.be.eq(true);
      const owner = await unsRegistry.ownerOf(nftIdToTrade);
      expect(owner).to.be.eq(seller.address);
    });

    it('should transfer lto seller', async () => {
      const { req, signature } = await buildExecuteParams(
        'transferSeller(uint256,address)',
        [ltoId, otherUser.address],
        custodyAdmin,
        ltoId,
      );
      await ltoCustody.connect(coinbase).execute(req, signature);

      const lto = await ltoCustody.ltoAssets(ltoId);
      expect(lto.seller).to.be.eq(otherUser.address);
      expect(lto.buyer).to.be.eq(buyer.address);
      expect(lto.tokenId).to.be.eq(nftIdToTrade);
    });

    it('should transfer lto buyer', async () => {
      const { req, signature } = await buildExecuteParams(
        'transferBuyer(uint256,address)',
        [ltoId, otherUser.address],
        custodyAdmin,
        ltoId,
      );
      await ltoCustody.connect(coinbase).execute(req, signature);

      const lto = await ltoCustody.ltoAssets(ltoId);
      expect(lto.seller).to.be.eq(seller.address);
      expect(lto.buyer).to.be.eq(otherUser.address);
      expect(lto.tokenId).to.be.eq(nftIdToTrade);
    });

    describe('management in custody', () => {
      it('should set many records', async () => {
        const { req, signature } = await buildExecuteParams(
          'setRecords(string[],string[],uint256)',
          [['key_1', 'key_2'], ['value_1', 'value_2'], nftIdToTrade],
          buyer,
          nftIdToTrade,
        );
        await ltoCustody.connect(coinbase).execute(req, signature);

        const records = await unsRegistry.getMany(['key_1', 'key_2'], nftIdToTrade);
        expect(records).to.deep.eq(['value_1', 'value_2']);
      });
    });
  });
});
