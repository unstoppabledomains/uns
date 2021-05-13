const { ZERO_ADDRESS } = require('./helpers/constants');

describe('MintingController', () => {
  let Registry, MintingController, Simple;
  let mintingController, registry;
  let signers, coinbase, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('Registry');
    MintingController = await ethers.getContractFactory('MintingController');
    Simple = await ethers.getContractFactory('Simple');

    registry = await Registry.deploy();
    await registry.functions['initialize(address)'](ZERO_ADDRESS);
    mintingController = await MintingController.deploy(registry.address);
    await registry.addController(mintingController.address);
  })

  it('minting SLDs', async () => {
    await mintingController.mintSLD(coinbase, 'label_22')

    const tok = await registry.childIdOf(await registry.root(), 'label_22')

    assert.equal(
      coinbase,
      await registry.ownerOf(tok),
      'should mint name correctly',
    )

    // should fail to mint existing token
    await expect(
      mintingController.callStatic.mintSLD(coinbase, 'label_22')
    ).to.be.revertedWith('ERC721: token already minted');
    await expect(
      mintingController.callStatic.mintSLD(accounts[0], 'label_22')
    ).to.be.revertedWith('ERC721: token already minted');

    await registry.burn(tok)
    await mintingController.mintSLD(coinbase, 'label_22')

    assert.equal(
      coinbase,
      await registry.ownerOf(tok),
      'should mint already burnt token',
    )
  })

  it('safe minting SLDs', async () => {
    const tok = await registry.childIdOf(await registry.root(), 'label_93');
    await mintingController.functions['safeMintSLD(address,string)'](coinbase, 'label_93');

    assert.equal(
      coinbase,
      await registry.ownerOf(tok),
      'should mint name correctly',
    )

    // should fail to safely mint existing token contract
    await expect(
      mintingController.callStatic['safeMintSLD(address,string)'](coinbase, 'label_93')
    ).to.be.revertedWith('ERC721: token already minted');

    await registry.burn(tok)

    // should fail to safely mint token to non reciever contract
    await expect(
      mintingController.callStatic['safeMintSLD(address,string)'](mintingController.address, 'label_93')
    ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');

    const simple = await Simple.deploy();
    await mintingController.functions['safeMintSLD(address,string)'](simple.address, 'label_93');

    assert.equal(
      simple.address,
      await registry.ownerOf(tok),
      'should mint name correctly',
    );
  })
})
