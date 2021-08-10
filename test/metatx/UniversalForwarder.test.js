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

const getReason = (returnData) => {
  let reason;
  if (returnData && returnData.slice(2, 10).toString('hex') === '08c379a0') {
    const abiCoder = new utils.AbiCoder();
    reason = abiCoder.decode(['string'], '0x' + returnData.slice(10))[0];
  }
  return reason;
};

describe('UniversalForwarder', () => {
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

  let UniversalForwarder, CNSRegistry, MintingController, SignatureController;
  let forwarder, registry, mintingController, signatureController;
  let signers, owner, receiver;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    UniversalForwarder = await ethers.getContractFactory('UniversalForwarder');
    CNSRegistry = await ethers.getContractFactory('dot-crypto/contracts/CNSRegistry.sol:CNSRegistry');
    MintingController =
      await ethers.getContractFactory('dot-crypto/contracts/controllers/MintingController.sol:MintingController');
    SignatureController =
      await ethers.getContractFactory('dot-crypto/contracts/controllers/SignatureController.sol:SignatureController');

    forwarder = await UniversalForwarder.deploy();
    await forwarder.initialize();

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);
  });

  it('should execute', async () => {
    const _domainName = 'test_foo';
    await mintingController.mintSLD(owner.address, _domainName);
    const tokenId = await registry.childIdOf(cryptoRoot, _domainName);

    const data = registry.interface.encodeFunctionData(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenId],
    );
    const signature = await sign(data, signatureController.address, await signatureController.nonceOf(tokenId), owner);

    const proxyData = signatureController.interface.encodeFunctionData(
      'transferFromFor(address,address,uint256,bytes)',
      [owner.address, receiver.address, tokenId, signature],
    );
    console.log('proxyData', proxyData);

    const req = {
      from: owner.address,
      to: signatureController.address,
      gas: '200000',
      nonce: 0,
      data: data,
    };
    const [success, returnData] = await forwarder.callStatic.execute(req, signature);
    if (!success) {
      console.error(getReason(returnData));
    }
    expect(success).to.be.equal(true);

    // assert execution result
    await forwarder.execute(req, signature);
    expect(await registry.ownerOf(tokenId)).to.be.equal(receiver.address);
  });

  it('aaa', async () => {
    const _domainName = 'test_foo_11';
    const tokenId = await registry.childIdOf(cryptoRoot, _domainName);

    const data = registry.interface.encodeFunctionData(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenId],
    );
    console.log('DATA', data);

    const signature = await sign(data, signatureController.address, await signatureController.nonceOf(tokenId), owner);
    console.log('SIG', signature);

    const req = {
      from: owner.address,
      to: signatureController.address,
      gas: '200000',
      nonce: 0,
      data: data,
    };
    const ad = await forwarder.callStatic.build(req, signature);
    console.log(ad);
  });
});
