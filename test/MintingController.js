const { expectRevert } = require('@openzeppelin/test-helpers');

const Registry = artifacts.require('registry/Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')
const Simple = artifacts.require('test-helpers/Simple.sol')

contract('MintingController', ([coinbase, ...accounts]) => {
  let mintingController, registry

  describe('MintingController', async () => {
    before(async () => {
      registry = await Registry.new()
      mintingController = await MintingController.new(registry.address)
      await registry.addController(mintingController.address)
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
      await expectRevert(
        mintingController.mintSLD.call(coinbase, 'label_22'),
        'ERC721: token already minted'
      );
      await expectRevert(
        mintingController.mintSLD.call(accounts[0], 'label_22'),
        'ERC721: token already minted'
      );

      await registry.burn(tok)

      await mintingController.mintSLD(coinbase, 'label_22')

      assert.equal(
        coinbase,
        await registry.ownerOf(tok),
        'should mint already burnt token',
      )
    })

    it('safe minting SLDs', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'label_93')
      await mintingController.safeMintSLD(coinbase, 'label_93')

      assert.equal(
        coinbase,
        await registry.ownerOf(tok),
        'should mint name correctly',
      )

      // should fail to safely mint existing token contract
      await expectRevert(
        mintingController.safeMintSLD(coinbase, 'label_93'),
        'ERC721: token already minted'
      );
      await registry.burn(tok)

      // should fail to safely mint token to non reciever contract
      await expectRevert(
        mintingController.safeMintSLD(mintingController.address, 'label_93'),
        'ERC721: transfer to non ERC721Receiver implementer'
      );

      const simple = await Simple.new()
      await mintingController.safeMintSLD(simple.address, 'label_93')

      assert.equal(
        simple.address,
        await registry.ownerOf(tok),
        'should mint name correctly',
      )
    })
  })
})
