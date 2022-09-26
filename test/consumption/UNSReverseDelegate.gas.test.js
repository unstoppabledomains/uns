const { ethers } = require('hardhat');

const { TLD, DEAD_ADDRESS } = require('./../helpers/constants');
const { mintDomain } = require('./../helpers/registry');

describe('UNSReverseDelegate (consumption)', () => {
  let UNSRegistry, UNSReverseDelegate;
  let unsRegistry, unsReverseDelegate;
  let signers, coinbase, owner;

  const root = TLD.CRYPTO;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner] = signers;

    UNSRegistry = await ethers.getContractFactory('UNSRegistry');
    UNSReverseDelegate = await ethers.getContractFactory('UNSReverseDelegate');
  });

  it('should in direct mode', async () => {
    // arrange
    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      DEAD_ADDRESS,
      root,
      'wallet',
    );
    await unsRegistry.setTokenURIPrefix('/');

    unsReverseDelegate = await UNSReverseDelegate.deploy();
    await unsRegistry.addReverseDelegate(unsReverseDelegate.address);

    const tokenId1 = await mintDomain(
      unsRegistry,
      owner,
      TLD.WALLET,
      'rev_del_g1',
    );
    const tokenId2 = await mintDomain(
      unsRegistry,
      owner,
      TLD.WALLET,
      'rev_del_g2',
    );
    const _unsRegistry = unsRegistry.connect(owner);
    await _unsRegistry.removeReverse();

    // act-assert
    const c1 = await _unsRegistry.setReverse(tokenId1);
    c1.receipt = await c1.wait();
    console.log('Delegate setReverse ', c1.receipt.gasUsed.toString(), ' gas');

    const c3 = await _unsRegistry.removeReverse();
    c3.receipt = await c3.wait();
    console.log('Delegate removeReverse ', c3.receipt.gasUsed.toString(), ' gas');

    const c2 = await _unsRegistry.setReverseDirect(tokenId2);
    c2.receipt = await c2.wait();
    console.log('Direct setReverse ', c2.receipt.gasUsed.toString(), ' gas');

    const c4 = await _unsRegistry.removeReverseDirect();
    c4.receipt = await c4.wait();
    console.log('Direct removeReverse ', c4.receipt.gasUsed.toString(), ' gas');
  });
});
