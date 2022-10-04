const { ethers } = require('hardhat');
const { expect } = require('chai');

const { TLD, DEAD_ADDRESS } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

describe('UNSRegistry - ReverseLogic', () => {
  let UNSRegistry, ReverseLogic;
  let unsRegistry, reverseLogic;
  let signers, coinbase, owner, reader;

  const root = TLD.CRYPTO;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner, reader] = signers;

    ReverseLogic = await ethers.getContractFactory('ReverseLogic');
    reverseLogic = await ReverseLogic.deploy();

    UNSRegistry = await ethers.getContractFactory('UNSRegistry', {
      libraries: {
        ReverseLogic: reverseLogic.address,
      },
    });

    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      DEAD_ADDRESS,
      root,
      'crypto',
    );
    await unsRegistry.setTokenURIPrefix('/');
    await unsRegistry.addProxyReader(reader.address);
  });

  it('should in direct mode', async () => {
    const tokenId = await mintDomain(
      unsRegistry,
      owner,
      TLD.CRYPTO,
      'rr12',
    );

    const _unsRegistry = unsRegistry.connect(owner);

    // act-assert
    await expect(_unsRegistry.setReverse(tokenId))
      .to.emit(unsRegistry, 'SetReverse')
      .withArgs(owner.address, tokenId.toString());

    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(tokenId);

    await expect(_unsRegistry.removeReverse())
      .to.emit(unsRegistry, 'RemoveReverse')
      .withArgs(owner.address);

    expect(await unsRegistry.reverseOf(owner.address)).to.be.equal(0);
  });
});
