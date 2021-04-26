const { expectRevert } = require('@openzeppelin/test-helpers');

const Registry = artifacts.require('Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')

contract('Registry', function([coinbase, ...accounts]) {
  let mintingController, registry

  before(async () => {
    registry = await Registry.new();
    mintingController = await MintingController.new(registry.address);
    await registry.addController(mintingController.address);
  })

  it('should construct itself correctly', async () => {
    const root = await registry.root()

    assert.equal(
      root.toString(16),
      'f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f',
      'good root',
    )
  })

  it('should resolve properly', async () => {
    const tok = await registry.childIdOf(await registry.root(), 'resolution')

    // should fail to get resolver of non existent token
    await expectRevert.unspecified(registry.resolverOf(1));

    // should fail to set resolver of non existent token
    await expectRevert(
      registry.resolveTo(accounts[0], tok),
      'ERC721: operator query for nonexistent token',
    );

    await mintingController.mintSLD(coinbase, 'resolution')

    // should fail to get non existent resolver
    await expectRevert.unspecified(registry.resolverOf(tok));

    await registry.resolveTo(accounts[0], tok)

    assert.equal(
      await registry.resolverOf(tok),
      accounts[0],
      'set resolver correctly',
    )

    await registry.burn(tok)

    // should fail to get non existent resolver after burn
    await expectRevert.unspecified(registry.resolverOf(tok));

    await mintingController.mintSLD(coinbase, 'resolution')

    await registry.resolveTo(accounts[0], tok)

    await registry.transferFrom(coinbase, accounts[0], tok)

    // should fail to get non existent resolver after transfer
    await expectRevert.unspecified(registry.resolverOf(tok));

    // should fail to set resolver of token not owned by user
    await expectRevert.unspecified(registry.resolveTo(accounts[0], tok));
  })

  it('should mint children', async () => {
    const tok = await registry.childIdOf(await registry.root(), 'otherlabel')

    await mintingController.mintSLD(coinbase, 'otherlabel')

    await registry.mintChild(coinbase, tok, '3ld')

    const threeld = await registry.childIdOf(tok, '3ld')

    assert.equal(
      coinbase,
      await registry.ownerOf(threeld),
      'should mint token correctly',
    )

    await registry.mintChild(coinbase, threeld, '4ld')

    const fourld = await registry.childIdOf(threeld, '4ld')

    assert.equal(
      coinbase,
      await registry.ownerOf(fourld),
      'should mint token correctly',
    )

    await registry.burn(fourld)

    await registry.mintChild(coinbase, threeld, '4ld')

    assert.equal(
      coinbase,
      await registry.ownerOf(fourld),
      'should mint token correctly',
    )

    // should fail to mint existing token
    await expectRevert(
      registry.mintChild(coinbase, tok, '3ld'),
      'ERC721: token already minted',
    );

    // should fail to mint existing without permission
    await expectRevert.unspecified(
      registry.mintChild(coinbase, tok, '3ld', {from: accounts[0]}),
    );
  })

  it('should transfer children', async () => {
    const tok = await registry.childIdOf(await registry.root(), 'transfer')

    // should fail to transfer non-existing token
    await expectRevert(
      registry.transferFromChild(coinbase, accounts[0], 1, ''),
      'ERC721: operator query for nonexistent token'
    )

    await mintingController.mintSLD(coinbase, 'transfer')

    await registry.mintChild(coinbase, tok, '3ld')

    await registry.transferFromChild(coinbase, accounts[0], tok, '3ld')

    const threeld = await registry.childIdOf(tok, '3ld')

    assert.equal(
      accounts[0],
      await registry.ownerOf(threeld),
      'should transfer token correctly',
    )

    // should fail to transfer token without permission
    await expectRevert(
      registry.transferFromChild(accounts[1], accounts[2], tok, '3ld'),
      'ERC721: transfer of token that is not own'
    )

    await registry.transferFromChild(accounts[0], coinbase, tok, '3ld')

    assert.equal(
      coinbase,
      await registry.ownerOf(threeld),
      'should transfer token correctly',
    )
  })

  it('should burn children', async () => {
    const tok = await registry.childIdOf(await registry.root(), 'burn')

    // should fail to burn non-existing token
    await expectRevert(
      registry.burnChild(1, ''),
      'ERC721: operator query for nonexistent token'
    );

    await mintingController.mintSLD(coinbase, 'burn')

    await registry.mintChild(coinbase, tok, '3ld')

    await registry.childIdOf(tok, '3ld')

    await registry.burnChild(tok, '3ld')

    // should burn token correctly
    await expectRevert(
      registry.burnChild(tok, '3ld'),
      'ERC721: owner query for nonexistent token'
    );

    await registry.mintChild(coinbase, tok, '3ld')

    await registry.transferFrom(coinbase, accounts[0], tok)

    // should fail to burn token without permission
    await expectRevert.unspecified(registry.burnChild(tok, '3ld'));
  })

  it('should mint/burn/transfer metadata', async () => {
    assert.equal(
      await registry.tokenURI(await registry.root()),
      'crypto',
      'good root token URI',
    )

    const tok = await registry.childIdOf(await registry.root(), 'label')

    await mintingController.mintSLD(coinbase, 'label')

    assert.equal(
      await registry.tokenURI(tok),
      'label.crypto',
      'good sld token URI',
    )

    // should fail to get non existent tokenURI
    await expectRevert.unspecified(registry.tokenURI(1));

    const threeldTok = await registry.childIdOf(tok, '3ld')

    await registry.mintChild(coinbase, tok, '3ld')

    assert.equal(
      await registry.tokenURI(threeldTok),
      '3ld.label.crypto',
      'good 3ld token URI',
    )

    await registry.burn(threeldTok)

    // should fail to get non existent tokenURI
    await expectRevert.unspecified(registry.tokenURI(threeldTok));
  })

  it('should set URI prefix', async () => {
    assert.equal(
      await registry.tokenURI(await registry.root()),
      'crypto',
      'good root token URI',
    )

    await registry.controlledSetTokenURIPrefix('prefix-')

    assert.equal(
      await registry.tokenURI(await registry.root()),
      'prefix-crypto',
      'good URI prefix',
    )

    await registry.controlledSetTokenURIPrefix('')

    assert.equal(
      await registry.tokenURI(await registry.root()),
      'crypto',
      'good URI prefix',
    )
  })
})
