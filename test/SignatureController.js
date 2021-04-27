const { expectRevert } = require('@openzeppelin/test-helpers');

const Registry = artifacts.require('registry/Registry.sol')
const SignatureController = artifacts.require('controller/SignatureController.sol')
const MintingController = artifacts.require('controller/MintingController.sol')

const submitSigTransaction = require('./helpers/submitSigTransaction');

contract('SignatureController', ([coinbase]) => {
  let registry, mintingController, signatureController

  before(async () => {
    registry = await Registry.new();
    mintingController = await MintingController.new(registry.address);
    await registry.addController(mintingController.address);

    signatureController = await SignatureController.new(registry.address);
    await registry.addController(signatureController.address);
  })

  it('should transfer using transferFromFor', async () => {
    await mintingController.mintSLD(coinbase, 'transferFromFor-label')

    const tok = await registry.childIdOf(
      await registry.root(),
      'transferFromFor-label',
    )

    await submitSigTransaction(
      signatureController,
      registry,
      coinbase,
      'transferFrom',
      coinbase,
      '0x1234567890123456789012345678901234567890',
      tok.toString(),
    )

    assert.equal(
      await registry.ownerOf(tok),
      '0x1234567890123456789012345678901234567890',
      'should transfer ownership',
    )

    // should fail to transfer unowned name
    await expectRevert(
      submitSigTransaction(
        signatureController,
        registry,
        coinbase,
        'transferFrom',
        coinbase,
        '0x1234567890123456789012345678901234567890',
        tok.toString(),
      ),
      'INVALID_SIGNATURE',
    );
  })

  it('should transfer using safeTransferFromFor', async () => {
    await mintingController.mintSLD(coinbase, 'safeTransferFromFor-label')

    const tok = await registry.childIdOf(
      await registry.root(),
      'safeTransferFromFor-label',
    )

    await submitSigTransaction(
      signatureController,
      registry,
      coinbase,
      'safeTransferFrom',
      coinbase,
      '0x1234567890123456789012345678901234567890',
      tok.toString(),
    )

    assert.equal(
      await registry.ownerOf(tok),
      '0x1234567890123456789012345678901234567890',
      'should transfer ownership',
    )

    // should fail to transfer unowned name
    await expectRevert(
      submitSigTransaction(
        signatureController,
        registry,
        coinbase,
        'safeTransferFrom',
        coinbase,
        '0x1234567890123456789012345678901234567890',
        tok.toString(),
      ),
      'INVALID_SIGNATURE',
    );
  })

  it('should burn using burnFor', async () => {
    await mintingController.mintSLD(coinbase, 'burnFor-label')

    const tok = await registry.childIdOf(await registry.root(), 'burnFor-label')

    await submitSigTransaction(
      signatureController,
      registry,
      coinbase,
      'burn',
      tok.toString()
    )

    // should fail to burn non existent token
    await expectRevert(registry.ownerOf(tok), 'ERC721: owner query for nonexistent token');
    await expectRevert(
      submitSigTransaction(
        signatureController,
        registry,
        coinbase,
        'burn',
        tok.toString()),
      'ERC721: operator query for nonexistent token'
    );
  })

  it('should mint using mintChildFor', async () => {
    await mintingController.mintSLD(coinbase, 'mintChildFor-label')

    const tok = await registry.childIdOf(
      await registry.root(),
      'mintChildFor-label',
    )

    await submitSigTransaction(
      signatureController,
      registry,
      coinbase,
      'mintChild',
      coinbase,
      tok.toString(),
      'label',
    )

    assert.equal(
      await registry.ownerOf(await registry.childIdOf(tok, 'label')),
      coinbase,
      'should mint token',
    )

    await registry.transferFrom(
      coinbase,
      '0x5678901234567890123456789012345678901234',
      tok,
    )

    // should fail to mint token without permission
    await expectRevert(
      submitSigTransaction(
        signatureController,
        registry,
        coinbase,
        'mintChild',
        coinbase,
        tok.toString(),
        'label',
      ),
      'INVALID_SIGNATURE'
    );
  })

  it('should mint using transferFromChildFor', async () => {
    await mintingController.mintSLD(coinbase, 'transferFromChildFor-label')

    const tok = await registry.childIdOf(
      await registry.root(),
      'transferFromChildFor-label',
    )
    const threeld = await registry.childIdOf(tok, 'label')

    await registry.mintChild(coinbase, tok, 'label')

    await submitSigTransaction(
      signatureController,
      registry,
      coinbase,
      'transferFromChild',
      coinbase,
      '0x1234567890123456789012345678901234567890',
      tok.toString(),
      'label',
    )

    assert.equal(
      await registry.ownerOf(threeld),
      '0x1234567890123456789012345678901234567890',
      'should transfer token',
    )

    await registry.transferFrom(
      coinbase,
      '0x5678901234567890123456789012345678901234',
      tok,
    )

    // should fail to mint token without permission
    await expectRevert(
      submitSigTransaction(
        signatureController,
        registry,
        coinbase,
        'transferFromChild',
        coinbase,
        '0x1234567890123456789012345678901234567890',
        tok.toString(),
        'label',
      ),
      'INVALID_SIGNATURE'
    );
  })

  it('should mint using safeTransferFromChildFor', async () => {
    await mintingController.mintSLD(coinbase, 'safeTransferFromChildFor-label')

    const tok = await registry.childIdOf(
      await registry.root(),
      'safeTransferFromChildFor-label',
    )
    const threeld = await registry.childIdOf(tok, 'label')

    await registry.mintChild(coinbase, tok, 'label')

    await submitSigTransaction(
      signatureController,
      registry,
      coinbase,
      'safeTransferFromChild',
      coinbase,
      '0x1234567890123456789012345678901234567890',
      tok.toString(),
      'label',
      '0x12345768',
    )

    assert.equal(
      await registry.ownerOf(threeld),
      '0x1234567890123456789012345678901234567890',
      'should transfer token',
    )

    await registry.transferFrom(
      coinbase,
      '0x5678901234567890123456789012345678901234',
      tok,
    )

    // should fail to mint token without permission
    await expectRevert(
      submitSigTransaction(
        signatureController,
        registry,
        coinbase,
        'safeTransferFromChild',
        coinbase,
        '0x1234567890123456789012345678901234567890',
        tok.toString(),
        'label',
        '0x12345768',
      ),
      'INVALID_SIGNATURE'
    );
  })

  it('should mint using burnChildFor', async () => {
    await mintingController.mintSLD(coinbase, 'burnChildFor-label')

    const tok = await registry.childIdOf(
      await registry.root(),
      'burnChildFor-label',
    )
    const threeld = await registry.childIdOf(tok, 'label')

    await registry.mintChild(coinbase, tok, 'label')

    await submitSigTransaction(
      signatureController,
      registry,
      coinbase,
      'burnChild',
      tok.toString(),
      'label'
    )

    await expectRevert(registry.ownerOf(threeld), 'ERC721: owner query for nonexistent token');

    await registry.transferFrom(
      coinbase,
      '0x5678901234567890123456789012345678901234',
      tok,
    )

    // should fail to mint token without permission
    await expectRevert(
      submitSigTransaction(
        signatureController,
        registry,
        coinbase,
        'burnChild',
        tok.toString(),
        'label'
      ),
      'INVALID_SIGNATURE'
    )
  })
})
