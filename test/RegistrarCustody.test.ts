import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import {
  CreateBulkOrdersAction,
  CreateOrderAction,
  CreateOrderInput,
  SeaportContract,
} from '@opensea/seaport-js/lib/types';
import { expect } from 'chai';
import { namehash, Signature, toBeHex, TypedDataEncoder } from 'ethers';
import { ethers } from 'hardhat';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { EIP_712_ORDER_TYPE, ItemType } from '@opensea/seaport-js/lib/constants';
import { getAdvancedOrderNumeratorDenominator } from '@opensea/seaport-js/lib/utils/fulfill';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
import { omit } from 'lodash';
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
    minter: SignerWithAddress,
    user: SignerWithAddress,
    buyer: SignerWithAddress,
    otherUser: SignerWithAddress;

  let unsRegistry: UNSRegistry;
  let mintingManager: MintingManager;
  let registrarCustody: RegistrarCustody;

  let provider: HardhatEthersProvider;
  let latestBlockTimestamp: number;

  let result: unknown;

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [coinbase, minter, user, buyer, otherUser] = signers;

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

    registrarCustody = await deployProxy(new RegistrarCustody__factory(coinbase), [
      await unsRegistry.getAddress(),
      await mintingManager.getAddress(),
    ]);

    await mintingManager.addMinter(minter.address);
    await mintingManager.addMinter(await registrarCustody.getAddress());

    await registrarCustody.connect(coinbase).addMinter(minter.address);

    latestBlockTimestamp = await getLatestBlockTimestamp();
  });

  beforeEach(async () => {
    result = await provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await provider.send('evm_revert', [result]);
  });

  describe('registerDomain', () => {
    it('should register domain and place it in custody', async () => {
      const labels = ['test-registrar-custody', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      const txPromsie = registrarCustody
        .connect(minter)
        .registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

      await expect(txPromsie).to.emit(registrarCustody, 'DomainLocked').withArgs(tokenId, user.address);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);
      expect(await unsRegistry.reverseOf(user.address)).to.be.equal(0);

      expect(await registrarCustody.virtualOwners(tokenId)).to.be.equal(user.address);
    });

    it('should register detokenized domain', async () => {
      const labels = ['test-registrar-custody-detokenized', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      const tokenId = await unsRegistry.namehash(labels);
      await mintingManager.connect(minter).issueExpirableWithRecords(user.address, labels, [], [], expiry, false);
      await unsRegistry.connect(user).transferFrom(user.address, await mintingManager.getAddress(), tokenId);

      const newExpiry = expiry + 60 * 60 * 24;

      const txPromsie = registrarCustody
        .connect(minter)
        .registerDomain(user.address, labels, ['key1'], ['value1'], newExpiry);

      await expect(txPromsie).to.emit(registrarCustody, 'DomainLocked').withArgs(tokenId, user.address);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(newExpiry);
      expect(await unsRegistry.reverseOf(user.address)).to.be.equal(0);

      expect(await registrarCustody.virtualOwners(tokenId)).to.be.equal(user.address);
    });

    it('should register and lock expired domain', async () => {
      const labels = ['test-registrar-custody-detokenized', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      const tokenId = await unsRegistry.namehash(labels);
      await mintingManager.connect(minter).issueExpirableWithRecords(user.address, labels, [], [], expiry, false);
      await unsRegistry.connect(user).transferFrom(user.address, await mintingManager.getAddress(), tokenId);

      await increaseTimeBy(60 * 60 * 24 + 1);
      const newExpiry = expiry + 60 * 60 * 24;

      const txPromsie = registrarCustody
        .connect(minter)
        .registerDomain(user.address, labels, ['key1'], ['value1'], newExpiry);

      await expect(txPromsie).to.emit(registrarCustody, 'DomainLocked').withArgs(tokenId, user.address);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(await registrarCustody.getAddress());
      expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(newExpiry);
      expect(await unsRegistry.reverseOf(user.address)).to.be.equal(0);

      expect(await registrarCustody.virtualOwners(tokenId)).to.be.equal(user.address);
    });

    it('should reject registering domain if not minter', async () => {
      const labels = ['test-registrar-custody', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await expect(
        registrarCustody.connect(user).registerDomain(user.address, labels, ['key1'], ['value1'], expiry),
      ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
    });
  });

  describe('safeTransfer', () => {
    it('should transfer registered domain preserving records', async () => {
      const labels = ['test-registrar-custody-transfer', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

      await registrarCustody.connect(minter).safeTransfer(user.address, tokenId);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(user.address);
      expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
      expect(await unsRegistry.reverseOf(user.address)).to.be.equal(0);
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

      expect(await registrarCustody.virtualOwners(tokenId)).to.be.equal(ZERO_ADDRESS);
    });

    it('should transfer registered domain to a user that is not the virtual owner', async () => {
      const labels = ['test-registrar-custody-transfer-other', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

      await registrarCustody.connect(minter).safeTransfer(otherUser.address, tokenId);

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(otherUser.address);
      expect(await unsRegistry.get('key1', tokenId)).to.be.equal('value1');
      expect(await unsRegistry.reverseOf(otherUser.address)).to.be.equal(0);
      expect(await unsRegistry.expiryOf(tokenId)).to.be.equal(expiry);

      expect(await registrarCustody.virtualOwners(tokenId)).to.be.equal(ZERO_ADDRESS);
    });

    it('should revert transferring domain if not minter', async () => {
      const labels = ['test-registrar-custody-transfer', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

      await expect(registrarCustody.connect(user).safeTransfer(otherUser.address, tokenId)).to.be.revertedWith(
        'MinterRole: CALLER_IS_NOT_MINTER',
      );
    });

    it('should revert transferring domain if locked', async () => {
      const labels = ['test-registrar-custody-transfer', 'com'];
      const expiry = latestBlockTimestamp + 60 * 60 * 24;
      const tokenId = await unsRegistry.namehash(labels);

      await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);

      await expect(registrarCustody.connect(user).safeTransfer(user.address, tokenId)).to.be.revertedWith(
        'MinterRole: CALLER_IS_NOT_MINTER',
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

      seaportSdk = new seaportjs(minter, {
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

    it('is able to fullfill a seaport order', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const zone = await seaportProxyBuyer.getAddress();

      const labels = ['test-registrar-custody', 'com'];
      const tokenId = await unsRegistry.namehash(labels);
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);
      expect(await unsRegistry.ownerOf(namehash(labels.join('.')))).to.be.equal(await registrarCustody.getAddress());

      const virtualOwner = await registrarCustody.virtualOwners(namehash(labels.join('.')));
      expect(virtualOwner).to.be.equal(user.address);

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

      expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(buyer.address);
      expect(await unsRegistry.get('key1', tokenId)).to.be.equal('');
    });

    it('rejects fullfillment if signature is from another user', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const zone = await seaportProxyBuyer.getAddress();

      const labels = ['test-registrar-custody2', 'com'];
      const tokenId = await unsRegistry.namehash(labels);
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await registrarCustody.connect(minter).registerDomain(user.address, labels, ['key1'], ['value1'], expiry);
      expect(await unsRegistry.ownerOf(namehash(labels.join('.')))).to.be.equal(await registrarCustody.getAddress());

      const virtualOwner = await registrarCustody.virtualOwners(namehash(labels.join('.')));
      expect(virtualOwner).to.be.equal(user.address);

      const order = await createOrder(tokenId, priceToSell, zone);
      const { fulfillOrderData, numerator, denominator, eip712Hash } = order;

      const signature = await otherUser.signMessage(eip712Hash);

      const result = seaportProxyBuyer
        .connect(coinbase)
        .fulfillAdvancedOrder(
          { ...fulfillOrderData, signature, numerator, denominator, extraData: '0x' },
          [],
          ethers.ZeroHash,
          buyer.address,
        );

      expect(result).to.be.revertedWithCustomError(seaportContract, 'BadContractSignature');
    });
  });
});
