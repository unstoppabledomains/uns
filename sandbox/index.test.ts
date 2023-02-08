// process.env.HARDHAT_NETWORK = 'sandbox';
import { assert, expect } from 'chai';
import { ethers, network } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { utils } from 'ethers';
import { getNetworkConfig } from '../src/config';
import { MintingManager__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { CNSRegistry__factory } from '../types/factories/dot-crypto/contracts';
import { MintingManager, UNSRegistry } from '../types/contracts';
import { CNSRegistry } from '../types/dot-crypto/contracts';
import { unwrap } from '../src/helpers';
import { TLD } from '../test/helpers/constants';
import { Sandbox, SandboxNetworkOptions } from '.';

describe('Sandbox', async () => {
  const domainPrefix = 'sandbox';

  let unsRegistry: UNSRegistry, cnsRegistry: CNSRegistry, mintingManager: MintingManager;
  let signers: SignerWithAddress[], owner: SignerWithAddress, minter: SignerWithAddress;
  let predicateAddress: string;

  let sandbox: Sandbox;

  const abiCoder = new utils.AbiCoder();

  before(async () => {
    sandbox = await Sandbox.start({ verbose: true });

    signers = await ethers.getSigners();
    [owner, minter] = signers;

    const chainId: number = unwrap(network.config, 'chainId');
    const { contracts } = getNetworkConfig(chainId);

    unsRegistry = new UNSRegistry__factory(owner).attach(contracts.UNSRegistry.address);
    cnsRegistry = new CNSRegistry__factory(owner).attach(contracts.CNSRegistry.address);
    mintingManager = new MintingManager__factory(owner).attach(contracts.MintingManager.address);

    predicateAddress = contracts.MintableERC721Predicate.address;
  });

  beforeEach(async () => {
    await sandbox.reset();
  });

  after(async () => {
    await sandbox.stop();
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
