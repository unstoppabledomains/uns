const hre = require('hardhat');
const { expect } = require('chai');
const { utils, BigNumber } = require('ethers');

describe('CustodyERC20Contract', () => {

  let CustodyERC20Contract, custodyContract;
  let ERC20Token, erc20Token;
  let signers, owner, recipient;
  const SECRET_1 = "secret_1";
  const SECRET_2 = "secret_2";
  const SECRET_1_HASH = _getSecretHash(SECRET_1);
  const SECRET_2_HASH = _getSecretHash(SECRET_2);

  const NUMBER_OF_INIT_TOKENS_RECEIVER = 0;
  const NUMBER_OF_INIT_TOKENS_CONTRACT = 0;
  const NUMBER_OF_INIT_TOKENS_OWNER = 10000;
  const NUMBER_OF_TOKENS_TO_TRANSFER = 1000;
  const DEPOSIT_RELEASE_TIMESTAMP_ZERO = 0;

  const DEPOSIT_EVENT_NAME = "Deposit";
  const WITHDRAWAL_EVENT_NAME = "Withdrawal"


  beforeEach(async () => {
    await hre.network.provider.send("hardhat_reset")
    signers = await ethers.getSigners();
    [owner, recipient] = signers;

    CustodyERC20Contract = await ethers.getContractFactory('CustodyERC20Contract');
    ERC20Token = await ethers.getContractFactory('ERC20Mock');

    erc20Token = await ERC20Token.deploy();
    await erc20Token.initialize(NUMBER_OF_INIT_TOKENS_OWNER);

    custodyContract = await CustodyERC20Contract.deploy();
    await custodyContract.initialize(erc20Token.address);
  })

  describe('Deposit tokens', async () => {
    it('should revert when owners token allowance is not enough', async () => {
      await expect(custodyContract.depositTokens(
        NUMBER_OF_TOKENS_TO_TRANSFER,
        DEPOSIT_RELEASE_TIMESTAMP_ZERO,
        SECRET_1_HASH
      )).to.be.revertedWith('Allowance is less then required');
    })

    it('should revert when sender does not have enough tokens', async () => {
      await _transferTokens(owner, recipient.address, NUMBER_OF_INIT_TOKENS_OWNER);
      await _approveTokensTransfer(owner, custodyContract.address, NUMBER_OF_TOKENS_TO_TRANSFER);
      await expect(custodyContract.depositTokens(
        NUMBER_OF_TOKENS_TO_TRANSFER,
        DEPOSIT_RELEASE_TIMESTAMP_ZERO,
        SECRET_1_HASH
      )).to.be.revertedWith('ERC20: transfer amount exceeds balance'); // standart erc20 error.
    })

    it('should revert deposit with the same secret', async () => {
      await _approveAndDeposit( //deposit first time
        owner,
        NUMBER_OF_TOKENS_TO_TRANSFER,
        DEPOSIT_RELEASE_TIMESTAMP_ZERO,
        SECRET_1_HASH);

      await expect(_approveAndDeposit( //deposit second time with the same hash
        owner,
        NUMBER_OF_TOKENS_TO_TRANSFER,
        DEPOSIT_RELEASE_TIMESTAMP_ZERO,
        SECRET_1_HASH))
        .to.be.revertedWith('Deposit with such secretHash already exist');
    });

    it('should emit a Deposit event.', async () => {
      await expect(_approveAndDeposit(
        owner,
        NUMBER_OF_TOKENS_TO_TRANSFER,
        DEPOSIT_RELEASE_TIMESTAMP_ZERO,
        SECRET_1_HASH))
        .to.emit(custodyContract, DEPOSIT_EVENT_NAME)
        .withArgs(owner.address, NUMBER_OF_TOKENS_TO_TRANSFER, DEPOSIT_RELEASE_TIMESTAMP_ZERO);
    });

    it('should increment contract balance.', async () => {
      await _approveAndDeposit(
        owner,
        NUMBER_OF_TOKENS_TO_TRANSFER,
        DEPOSIT_RELEASE_TIMESTAMP_ZERO,
        SECRET_1_HASH);

      await expect(await erc20Token.balanceOf(custodyContract.address))
        .to.be.equal(NUMBER_OF_TOKENS_TO_TRANSFER);
    });

    it('should decrement sender balance.', async () => {
      await _approveAndDeposit(
        owner,
        NUMBER_OF_TOKENS_TO_TRANSFER,
        DEPOSIT_RELEASE_TIMESTAMP_ZERO,
        SECRET_1_HASH);

      await expect(await erc20Token.balanceOf(owner.address))
        .to.be.equal(NUMBER_OF_INIT_TOKENS_OWNER - NUMBER_OF_TOKENS_TO_TRANSFER);
    });
  })

  describe('Withdraw" tokens', async () => {
    beforeEach(async () => {
      await _approveAndDeposit(
        owner,
        NUMBER_OF_TOKENS_TO_TRANSFER,
        _getTimestampAhead(10),
        SECRET_1_HASH);
    })

    it('recipient can not withdraw with wrong secret', async () => {
      await expect(custodyContract.connect(recipient).withdrawTokens(SECRET_2))
        .to.revertedWith('Deposit by this secret is not available');
    });

    it('owner can not withdraw before deposit release', async () => {
      await expect(custodyContract.withdrawTokens(SECRET_1))
        .to.revertedWith('Deposit is not released for owner yet');
    });

    it('owner should be able to withdraw after the release', async () => {
      await hre.network.provider.send("evm_setNextBlockTimestamp", [_getTimestampAhead(10)]);

      await expect(custodyContract.withdrawTokens(SECRET_1))
        .to.emit(custodyContract, WITHDRAWAL_EVENT_NAME)
        .withArgs(SECRET_1, owner.address, NUMBER_OF_TOKENS_TO_TRANSFER);

      await expect(await erc20Token.balanceOf(custodyContract.address))
        .to.be.equal(NUMBER_OF_INIT_TOKENS_CONTRACT);

      await expect(await erc20Token.balanceOf(owner.address))
        .to.be.equal(NUMBER_OF_INIT_TOKENS_OWNER);
    });

    it('should emit Withdrawal event', async () => {
      await expect(custodyContract.connect(recipient).withdrawTokens(SECRET_1))
        .to.emit(custodyContract, WITHDRAWAL_EVENT_NAME)
        .withArgs(SECRET_1, recipient.address, NUMBER_OF_TOKENS_TO_TRANSFER);
    })

    it('should increment recipient balance', async () => {
      await custodyContract.connect(recipient).withdrawTokens(SECRET_1)
      
      await expect(await erc20Token.balanceOf(recipient.address))
        .to.be.equal(NUMBER_OF_INIT_TOKENS_RECEIVER + NUMBER_OF_TOKENS_TO_TRANSFER);
    })

    it('should decrement custody contract balance', async () => {
      await custodyContract.connect(recipient).withdrawTokens(SECRET_1)
      
      await expect(await erc20Token.balanceOf(custodyContract.address))
        .to.be.equal(NUMBER_OF_INIT_TOKENS_CONTRACT);
    })

  });

  function _getSecretHash(secret) {
    return utils.keccak256(utils.defaultAbiCoder.encode(['string'], [secret]));
  }

  async function _approveTokensTransfer(sender, recipientAddress, numberOfTokens) {
    await erc20Token.connect(sender).approve(recipientAddress, numberOfTokens);
  }

  async function _transferTokens(sender, recipientAddress, numberOfTokens) {
    await erc20Token.connect(sender).transfer(recipientAddress, numberOfTokens);
  }

  async function _approveAndDeposit(owner, numberOfTokens, depositReleaseTime, hash) {
    await _approveTokensTransfer(owner, custodyContract.address, numberOfTokens);
    return await custodyContract.connect(owner).depositTokens(
      numberOfTokens,
      depositReleaseTime,
      hash
    )
  }

  function _getTimestampAhead(secondsToAdd) {
    return Date.now() + secondsToAdd;
  }

});