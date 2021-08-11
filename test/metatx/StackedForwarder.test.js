const { ethers } = require('hardhat');
const { expect } = require('chai');

const { utils, BigNumber } = ethers;

const sign = async (data, address, nonce, signer) => {
  return signer.signMessage(
    utils.arrayify(
      utils.solidityKeccak256(
        [ 'bytes32', 'address', 'uint256' ],
        [ utils.keccak256(data), address, nonce ],
      ),
    ),
  );
};

describe('StackedForwarder', () => {
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

  let StackedForwarder, CNSRegistry, MintingController, SignatureController;
  let forwarder, registry, mintingController, signatureController;
  let signers, owner, receiver;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    StackedForwarder = await ethers.getContractFactory('StackedForwarder');
    CNSRegistry = await ethers.getContractFactory('dot-crypto/contracts/CNSRegistry.sol:CNSRegistry');
    MintingController =
      await ethers.getContractFactory('dot-crypto/contracts/controllers/MintingController.sol:MintingController');
    SignatureController =
      await ethers.getContractFactory('dot-crypto/contracts/controllers/SignatureController.sol:SignatureController');

    forwarder = await StackedForwarder.deploy();
    await forwarder.initialize();

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);
  });

  it('should execute', async () => {
    const domainName = 'test_foo';
    await mintingController.mintSLD(owner.address, domainName);
    const tokenId = await registry.childIdOf(cryptoRoot, domainName);

    const data = registry.interface.encodeFunctionData(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenId],
    );
    const signature = await sign(data, signatureController.address, await signatureController.nonceOf(tokenId), owner);

    const req = {
      from: owner.address,
      to: signatureController.address,
      nonce: 0,
      tokenId,
      data: data,
    };

    // assert execution result
    await forwarder.execute(req, signature);
    expect(await registry.ownerOf(tokenId)).to.be.equal(receiver.address);

    const isValid = await forwarder.verify(req, signature);
    expect(isValid).to.be.equal(true);
  });

  it('should build valid `transferFrom` calldata', async () => {
    const tokenId = await registry.childIdOf(cryptoRoot, 'test_foo_12');

    const data = registry.interface.encodeFunctionData(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenId],
    );
    const signature = await sign(data, signatureController.address, await signatureController.nonceOf(tokenId), owner);

    const expectedCalldata = signatureController.interface.encodeFunctionData(
      'transferFromFor(address,address,uint256,bytes)',
      [owner.address, receiver.address, tokenId, signature],
    );

    const req = {
      from: owner.address,
      to: signatureController.address,
      nonce: 0,
      tokenId,
      data: data,
    };
    const calldata = await forwarder.callStatic.buildData(req, signature);

    expect(`${calldata}00000000000000000000000000000000000000000000000000000000000000`).to.be.equal(expectedCalldata);
  });
});
