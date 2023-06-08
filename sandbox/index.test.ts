// process.env.HARDHAT_NETWORK = 'sandbox';
import { assert, expect } from 'chai';
import { ethers, network } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { utils } from 'ethers';
import { NameService, getNetworkConfig } from '../src/config';
import { MintingManager__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { CNSRegistry__factory } from '../types/factories/dot-crypto/contracts';
import { MintingManager, UNSRegistry } from '../types/contracts';
import { CNSRegistry } from '../types/dot-crypto/contracts';
import { unwrap } from '../src/helpers';
import { BUFFERED_REGISTRATION_COST, REGISTRATION_TIME, TLD, ZERO_ADDRESS } from '../test/helpers/constants';
import { ENSCustody, ENSCustody__factory, ETHRegistrarController, ETHRegistrarController__factory } from '../types';
import { Sandbox } from '.';

describe('Sandbox', async () => {
  const domainPrefix = 'sandbox';

  let unsRegistry: UNSRegistry, cnsRegistry: CNSRegistry, mintingManager: MintingManager;
  let signers: SignerWithAddress[], owner: SignerWithAddress, minter: SignerWithAddress;
  let predicateAddress: string;

  let ethRegistrarController: ETHRegistrarController, custody: ENSCustody;
  let registrantAddress: string;

  let sandbox: Sandbox;

  const abiCoder = new utils.AbiCoder();

  before(async () => {
    sandbox = await Sandbox.start({ verbose: true });

    signers = await ethers.getSigners();
    [owner, minter] = signers;
    registrantAddress = await signers[2].getAddress();

    const chainId: number = unwrap(network.config, 'chainId');
    const { contracts: unsContracts } = getNetworkConfig(chainId, NameService.UNS);
    const { contracts: ensContracts } = getNetworkConfig(chainId, NameService.ENS);

    unsRegistry = new UNSRegistry__factory(owner).attach(unsContracts.UNSRegistry.address);
    cnsRegistry = new CNSRegistry__factory(owner).attach(unsContracts.CNSRegistry.address);
    mintingManager = new MintingManager__factory(owner).attach(unsContracts.MintingManager.address);

    predicateAddress = unsContracts.MintableERC721Predicate.address;
    ethRegistrarController = new ETHRegistrarController__factory(owner).attach(
      ensContracts.ETHRegistrarController.address,
    );

    custody = new ENSCustody__factory(owner).attach(ensContracts.ENSCustody.address);
  });

  beforeEach(async () => {
    await sandbox.reset();
  });

  after(async () => {
    await sandbox.stop();
  });

  describe('UNS', () => {
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

      const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, domainPrefix);
      expect(await cnsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
    });

    it('should migrate token from CNS to UNS', async () => {
      const labels = [domainPrefix, 'crypto'];
      const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, domainPrefix);

      const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
      await tx.wait();

      await cnsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
        owner.address,
        unsRegistry.address,
        tokenId,
        abiCoder.encode(['bool'], [false]),
      );

      expect(await unsRegistry.ownerOf(tokenId)).to.be.eq(owner.address);
      // Somehow error cannot be decoded automatically here, used try...catch
      try {
        await cnsRegistry.callStatic.ownerOf(tokenId);
        assert.fail('Error is ecpected');
      } catch (error) {}
    });

    it('should migrate token from CNS to UNS L2', async () => {
      const labels = [domainPrefix, 'crypto'];
      const tokenId = await cnsRegistry.childIdOf(TLD.CRYPTO, domainPrefix);

      const tx = await mintingManager.connect(minter).issueWithRecords(owner.address, labels, [], [], false);
      await tx.wait();

      await cnsRegistry['safeTransferFrom(address,address,uint256,bytes)'](
        owner.address,
        unsRegistry.address,
        tokenId,
        abiCoder.encode(['bool'], [true]),
      );

      expect(await unsRegistry.ownerOf(tokenId)).to.be.eq(predicateAddress);
      // Somehow error cannot be decoded automatically here, used try...catch
      try {
        await cnsRegistry.callStatic.ownerOf(tokenId);
        assert.fail('Error is ecpected');
      } catch (error) {}
    });
  });

  describe('ENS', () => {
    const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

    async function registerName (name, txOptions = { value: BUFFERED_REGISTRATION_COST }) {
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

      expect(await ethRegistrarController.commitments(commitment)).to.equal(
        (await ethers.provider.getBlock(unwrap(tx, 'blockNumber'))).timestamp,
      );

      await ethers.provider.send('evm_increaseTime', [(await ethRegistrarController.minCommitmentAge()).toNumber()]);
      await ethers.provider.send('evm_mine', []);

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
    }

    async function registerAndParkName (
      name,
      minter,
      resolver = ZERO_ADDRESS,
      selfCustody = false,
      callData: string[] = [],
      txOptions = {},
    ) {
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
      const { timestamp } = await ethers.provider.getBlock(unwrap(commitTx, 'blockNumber'));
      expect(await ethRegistrarController.commitments(commitment)).to.equal(timestamp);

      await ethers.provider.send('evm_increaseTime', [(await ethRegistrarController.minCommitmentAge()).toNumber()]);
      await ethers.provider.send('evm_mine', []);

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
    }

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
        url: 'http://localhost:7546',
        chainId: 1338,
        dbPath: './.sandbox/_l2',
      },
    });
    await sandbox.stop();
  });
});
