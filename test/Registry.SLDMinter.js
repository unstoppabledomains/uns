describe('Registry (SLD minter)', () => {
  let Registry, Simple;
  let registry;
  let signers, coinbase, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('Registry');
    Simple = await ethers.getContractFactory('Simple');

    registry = await Registry.deploy();
    await registry.initialize();
  })

  it('minting SLDs', async () => {
    await registry.mintSLD(coinbase, 'label_22');

    const tok = await registry.childIdOf(await registry.root(), 'label_22');
    assert.equal(coinbase, await registry.ownerOf(tok));

    // should fail to mint existing token
    await expect(
      registry.callStatic.mintSLD(coinbase, 'label_22')
    ).to.be.revertedWith('ERC721: token already minted');
    await expect(
      registry.callStatic.mintSLD(accounts[0], 'label_22')
    ).to.be.revertedWith('ERC721: token already minted');

    await registry.burn(tok);
    await registry.mintSLD(coinbase, 'label_22');

    assert.equal(coinbase, await registry.ownerOf(tok));
  })

  it('safe minting SLDs', async () => {
    const tok = await registry.childIdOf(await registry.root(), 'label_93');
    await registry.functions['safeMintSLD(address,string)'](coinbase, 'label_93');

    assert.equal(coinbase, await registry.ownerOf(tok));

    // should fail to safely mint existing token contract
    await expect(
      registry.callStatic['safeMintSLD(address,string)'](coinbase, 'label_93')
    ).to.be.revertedWith('ERC721: token already minted');

    await registry.burn(tok)

    // should fail to safely mint token to non reciever contract
    await expect(
      registry.callStatic['safeMintSLD(address,string)'](registry.address, 'label_93')
    ).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');

    const simple = await Simple.deploy();
    await registry.functions['safeMintSLD(address,string)'](simple.address, 'label_93');

    assert.equal(simple.address, await registry.ownerOf(tok));
  })
})
