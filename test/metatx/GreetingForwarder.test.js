const { ethers } = require('hardhat');
const { expect } = require('chai');

const { sign } = require('../helpers/metatx');

describe('GreetingForwarder', () => {
  let signer, owner;
  let greetingContractFactory, greetingContract;
  let greetingForwarderContractFactory, greetingForwarderContract;

  const name = 'Awesome name';

  const buildExecuteFuncParams = async (selector, params, from) => {
    const data = greetingContract.interface.encodeFunctionData(selector, params);
    return buildExecuteParams(data, from);
  };

  const buildExecuteParams = async (data, from) => {
    const nonce = await greetingForwarderContract.nonceOf(from.address);
    const signature = await sign(data, greetingContract.address, nonce, from);
    return { req: { from: from.address, nonce, data }, signature };
  };

  before(async () => {
    [signer, owner] = await ethers.getSigners();

    greetingContractFactory = await ethers.getContractFactory('Greeting', owner);
    greetingContract = await greetingContractFactory.deploy();

    greetingForwarderContractFactory = await ethers.getContractFactory('GreetingForwarder', owner);
    greetingForwarderContract = await greetingForwarderContractFactory.deploy(greetingContract.address);

    await greetingContract.setForwarder(greetingForwarderContract.address);
  });

  describe('Verify', async () => {
    it('returns true when signature is valid', async () => {
      const { req, signature } = await buildExecuteParams('0x', signer);

      expect(await greetingForwarderContract.connect(owner).verify(req, signature)).to.eq(true);
    });

    it('returns false when signature is invalid', async () => {
      const { req, signature } = await buildExecuteParams('0x', owner);

      expect(await greetingForwarderContract.connect(owner).verify(req, signature)).to.eq(true);
    });
  });

  describe('NonceOf', async () => {
    it('returns nonce of the account', async () => {
      expect(await greetingForwarderContract.nonceOf(signer.address)).to.eq(0);
    });

    it('increments nonce after forwarding with one', async () => {
      const { req, signature } = await buildExecuteFuncParams('rememberName(string)', [name], signer);

      await greetingForwarderContract.connect(owner).execute(req, signature);

      expect(await greetingForwarderContract.nonceOf(signer.address)).to.eq(1);
    });
  });

  describe('Execute', async () => {
    it('executes Greeting rememeberName function properly', async () => {
      const { req, signature } = await buildExecuteFuncParams('rememberName(string)', [name], signer);

      await greetingForwarderContract.connect(owner).execute(req, signature);

      expect(await greetingContract.connect(signer).greet()).to.eq(`Hello, ${name}`);
      expect(await greetingContract.connect(owner).greet()).to.eq(`Hello, ${owner.address.toLowerCase()}`);
    });

    it('reverts transaction when the signature is invalid', async () => {
      const { req, signature } = await buildExecuteFuncParams('rememberName(string)', [name], owner);

      await expect(
        greetingForwarderContract.connect(owner).execute({ ...req, from: signer.address }, signature),
      ).to.be.revertedWith('GreetingForwarder: SIGNATURE_INVALID');
    });

    it('reverts transaction when a similar transaction with same nonce have been already made', async () => {
      const { req, signature } = await buildExecuteFuncParams('rememberName(string)', [name], owner);

      await greetingForwarderContract.connect(owner).execute(req, signature);

      await expect(
        greetingForwarderContract.connect(owner).execute(req, signature),
      ).to.be.revertedWith('GreetingForwarder: SIGNATURE_INVALID');
    });

    it('reverts transaction when there is an error', async () => {
      const { req, signature } = await buildExecuteParams('0x1243245f', signer);

      await expect(
        greetingForwarderContract.connect(owner).execute(req, signature),
      ).to.be.revertedWith('GreetingForwarder: FORWARD_CALL_FAILED');
    });
  });
});
