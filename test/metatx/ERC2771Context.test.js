const { ethers } = require('hardhat');
const { expect } = require('chai');

const { buildExecuteFunc } = require('../helpers/metatx');

const { utils, BigNumber } = ethers;

describe('ERC2771Context', () => {
  let ERC2771Context, MintingManagerForwarder, context, forwarder;
  let signers, owner, buildExecuteParams;

  before(async () => {
    signers = await ethers.getSigners();
    [owner] = signers;

    ERC2771Context = await ethers.getContractFactory('ERC2771ContextMock');
    MintingManagerForwarder = await ethers.getContractFactory('MintingManagerForwarder');

    context = await ERC2771Context.deploy();
    forwarder = await MintingManagerForwarder.deploy(context.address);

    await context.initialize(forwarder.address);

    buildExecuteParams = buildExecuteFunc(context.interface, context.address, forwarder);
  });

  it('should verify', async () => {
    const tokenId = BigNumber.from(1);
    const { req, signature } = await buildExecuteParams(
      'run()', [], owner, tokenId);

    expect(await forwarder.verify(req, signature)).to.be.equal(true);

    const abiCoder = new utils.AbiCoder();
    const data = abiCoder.decode(['string'], await forwarder.callStatic.execute(req, signature))[0];
    expect(data).to.be.equal('ERC2771ContextMock: run');
  });
});
