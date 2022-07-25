const { ethers } = require('hardhat');
const { expect } = require('chai');

const { sign } = require('./../helpers/metatx');

const { BigNumber } = ethers;

describe('BaseForwarder', () => {
  let BaseForwarder, forwarder;
  let signers, owner, account;

  let ERC1271SmartWalletFactory, ERC1271SmartWallet;
  let ERC1271EmptyMockFactory, ERC1271EmptyMockContract;

  const buildExecuteParams = async (selector, params, from, tokenId) => {
    const data = forwarder.interface.encodeFunctionData(selector, params);
    const nonce = await forwarder.nonceOf(tokenId);
    const signature = await sign(data, forwarder.address, nonce, from);
    return { req: { from: from.address, nonce, tokenId, data }, signature };
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner, account] = signers;

    BaseForwarder = await ethers.getContractFactory('BaseForwarderMock');
    ERC1271SmartWalletFactory = await ethers.getContractFactory('ERC1271SimpleSmartWallet');
    ERC1271EmptyMockFactory = await ethers.getContractFactory('ERC1271EmptyMock');

    forwarder = await BaseForwarder.deploy();
    ERC1271SmartWallet = await ERC1271SmartWalletFactory.deploy(owner.address);
    ERC1271EmptyMockContract = await ERC1271EmptyMockFactory.deploy();
  });

  describe('Verify', async () => {
    it('should verify when the signature is valid', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams('revertWithReason()', [], owner, tokenId);

      expect(await forwarder.verify(req, signature)).to.eq(true);
    });

    it('should verify that the address matches the recovered one', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams('revertWithReason()', [], owner, tokenId);

      expect(await forwarder.verify({ ...req, from: account.address }, signature)).to.eq(false);
    });

    it('should verify that nonces match the address once', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams('revertWithReason()', [], owner, tokenId);

      expect(await forwarder.verify({ ...req, nonce: 42 }, signature)).to.eq(false);
    });

    describe('with metatx from contract addresses', async () => {
      it('should be able to verify the ERC1271 contract signature', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams('mintAsset()', [], owner, tokenId);

        expect(await forwarder.verify({ ...req, from: ERC1271SmartWallet.address }, signature)).to.eq(true);
      });

      it('should be able to handle situation when ERC1271 contract returns false', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams('mintAsset()', [], account, tokenId);

        expect(await forwarder.verify({ ...req, from: ERC1271SmartWallet.address }, signature)).to.eq(false);
      });

      it('should be able to handle situation when contract does not implement ERC1271', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams('mintAsset()', [], owner, tokenId);

        expect(await forwarder.verify({ ...req, from: ERC1271EmptyMockContract.address }, signature)).to.eq(false);
      });
    });
  });

  describe('Execute', async () => {
    it('should revert with native reason', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams('revertWithReason()', [], owner, tokenId);

      await expect(
        forwarder.execute(req, signature),
      ).to.be.revertedWith('AAAAAA');
    });

    it('should revert with forwarding reason', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams('revertWithoutReason()', [], owner, tokenId);

      await expect(
        forwarder.execute(req, signature),
      ).to.be.revertedWith('BaseForwarder: CALL_FAILED');
    });

    describe('metatx from contract addresses', async () => {
      it('should be able to mint asset on behalf of ERC1271SmartWallet', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams('mintAsset()', [], owner, tokenId);

        await forwarder.execute({ ...req, from: ERC1271SmartWallet.address }, signature);

        expect(await forwarder.hasAsset(ERC1271SmartWallet.address)).to.eq(true);
      });

      it('should revert when the signature is made not on behalf of smart wallet owner', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams('mintAsset()', [], account, tokenId);

        await expect(
          forwarder.execute({ ...req, from: ERC1271EmptyMockContract.address }, signature),
        ).to.be.revertedWith('BaseForwarderMock: SIGNATURE_INVALID');
      });

      it('should revert when contract does not implement ERC1271', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams('mintAsset()', [], owner, tokenId);

        await expect(
          forwarder.execute({ ...req, from: ERC1271EmptyMockContract.address }, signature),
        ).to.be.revertedWith('BaseForwarderMock: SIGNATURE_INVALID');
      });
    });
  });
});
