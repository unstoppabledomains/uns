import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber } from 'ethers';
import { ProxyReader, UNSRegistry } from '../types/contracts';
import { CNSRegistry } from '../types/dot-crypto/contracts';
import { ProxyReader__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { CNSRegistry__factory } from '../types/factories/dot-crypto/contracts';
import { mintDomain } from './helpers/registry';
import { TLD } from './helpers/constants';

describe('ProxyReader (proxy)', () => {
  let unsRegistry: UNSRegistry, cnsRegistry: CNSRegistry, proxyReader: ProxyReader;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress;

  let walletTokenId: BigNumber;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
  });

  beforeEach(async () => {
    // deploy UNS
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry.setTokenURIPrefix('/');

    // deploy CNS
    cnsRegistry = await new CNSRegistry__factory(coinbase).deploy();

    // deploy ProxyReader
    proxyReader = await upgrades.deployProxy(
      new ProxyReader__factory(coinbase),
      [ unsRegistry.address, cnsRegistry.address ],
      { unsafeAllow: ['delegatecall'] },
    ) as ProxyReader;

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
