// process.env.HARDHAT_NETWORK = 'sandbox';
import { assert, expect } from 'chai';
import { ethers, network } from 'hardhat';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AbiCoder } from 'ethers';
import { NameService, getNetworkConfig } from '../src/config';
import { MintingManager, UNSRegistry } from '../types';
import { unwrap } from '../src/utils';
import {
  BUFFERED_REGISTRATION_COST,
  REGISTRATION_TIME,
  ZERO_ADDRESS,
} from '../test/helpers/constants';
import {
  CNSRegistry,
  CNSRegistry__factory,
  MintingManager__factory,
  UNSRegistry__factory,
  ENSCustody,
  ENSCustody__factory,
  ETHRegistrarController,
  ETHRegistrarController__factory,
  ZilliqaRecover,
  ZilliqaRecover__factory,
} from '../types';
import { increaseTimeBy } from '../test/helpers/utils';
import { TLD } from '../src/tlds';
import { Sandbox } from '.';

describe('Sandbox', async () => {
  const domainPrefix = 'sandbox';

  let unsRegistry: UNSRegistry,
    cnsRegistry: CNSRegistry,
    mintingManager: MintingManager,
    zilliqaRecover: ZilliqaRecover;
  let signers: SignerWithAddress[], owner: SignerWithAddress, minter: SignerWithAddress;
  let predicateAddress: string;

  let ethRegistrarController: ETHRegistrarController, custody: ENSCustody;
  let registrantAddress: string;

  let sandbox: Sandbox;

  const abiCoder = new AbiCoder();

  before(async () => {
    sandbox = await Sandbox.start({ verbose: true });

    signers = await ethers.getSigners();
    [owner, minter] = signers;
    registrantAddress = await signers[2].getAddress();

    const chainId: number = unwrap(network.config, 'chainId');
    const { contracts: unsContracts } = getNetworkConfig(chainId, NameService.UNS);
    const { contracts: ensContracts } = getNetworkConfig(chainId, NameService.ENS);

    unsRegistry = UNSRegistry__factory.connect(unsContracts.UNSRegistry.address, owner);
    cnsRegistry = CNSRegistry__factory.connect(unsContracts.CNSRegistry.address, owner);
    mintingManager = MintingManager__factory.connect(unsContracts.MintingManager.address, owner);
    mintingManager = MintingManager__factory.connect(unsContracts.MintingManager.address, owner);
    zilliqaRecover = ZilliqaRecover__factory.connect(unsContracts.ZilliqaRecover.address, owner);

    predicateAddress = unsContracts.MintableERC721Predicate.address;
    ethRegistrarController = ETHRegistrarController__factory.connect(
      ensContracts.ETHRegistrarController.address,
      owner,
    );

    custody = ENSCustody__factory.connect(ensContracts.ENSCustody.address, owner);
  });

  beforeEach(async () => {
    await sandbox.reset();
  });

  after(async () => {
    sandbox.stop();
  });

  describe('UNS', () => {
    it('should mint all TLDs', async () => {
      const unsTlds = Object.entries(TLD)
        .filter(([, tldConfig]) => tldConfig.nameServices.includes(NameService.UNS));

      for (const [, config] of unsTlds) {
        expect(await unsRegistry.exists(config.hash)).to.be.true;
      }
    });

    it('should mint a token', async () => {
      const labels = [`${domainPrefix}-wallet-0`, 'wallet'];

      const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], true);
      await tx.wait();

      const tokenId = await unsRegistry.namehash(labels);
      expect(await unsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
    });

    it('should mint same token as prev test', async () => {
      const labels = [`${domainPrefix}-wallet-0`, 'wallet'];

      const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], true);
      await tx.wait();

      const tokenId = await unsRegistry.namehash(labels);
      expect(await unsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
    });

    it('should mint a token in CNS', async () => {
      const labels = [domainPrefix, 'crypto'];

      const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
      await tx.wait();

      const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, domainPrefix);
      expect(await cnsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
    });

    it('should migrate token from CNS to UNS', async () => {
      const labels = [domainPrefix, 'crypto'];
      const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, domainPrefix);

      const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
      await tx.wait();

      await cnsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
        owner.address,
        await unsRegistry.getAddress(),
        tokenId,
        abiCoder.encode(['bool'], [false]),
      );

      expect(await unsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
      // Somehow error cannot be decoded automatically here, used try...catch
      try {
        await cnsRegistry.ownerOf.staticCall(tokenId);
        assert.fail('Error is ecpected');
      } catch (error) {}
    });

    it('should migrate token from CNS to UNS L2', async () => {
      const labels = [domainPrefix, 'crypto'];
      const tokenId = await cnsRegistry.childIdOf(TLD.crypto.hash, domainPrefix);

      const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
      await tx.wait();

      await cnsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
        owner.address,
        await unsRegistry.getAddress(),
        tokenId,
        abiCoder.encode(['bool'], [true]),
      );

      expect(await unsRegistry.ownerOf(tokenId)).to.be.eq(predicateAddress);
      // Somehow error cannot be decoded automatically here, used try...catch
      try {
        await cnsRegistry.ownerOf.staticCall(tokenId);
        assert.fail('Error is expected');
      } catch (error) {}
    });

    it('mints .zil token to ZilliqaRecover custody', async () => {
      const tx = await zilliqaRecover.connect(minter).mint(domainPrefix, owner.address);
      await tx.wait();

      const tokenId = await cnsRegistry.childIdOf(TLD.zil.hash, domainPrefix);
      expect(await unsRegistry.ownerOf(tokenId)).to.be.eq(await zilliqaRecover.getAddress());
      expect(await zilliqaRecover.znsOwnerOf(tokenId)).to.be.eq(owner.address);
    });
  });

  describe('ENS', () => {
    const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

    const registerName = async (name: string, txOptions = { value: BUFFERED_REGISTRATION_COST }) => {
      const commitment = await ethRegistrarController.makeCommitment(
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret,
        ZERO_ADDRESS,
        [],
        false,
        0,
      );

      let tx = await ethRegistrarController.commit(commitment);
      const blockNumber = unwrap(await tx.wait() ?? {}, 'blockNumber');
      const block = await ethers.provider.getBlock(
        blockNumber,
      );

      expect(await ethRegistrarController.commitments(commitment)).to.equal(block?.timestamp);

      await increaseTimeBy(
        await ethRegistrarController.minCommitmentAge(),
      );

      tx = await ethRegistrarController.register(
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret,
        ZERO_ADDRESS,
        [],
        false,
        0,
        txOptions,
      );

      return tx;
    };

    const registerAndParkName = async (
      name: string,
      minter: SignerWithAddress,
      resolver = ZERO_ADDRESS,
      selfCustody = false,
      callData: string[] = [],
      txOptions = {},
    ) => {
      // make commitment
      const commitment = await custody.makeCommitment(
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret,
        resolver,
        callData,
        false,
        0,
        selfCustody,
      );
      const commitTx = await custody.connect(minter).commit(commitment);
      const blockNumber = unwrap(await commitTx.wait() ?? {}, 'blockNumber');
      const block = await ethers.provider.getBlock(blockNumber);
      const timestamp = block?.timestamp;
      expect(await ethRegistrarController.commitments(commitment)).to.equal(timestamp);

      await increaseTimeBy(
        await ethRegistrarController.minCommitmentAge(),
      );

      // register
      const registerTx = await custody
        .connect(minter)
        .register(
          name,
          registrantAddress,
          REGISTRATION_TIME,
          secret,
          resolver,
          callData,
          false,
          0,
          selfCustody,
          txOptions,
        );
      return [commitTx, registerTx];
    };

    it('should register ENS domain', async () => {
      const name = 'newname1';
      await registerName(name);
      expect(await ethRegistrarController.available(name)).to.equal(false);
    });

    it('should register and park ENS domain', async () => {
      const name = 'newname2';
      await registerAndParkName(name, minter);
      expect(await ethRegistrarController.available(name)).to.equal(false);
    });
  });
});

describe('Sandbox (multiple instances)', async () => {
  it('should be able to run multiple instances', async () => {
    const sandbox = await Sandbox.start({
      verbose: true,
      network: {
        port: 7546,
        chainId: 1338,
      },
    });
    sandbox.stop();
  });
});
