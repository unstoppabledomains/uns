const { ethers } = require('hardhat');
const { expect } = require('chai');

const { sign } = require('./../helpers/metatx');

const { BigNumber } = ethers;

describe('BaseForwarder', () => {
  let BaseForwarder, forwarder;
  let signers, owner;

  const buildExecuteParams = async (selector, params, from, tokenId) => {
    const data = forwarder.interface.encodeFunctionData(selector, params);
    const nonce = await forwarder.nonceOf(tokenId);
    const signature = await sign(data, forwarder.address, nonce, from);
    return { req: { from: from.address, nonce, tokenId, data }, signature };
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    BaseForwarder = await ethers.getContractFactory('BaseForwarderMock');

    forwarder = await BaseForwarder.deploy();
  });

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
});
