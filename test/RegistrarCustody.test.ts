import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { CreateOrderAction, CreateOrderInput, SeaportContract } from '@opensea/seaport-js/lib/types';
import { expect } from 'chai';
import { namehash, Signature, TypedDataEncoder } from 'ethers';
import { ethers } from 'hardhat';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { EIP_712_ORDER_TYPE, ItemType } from '@opensea/seaport-js/lib/constants';
import { getAdvancedOrderNumeratorDenominator } from '@opensea/seaport-js/lib/utils/fulfill';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
import { ConduitController__factory } from '../types/factories/seaport-core/src/conduit';
import { OrderStruct } from '../types/seaport-core/src/Seaport';
import { Seaport__factory as SeaportContract__factory } from '../types/factories/seaport-core/src';
import {
  ConduitController,
  ERC20Mock,
  ERC20Mock__factory,
  MintingManager,
  MintingManager__factory,
  RegistrarCustody,
  RegistrarCustody__factory,
  SeaportProxyBuyer,
  SeaportProxyBuyer__factory,
  UNSRegistry,
  UNSRegistry__factory,
} from '../types';
import { deployProxy } from '../src/helpers';
import { ZERO_ADDRESS } from './helpers/constants';
import { getLatestBlockTimestamp, increaseTimeBy } from './helpers/utils';

describe('RegistrarCustody', () => {
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    registrar: SignerWithAddress,
    user: SignerWithAddress,
    buyer: SignerWithAddress,
    otherUser: SignerWithAddress;

  let unsRegistry: UNSRegistry;
  let mintingManager: MintingManager;
  let registrarCustody: RegistrarCustody;

  let provider: HardhatEthersProvider;
  let latestBlockTimestamp: number;

  const registrarId = BigInt(42);
  let snapshotId: unknown;

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [coinbase, registrar, user, buyer, otherUser] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    mintingManager = await new MintingManager__factory(coinbase).deploy();
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

    registrarCustody = await deployProxy(new RegistrarCustody__factory(coinbase), [
      await unsRegistry.getAddress(),
      await mintingManager.getAddress(),
    ]);

    await mintingManager.addMinter(registrar.address);
    await mintingManager.addMinter(await registrarCustody.getAddress());

    await registrarCustody.connect(coinbase).addAdmin(registrar.address);
    await registrarCustody.connect(coinbase).addRegistrar(registrarId, registrar.address);

    latestBlockTimestamp = await getLatestBlockTimestamp();
  });

  beforeEach(async () => {
    snapshotId = await provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await provider.send('evm_revert', [snapshotId]);
  });

  describe('tokenizeDomain', () => {
    it('tokenizes new domain', async () => {
      const labels = ['tokenize-new', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      const tx = registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address);
      await expect(tx).to.emit(registrarCustody, 'DomainTokenized').withArgs(tokenId, registrarId, user.address);

      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.equal(expiry);
      expect(await registrarCustody.userDelegations(tokenId)).to.equal(user.address);
      expect(await registrarCustody.registrarDelegations(tokenId)).to.equal(registrarId);
    });

    it('tokenizes detokenized domain', async () => {
      const labels = ['tokenize-detokenized', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await mintingManager.connect(registrar).issueExpirableWithRecords(user.address, labels, [], [], expiry, false);
      await unsRegistry.connect(user).transferFrom(user.address, await mintingManager.getAddress(), tokenId);

      const newExpiry = expiry + 60 * 60 * 24;

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], newExpiry, registrarId, user.address);

      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.equal(newExpiry);
      expect(await registrarCustody.userDelegations(tokenId)).to.equal(user.address);
    });

    it('tokenizes expired domain', async () => {
      const labels = ['tokenize-expired', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await mintingManager.connect(registrar).issueExpirableWithRecords(user.address, labels, [], [], expiry, false);
      await unsRegistry.connect(user).transferFrom(user.address, await mintingManager.getAddress(), tokenId);

      await increaseTimeBy(60 * 60 * 24 + 1);
      const newExpiry = expiry + 60 * 60 * 24;

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], newExpiry, registrarId, user.address);

      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.equal(newExpiry);
    });

    it('reverts if caller not admin', async () => {
      const labels = ['tokenize-unauthorized', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      await expect(
        registrarCustody.connect(user).tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address),
      ).to.be.revertedWithCustomError(registrarCustody, 'Unauthorized');
    });

    it('updates user delegation for an existing tokenized domain', async () => {
      const labels = ['update-user-delegation', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address);

      expect(await registrarCustody.userDelegations(tokenId)).to.equal(user.address);

      await registrarCustody.connect(registrar).tokenizeDomain(labels, [], [], expiry, registrarId, otherUser.address);

      expect(await registrarCustody.userDelegations(tokenId)).to.equal(otherUser.address);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.equal(expiry);
      expect(await registrarCustody.registrarDelegations(tokenId)).to.equal(registrarId);
    });

    it('updates registrar delegation for an existing tokenized domain', async () => {
      const labels = ['update-registrar-delegation', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);
      const newRegistrarId = BigInt(2);
      await registrarCustody.connect(coinbase).addRegistrar(newRegistrarId, otherUser.address);

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address);

      expect(await registrarCustody.registrarDelegations(tokenId)).to.equal(registrarId);

      await registrarCustody.connect(registrar).tokenizeDomain(labels, [], [], expiry, newRegistrarId, user.address);

      expect(await registrarCustody.registrarDelegations(tokenId)).to.equal(newRegistrarId);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.equal(expiry);
      expect(await registrarCustody.userDelegations(tokenId)).to.equal(user.address);
    });

    it('tokenizes an existing domain owned by an EOA', async () => {
      const labels = ['tokenize-eoa-owned', 'com'];
      const initialExpiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await mintingManager
        .connect(registrar)
        .issueExpirableWithRecords(user.address, labels, ['initialKey'], ['initialValue'], initialExpiry, true);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(user.address);
      expect(await unsRegistry.get('initialKey', tokenId)).to.equal('initialValue');

      const newExpiry = initialExpiry + 60 * 60 * 24 * 30;
      const newKeys = ['key2', 'key3'];
      const newValues = ['value2', 'value3'];

      const tx = registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, newKeys, newValues, newExpiry, registrarId, otherUser.address);

      await expect(tx).to.emit(registrarCustody, 'DomainTokenized').withArgs(tokenId, registrarId, otherUser.address);

      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('initialKey', tokenId)).to.equal('');
      expect(await unsRegistry.get('key2', tokenId)).to.equal('value2');
      expect(await unsRegistry.get('key3', tokenId)).to.equal('value3');
      expect(await unsRegistry.expiryOf(tokenId)).to.equal(newExpiry);
      expect(await registrarCustody.userDelegations(tokenId)).to.equal(otherUser.address);
      expect(await registrarCustody.registrarDelegations(tokenId)).to.equal(registrarId);
    });

    it('reverts when trying to tokenize a non-expirable domain transferred to the contract', async () => {
      const labels = ['tokenize-non-expirable', 'crypto'];
      const tokenId = await unsRegistry.namehash(labels);
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await mintingManager.connect(registrar).issueWithRecords(user.address, labels, ['key1'], ['value1'], true);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(user.address);
      expect(await unsRegistry.expiryOf(tokenId)).to.equal(0);

      await unsRegistry.connect(user).transferFrom(user.address, await registrarCustody.getAddress(), tokenId);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());

      await expect(
        registrarCustody
          .connect(registrar)
          .tokenizeDomain(labels, ['key2'], ['value2'], expiry, registrarId, user.address),
      ).to.be.revertedWithCustomError(registrarCustody, 'InvalidExpiry');
    });
  });

  describe('setRecords', () => {
    let tokenId: bigint;

    beforeEach(async () => {
      const labels = ['set-records', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      tokenId = await unsRegistry.namehash(labels);
      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address);
    });

    it('updates records by registrar', async () => {
      await registrarCustody.connect(registrar).setRecords(['key1'], ['value2'], tokenId);
      expect(await unsRegistry.get('key1', tokenId)).to.equal('value2');
    });

    it('reverts when called by user', async () => {
      await expect(
        registrarCustody.connect(user).setRecords(['key1'], ['value2'], tokenId),
      ).to.be.revertedWithCustomError(registrarCustody, 'Unauthorized');
    });

    it('reverts when admin (not registrar) tries to set records', async () => {
      await registrarCustody.connect(coinbase).addAdmin(coinbase.address);
      const isCoinbaseAdmin = await registrarCustody.isAdmin(coinbase.address);
      expect(isCoinbaseAdmin).to.be.true;

      const isCoinbaseRegistrarForToken = await registrarCustody.isRegistrar(
        await registrarCustody.registrarDelegations(tokenId),
        coinbase.address,
      );
      expect(isCoinbaseRegistrarForToken).to.be.false;

      await expect(
        registrarCustody.connect(coinbase).setRecords(['key1'], ['value3'], tokenId),
      ).to.be.revertedWithCustomError(registrarCustody, 'Unauthorized');
    });
  });

  describe('revoke', () => {
    let tokenId: bigint;

    beforeEach(async () => {
      const labels = ['revoke-domain', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      tokenId = await unsRegistry.namehash(labels);
      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address);
    });

    it('revokes by registrar', async () => {
      await registrarCustody.connect(registrar).revoke(tokenId);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await mintingManager.getAddress());
    });

    it('reverts when called by user', async () => {
      await expect(registrarCustody.connect(user).revoke(tokenId)).to.be.revertedWithCustomError(
        registrarCustody,
        'Unauthorized',
      );
    });
  });

  describe('ERC1271 signatures', () => {
    let seaportProxyBuyer: SeaportProxyBuyer,
      seaportContract: SeaportContract,
      conduitController: ConduitController,
      usdcMock: ERC20Mock,
      seaportProxyBuyerFactory: SeaportProxyBuyer__factory;

    let seaportSdk: seaportjs;

    beforeEach(async () => {
      conduitController = await new ConduitController__factory(coinbase).deploy();
      seaportContract = await new SeaportContract__factory(user).deploy(await conduitController.getAddress());
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

      seaportSdk = new seaportjs(registrar, {
        overrides: {
          contractAddress: await seaportContract.getAddress(),
        },
      });

      await usdcMock.mint(await seaportProxyBuyer.getAddress(), ethers.parseUnits('250000', 6));

      await registrarCustody.connect(coinbase).setApprovalForAll(await seaportContract.getAddress(), true);
    });

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

    const createOrder = async (tokenId: bigint, priceToSell: bigint, zone?: string) => {
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

    it('fulfills seaport order', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const zone = await seaportProxyBuyer.getAddress();

      const labels = ['seaport-order', 'com'];
      const tokenId = await unsRegistry.namehash(labels);
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address);
      expect(await unsRegistry.ownerOf(namehash(labels.join('.')))).to.equal(await registrarCustody.getAddress());

      const order = await createOrder(tokenId, priceToSell, zone);
      const { fulfillOrderData, numerator, denominator } = order;

      await seaportProxyBuyer
        .connect(coinbase)
        .fulfillAdvancedOrder(
          { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
          [],
          ethers.ZeroHash,
          buyer.address,
        );

      expect(await unsRegistry.ownerOf(tokenId)).to.equal(buyer.address);
      expect(await unsRegistry.get('key1', tokenId)).to.equal('');
    });

    it('reverts fulfillment with wrong signer', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const zone = await seaportProxyBuyer.getAddress();

      const labels = ['seaport-order2', 'com'];
      const tokenId = await unsRegistry.namehash(labels);
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, user.address);
      expect(await unsRegistry.ownerOf(namehash(labels.join('.')))).to.equal(await registrarCustody.getAddress());

      const order = await createOrder(tokenId, priceToSell, zone);
      const { fulfillOrderData, numerator, denominator, eip712Hash } = order;

      const signature = await otherUser.signMessage(eip712Hash);

      const tx = seaportProxyBuyer
        .connect(coinbase)
        .fulfillAdvancedOrder(
          { ...fulfillOrderData, signature, numerator, denominator, extraData: '0x' },
          [],
          ethers.ZeroHash,
          buyer.address,
        );

      await expect(tx).to.be.revertedWithCustomError(seaportContract, 'BadContractSignature');
    });
  });

  describe('RegistrarRole', () => {
    it('identifies contract owner as admin', async () => {
      expect(await registrarCustody.isAdmin(coinbase.address)).to.be.true;
    });

    it('adds and removes an admin', async () => {
      await registrarCustody.connect(coinbase).addAdmin(otherUser.address);
      expect(await registrarCustody.isAdmin(otherUser.address)).to.be.true;

      await registrarCustody.connect(coinbase).removeAdmin(otherUser.address);
      expect(await registrarCustody.isAdmin(otherUser.address)).to.be.false;
    });

    it('allows an admin to renounce their role', async () => {
      await registrarCustody.connect(coinbase).addAdmin(otherUser.address);
      await registrarCustody.connect(otherUser).renounceAdmin();
      expect(await registrarCustody.isAdmin(otherUser.address)).to.be.false;
    });

    it('rotates admin role to a new account', async () => {
      await registrarCustody.connect(coinbase).rotateAdmin(otherUser.address);
      expect(await registrarCustody.isAdmin(coinbase.address)).to.be.false;
      expect(await registrarCustody.isAdmin(otherUser.address)).to.be.true;
    });

    it('reverts when non-owner attempts to add admin', async () => {
      await expect(registrarCustody.connect(user).addAdmin(user.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });

    it('checks registrar role assignment', async () => {
      expect(await registrarCustody.isRegistrar(registrarId, registrar.address)).to.be.true;
    });

    it('adds and removes registrar', async () => {
      const newRegistrarId = BigInt(99);

      await registrarCustody.connect(coinbase).addRegistrar(newRegistrarId, otherUser.address);
      expect(await registrarCustody.isRegistrar(newRegistrarId, otherUser.address)).to.be.true;

      await registrarCustody.connect(coinbase).removeRegistrar(newRegistrarId, otherUser.address);
      expect(await registrarCustody.isRegistrar(newRegistrarId, otherUser.address)).to.be.false;
    });

    it('reverts when non-owner attempts to add registrar', async () => {
      const newRegistrarId = BigInt(100);
      await expect(registrarCustody.connect(user).addRegistrar(newRegistrarId, user.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });
});
