import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { getContractAddress } from '@openzeppelin/hardhat-upgrades/dist/utils';
import { ProxyReader, UNSRegistry } from '../types/contracts';
import { CNSRegistry } from '../types/dot-crypto/contracts';
import { ProxyReader__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { CNSRegistry__factory } from '../types/factories/dot-crypto/contracts';
import { ProxyReaderV04__factory } from '../types/factories/contracts/history';
import { deployProxy } from '../src/helpers';
import { TLD } from '../src/tlds';
import { mintDomain } from './helpers/registry';
import { ZERO_ADDRESS } from './helpers/constants';

describe('ProxyReader (proxy)', () => {
  let unsRegistry: UNSRegistry, cnsRegistry: CNSRegistry, proxyReader: ProxyReader;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, receiver: SignerWithAddress;

  let walletTokenId: bigint;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, receiver] = signers;
  });

  beforeEach(async () => {
    // deploy UNS
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.setTokenURIPrefix('/');

    // deploy CNS
    cnsRegistry = await new CNSRegistry__factory(coinbase).deploy();

    // deploy ProxyReader
    proxyReader = await deployProxy(
      new ProxyReader__factory(coinbase),
      [await unsRegistry.getAddress(), await cnsRegistry.getAddress()],
      { unsafeAllow: ['delegatecall'] },
    );

    // add TLD
    await unsRegistry.mintTLD(TLD.wallet.hash, 'wallet');

    // mint domain
    walletTokenId = await mintDomain({ unsRegistry, owner: coinbase, labels: ['test-proxy-proxy-reader', 'wallet'] });
  });

  it('should be able to read via Proxy', async () => {
    expect(await proxyReader.exists(walletTokenId)).to.be.equal(true);
    expect(await proxyReader.ownerOf(walletTokenId)).to.be.equal(coinbase.address);
  });

  it('should keep forwarding with storage layout consistent after upgrade', async () => {
    proxyReader = await deployProxy(
      new ProxyReaderV04__factory(coinbase),
      [await unsRegistry.getAddress(), await cnsRegistry.getAddress()],
      { unsafeAllow: ['delegatecall'] },
    );

    expect(await proxyReader.exists(walletTokenId)).to.be.equal(true);
    expect(await proxyReader.ownerOf(walletTokenId)).to.be.equal(coinbase.address);

    const upgradedProxyReader = await upgrades.upgradeProxy(
      await getContractAddress(proxyReader),
      new ProxyReader__factory(coinbase),
      {
        unsafeAllow: ['delegatecall'],
        call: {
          fn: 'setOwner(address)',
          args: [coinbase.address],
        },
      },
    );

    expect(await upgradedProxyReader.owner()).to.equal(coinbase.address);
    expect(await proxyReader.exists(walletTokenId)).to.be.equal(true);
    expect(await proxyReader.ownerOf(walletTokenId)).to.be.equal(coinbase.address);

    await expect(upgradedProxyReader.setOwner(receiver.address)).to.be.revertedWith('ProxyReader: OWNER_ALREADY_SET');
  });
});
