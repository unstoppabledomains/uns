import { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { UNSRegistryForwarderMock } from '../../types/contracts/mocks';
import { UNSRegistryForwarderMock__factory } from '../../types/factories/contracts/mocks';

describe('UNSRegistryForwarder', () => {
  let forwarder: UNSRegistryForwarderMock;
  let signers: SignerWithAddress[], owner: SignerWithAddress;

  let buildExecuteParams: ExecuteFunc;

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    forwarder = await new UNSRegistryForwarderMock__factory(owner).deploy();

    await forwarder.initialize();

    buildExecuteParams = buildExecuteFunc(forwarder.interface, forwarder.address, forwarder);
  });

  describe('Verify', () => {
    it('should verify signature', async () => {
      const tokenId = BigNumber.from(132);
      const { req, signature } = await buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.eq(true);
    });

    it('should verify signature when tokenId is empty', async () => {
      const tokenId = BigNumber.from(132);
      const { req, signature } = await buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);

      expect(await forwarder.verify(req, signature)).to.be.eq(true);
    });

    it('should fail verification when signature is tampered', async () => {
      const tokenId = BigNumber.from(132);
      const { req, signature } = await buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
      const tamperedReq = { ...req, nonce: 100 };

      expect(await forwarder.verify(tamperedReq, signature)).to.be.eq(false);
    });
  });

  describe('Execute', () => {
    it('should execute when signature is valid', async () => {
      const tokenId = BigNumber.from(132);
      const nonce = await forwarder.nonceOf(tokenId);

      const { req, signature } = await buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.nonceOf(tokenId)).to.be.equal(nonce.add(1));
    });

    // NOTE: When tokenId is empty, req.from is used for nonce verification
    it('should execute when signature is valid and tokenId is empty', async () => {
      const tokenId = 0;
      const nonce = await forwarder.nonceOf(tokenId);
      const { req, signature } = await buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);
      await forwarder.execute(req, signature);

      expect(await forwarder.nonceOf(tokenId)).to.be.equal(nonce.add(1));
    });

    it('should fail execution when signature is tampered', async () => {
      const tokenId = 0;
      const nonce = await forwarder.nonceOf(tokenId);
      const { req, signature } = await buildExecuteParams('nonceOf(uint256)', [tokenId], owner, tokenId);

      await expect(
        forwarder.execute({ ...req, nonce: nonce.add(1) }, signature),
      ).to.be.revertedWith('UNSRegistryForwarder: SIGNATURE_INVALID');
    });
  });
});
