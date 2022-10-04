const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');

const { TLD, DEAD_ADDRESS } = require('./helpers/constants');
const { mintDomain } = require('./helpers/registry');

describe('UNSRegistry - ReverseLogic', () => {
  let UNSRegistry, ReverseLogic;
  let unsRegistry, reverseLogic;
  let signers, coinbase, owner;

  const root = TLD.CRYPTO;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner] = signers;

    ReverseLogic = await ethers.getContractFactory('ReverseLogic');
    reverseLogic = await ReverseLogic.deploy();

    UNSRegistry = await ethers.getContractFactory('UNSRegistry', {
      libraries: {
        ReverseLogic: reverseLogic.address,
      },
    });
  });

  it('should in direct mode', async () => {
    // arrange
    unsRegistry = await UNSRegistry.deploy();
    await unsRegistry.initialize(coinbase.address);
    await unsRegistry['mint(address,uint256,string)'](
      DEAD_ADDRESS,
      root,
      'crypto',
    );
    await unsRegistry.setTokenURIPrefix('/');

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

  it('should in proxy mode', async () => {
    // arrange
    unsRegistry = await upgrades.deployProxy(UNSRegistry, [coinbase.address], {
      initializer: 'initialize',
      unsafeAllowLinkedLibraries: true,
    });
    await unsRegistry['mint(address,uint256,string)'](
      DEAD_ADDRESS,
      root,
      'wallet',
    );
    await unsRegistry.setTokenURIPrefix('/');

    const tokenId = await mintDomain(
      unsRegistry,
      owner,
      TLD.WALLET,
      'rr13',
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
