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

describe('RoutingForwarder', () => {
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

  let RoutingForwarder, CNSRegistry, MintingController, SignatureController;
  let forwarder, registry, mintingController, signatureController;
  let signers, owner, receiver;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    RoutingForwarder = await ethers.getContractFactory('RoutingForwarder');
    CNSRegistry = await ethers.getContractFactory('dot-crypto/contracts/CNSRegistry.sol:CNSRegistry');
    MintingController =
      await ethers.getContractFactory('dot-crypto/contracts/controllers/MintingController.sol:MintingController');
    SignatureController =
      await ethers.getContractFactory('dot-crypto/contracts/controllers/SignatureController.sol:SignatureController');

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await RoutingForwarder.deploy();
    await forwarder.initialize(signatureController.address);
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
      nonce: await forwarder.nonceOf(tokenId),
      tokenId,
      data: data,
    };

    // verify signature
    const isValid = await forwarder.verify(req, signature);
    expect(isValid).to.be.equal(true);

    // assert execution result
    await forwarder.execute(req, signature);
    expect(await registry.ownerOf(tokenId)).to.be.equal(receiver.address);
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
      nonce: 0,
      tokenId,
      data: data,
    };
    const calldata = await forwarder.callStatic.buildRouteData(req, signature);

    expect(`${calldata}00000000000000000000000000000000000000000000000000000000000000`).to.be.equal(expectedCalldata);
  });

  it('should return false on verification of unknown function execute', async () => {
    const tokenId = await registry.childIdOf(cryptoRoot, 'test_foo_13');

    const data = registry.interface.encodeFunctionData(
      'setOwner(address,uint256)',
      [receiver.address, tokenId],
    );
    const signature = await sign(data, signatureController.address, await signatureController.nonceOf(tokenId), owner);

    const req = {
      from: owner.address,
      nonce: await forwarder.nonceOf(tokenId),
      tokenId,
      data: data,
    };

    // verify signature
    const isValid = await forwarder.verify(req, signature);
    expect(isValid).to.be.equal(false);
  });
});
