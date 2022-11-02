const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { TLD } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

describe('ProxyReader (proxy)', () => {
  let UNSRegistry, CNSRegistry, ProxyReader;
  let unsRegistry, cnsRegistry, proxyReader;
  let signers, coinbase;

  let walletTokenId;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    ProxyReader = await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader');
  });

  beforeEach(async () => {
    unsRegistry = await UNSRegistry.deploy();

    // deploy UNS
    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry.setTokenURIPrefix('/');

    // deploy CNS
    cnsRegistry = await CNSRegistry.deploy();

    // deploy ProxyReader
    proxyReader = await upgrades.deployProxy(
      ProxyReader,
      [ unsRegistry.address, cnsRegistry.address ],
      { unsafeAllow: ['delegatecall'] },
    );

    // add TLD
    await unsRegistry.mintTLD(TLD.WALLET, 'wallet');

    // mint domain
    walletTokenId = await mintDomain(unsRegistry, coinbase.address, ['test-proxy-proxy-reader', 'wallet']);
  });

  it('should be able to read via Proxy', async () => {
    expect(await proxyReader.exists(walletTokenId)).to.be.equal(true);
    expect(await proxyReader.ownerOf(walletTokenId)).to.be.equal(coinbase.address);
  });
});
