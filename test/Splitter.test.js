const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Splitter', () => {
  async function countTxFee (tx) {
    const gasPrice = tx.gasPrice;
    const gasUsed = (await tx.wait()).gasUsed;
    return gasPrice.mul(gasUsed);
  }
  let Splitter;
  let splitter;
  let signers;
  let sender, receiverOne, receiverTwo, receiverThree, receiverFour;

  before(async () => {
    signers = await ethers.getSigners();
    [sender, receiverOne, receiverTwo, receiverThree, receiverFour] = signers;

    Splitter = await ethers.getContractFactory('Splitter');
    splitter = await Splitter.deploy();
  });

  it('should revert zero amount split', async () => {
    await splitter.connect(sender);
    await expect(splitter.split(receiverOne.address, receiverTwo.address, {
      value: 0,
    })).to.be.revertedWith('Amount to split should be greater than zero');
  });

  it('should revert withdrawal from address with zero balance', async () => {
    await splitter.connect(receiverFour);
    await expect(splitter.withdraw()).to.be.revertedWith('Zero balance, nothing to withdraw');
  });

  it('should equally split amount of wei and leave remaining part on sender balance', async () => {
    await splitter.connect(sender);
    await splitter.split(receiverOne.address, receiverTwo.address, {
      value: 10,
    });

    expect(await splitter.provider.getBalance(splitter.address)).to.be.equal(10);
    expect((await splitter.balanceMap(receiverOne.address))).to.be.equal(5);
    expect((await splitter.balanceMap(receiverTwo.address))).to.be.equal(5);
    expect((await splitter.balanceMap(sender.address))).to.be.equal(0);

    await splitter.split(receiverOne.address, receiverThree.address, {
      value: 21,
    });

    expect(await splitter.provider.getBalance(splitter.address)).to.be.equal(31);
    expect((await splitter.balanceMap(receiverOne.address))).to.be.equal(15);
    expect((await splitter.balanceMap(receiverThree.address))).to.be.equal(10);
    expect((await splitter.balanceMap(sender.address))).to.be.equal(1);

    const beforeWithdrawal = await splitter.provider.getBalance(receiverOne.address);
    const tx = await splitter.connect(receiverOne).withdraw();
    const txFee = await countTxFee(tx);

    const afterWithdrawal = await splitter.provider.getBalance(receiverOne.address);
    const expectedAfterWithdrawal = beforeWithdrawal.sub(txFee).add(15);

    expect(afterWithdrawal).to.be.equal(expectedAfterWithdrawal);
    expect(await splitter.provider.getBalance(splitter.address)).to.be.equal(16);
    expect((await splitter.balanceMap(receiverOne.address))).to.be.equal(0);
  });
});
