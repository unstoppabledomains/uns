const { ethers } = require('hardhat');
const { expect } = require('chai');

const { sign } = require('../helpers/metatx');

const { BigNumber } = ethers;

describe('RegistryForwarder', () => {
  let RegistryForwarder, forwarder;
  let signers, owner;

  const buildExecuteFuncParams = async (selector, params, from, tokenId) => {
    const data = forwarder.interface.encodeFunctionData(selector, params);
    return buildExecuteParams(data, from, tokenId);
  };

  const buildExecuteParams = async (data, from, tokenId) => {
    const nonce = await forwarder.nonceOf(tokenId);
    const signature = await sign(data, forwarder.address, nonce, from);
    return { req: { from: from.address, tokenId, nonce, data }, signature };
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    RegistryForwarder = await ethers.getContractFactory('RegistryForwarderMock');

    forwarder = await RegistryForwarder.deploy();
    await forwarder.initialize();
  });

  describe('Verify', () => {
    it('should verify signature', async () => {
      const tokenId = BigNumber.from(132);
      const { req, signature } = await buildExecuteParams('0x', owner, tokenId);
      expect(await forwarder.verify(req, signature)).to.be.eq(true);
    });

    it('should verify signature when tokenId is empty', async () => {
      const { req, signature } = await buildExecuteParams('0x', owner, 0);
      expect(await forwarder.verify(req, signature)).to.be.eq(true);
    });

    it('should fail verification when signature is tampered', async () => {
      const { req, signature } = await buildExecuteParams('0x', owner, 0);
      const tamperedReq = { ...req, nonce: 100 };
      expect(await forwarder.verify(tamperedReq, signature)).to.be.eq(false);
    });
  });

  describe('Execute', () => {
    it('should execute when signature is valid', async () => {
      const tokenId = BigNumber.from(132);
      const nonce = await forwarder.nonceOf(tokenId);

      const { req, signature } = await buildExecuteFuncParams('nonceOf(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.nonceOf(tokenId)).to.be.equal(nonce.add(1));
    });

    // NOTE: When tokenId is empty, req.from is used for nonce verification
    it('should execute when signature is valid and tokenId is empty', async () => {
      const tokenId = 0;
      const nonce = await forwarder.nonceOf(tokenId);
      const { req, signature } = await buildExecuteFuncParams('nonceOf(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.nonceOf(tokenId)).to.be.equal(nonce.add(1));
    });

    it('should fail execution when signature is tampered', async () => {
      const tokenId = 0;
      const nonce = await forwarder.nonceOf(tokenId);
      const { req, signature } = await buildExecuteFuncParams('nonceOf(uint256)', [tokenId], owner, tokenId);

      await expect(
        forwarder.execute({ ...req, nonce: nonce.add(1) }, signature),
      ).to.be.revertedWith('RegistryForwarder: SIGNATURE_INVALID');
    });
  });
});
