const { ethers } = require('hardhat');
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { utils } = ethers;

describe('GringottsEscrow', function () {
  let GringottsEscrow;
  let hardhatGringottsEscrow;
  let addr1, addr2;
  let lastestBlock;

  let secret;
  let secretHash;

  beforeEach(async () => {
    GringottsEscrow = await ethers.getContractFactory('GringottsEscrow');
    [addr1, addr2] = await ethers.getSigners();

    hardhatGringottsEscrow = await GringottsEscrow.deploy();
    lastestBlock = await ethers.provider.getBlock('latest');

    secret = 'secret';
    secretHash = utils.keccak256(
      utils.solidityPack(
        ['string', 'address'],
        [secret, hardhatGringottsEscrow.address.toLowerCase()],
      ),
    );
  });

  describe('deposit', () => {
    it('should revert when duplicate secret', async () => {
      await hardhatGringottsEscrow
        .connect(addr1)
        .deposit(secretHash, lastestBlock.timestamp + 3600, {
          value: ethers.utils.parseEther('0.5'),
        });

      await expect(
        hardhatGringottsEscrow
          .connect(addr1)
          .deposit(secretHash, lastestBlock.timestamp + 3600, {
            value: ethers.utils.parseEther('0.5'),
          }),
      ).to.be.revertedWith('DUPLICATE_SECRET');
    });

    it('should revert when amount is 0', async () => {
      await expect(
        hardhatGringottsEscrow
          .connect(addr1)
          .deposit(secretHash, lastestBlock.timestamp + 3600),
      ).to.be.revertedWith('ZERO_AMOUNT');
    });

    it('should revert when expiration date is in the past', async () => {
      await expect(
        hardhatGringottsEscrow
          .connect(addr1)
          .deposit(secretHash, 100, { value: ethers.utils.parseEther('0.5') }),
      ).to.be.revertedWith('WRONG_EXPIRATION');
    });
  });

  describe('withdraw', () => {
    it('should revert when secret does not exist', async () => {
      await expect(
        hardhatGringottsEscrow.connect(addr1).withdraw(secret),
      ).to.be.revertedWith('UNKNOWN_SECRET');
    });

    it('should revert when owner tries to withdraw before the escrow expiration date', async () => {
      await hardhatGringottsEscrow
        .connect(addr1)
        .deposit(secretHash, lastestBlock.timestamp + 3600, {
          value: ethers.utils.parseEther('0.5'),
        });

      await expect(
        hardhatGringottsEscrow.connect(addr1).withdraw(secret),
      ).to.be.revertedWith('ESCROW_LOCKED');
    });

    it('should revert when not owner tries to withdraw after the escrow expiration date', async () => {
      await hardhatGringottsEscrow
        .connect(addr1)
        .deposit(secretHash, lastestBlock.timestamp + 3600, {
          value: ethers.utils.parseEther('0.5'),
        });

      await network.provider.send('evm_increaseTime', [3700]);

      await expect(
        hardhatGringottsEscrow.connect(addr2).withdraw(secret),
      ).to.be.revertedWith('ESCROW_UNLOCKED');
    });

    it('should withdraw when not owner tries to withdraw before the escrow expiration date', async () => {
      await hardhatGringottsEscrow
        .connect(addr1)
        .deposit(secretHash, lastestBlock.timestamp + 3600, {
          value: ethers.utils.parseEther('0.5'),
        });

      const startBalance = await addr2.getBalance();
      const tx = await hardhatGringottsEscrow.connect(addr2).withdraw(secret);
      tx.receipt = await tx.wait();

      expect((await addr2.getBalance()).sub(startBalance)).to.be.equal(
        BigNumber.from('500000000000000000').sub(tx.receipt.gasUsed),
      );
    });

    it('should withdraw when owner tries to withdraw after the escrow expiration date', async () => {
      await hardhatGringottsEscrow
        .connect(addr1)
        .deposit(secretHash, lastestBlock.timestamp + 3600, {
          value: ethers.utils.parseEther('0.5'),
        });

      await network.provider.send('evm_increaseTime', [3700]);

      const startBalance = await addr1.getBalance();
      const tx = await hardhatGringottsEscrow.connect(addr1).withdraw(secret);
      tx.receipt = await tx.wait();

      expect((await addr1.getBalance()).sub(startBalance)).to.be.equal(
        BigNumber.from('500000000000000000').sub(tx.receipt.gasUsed),
      );
    });

    it('should not allow double spending', async () => {
      await hardhatGringottsEscrow
        .connect(addr1)
        .deposit(secretHash, lastestBlock.timestamp + 3600, {
          value: ethers.utils.parseEther('0.5'),
        });

      await hardhatGringottsEscrow.connect(addr2).withdraw(secret);

      await expect(
        hardhatGringottsEscrow.connect(addr2).withdraw(secret),
      ).to.be.revertedWith('UNKNOWN_SECRET');
    });
  });
});
