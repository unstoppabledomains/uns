const { ethers } = require('hardhat');
const { expect } = require('chai');

const { ZERO_ADDRESS } = require('../helpers/constants');

const { BigNumber } = ethers;

describe('TwitterValidationOperator', () => {
  const domainName = 'twitter-validation';
  const operatorInitialBalance = 100;

  // eslint-disable-next-line max-len
  const signature = '0x1bd3c1e0eb3d9143d6365cfd328a002e01b01d1acd719b12d37d8791fbaeed7b0b850d995c3e32ba79b34dbb15962bd68529f9360eb7507961f67e7e6645e9a41b';

  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
  const walletRoot = BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230');

  const keys = ['social.twitter.username', 'validation.social.twitter.username'];

  let Registry, TwitterValidationOperator, CryptoRegistry, CryptoResolver, CryptoMintingController, LinkTokenMock;
  let linkToken, unsRegistry, cnsRegistry, cnsMintingController, cnsResolver, operator;
  let signers, coinbase, whitelisted, paymentCapper, fundsReceiver, validationRequester;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, whitelisted, paymentCapper, fundsReceiver, validationRequester] = signers;

    Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
    CryptoRegistry = await ethers.getContractFactory('contracts/cns/CryptoRegistry.sol:CryptoRegistry');
    CryptoResolver = await ethers.getContractFactory('contracts/cns/CryptoResolver.sol:CryptoResolver');
    CryptoMintingController =
      await ethers.getContractFactory('contracts/cns/CryptoMintingController.sol:CryptoMintingController');
    TwitterValidationOperator = await ethers.getContractFactory('TwitterValidationOperator');
    LinkTokenMock = await ethers.getContractFactory('LinkTokenMock');

    linkToken = await LinkTokenMock.deploy();
    await linkToken.initialize();
    await linkToken.mint(coinbase.address, 100500);

    // deploy UNS
    unsRegistry = await Registry.deploy();
    await unsRegistry.initialize(coinbase.address);

    // deploy CNS
    cnsRegistry = await CryptoRegistry.deploy();
    cnsMintingController = await CryptoMintingController.deploy(cnsRegistry.address);
    await cnsRegistry.addController(cnsMintingController.address);
    cnsResolver = await CryptoResolver.deploy(cnsRegistry.address, cnsMintingController.address);
  });

  const mintUNSToken = async (root, label) => {
    const tokenId = await unsRegistry.childIdOf(root, label);
    await unsRegistry.mint(coinbase.address, tokenId, '');
    await unsRegistry.approve(operator.address, tokenId);
    return tokenId;
  };

  const mintCNSToken = async (root, label) => {
    const tokenId = await cnsRegistry.childIdOf(root, label);
    await cnsMintingController.mintSLDWithResolver(coinbase.address, label, cnsResolver.address);
    await cnsRegistry.approve(operator.address, tokenId);
    return tokenId;
  };

  describe('generic', () => {
    beforeEach(async () => {
      operator = await TwitterValidationOperator.deploy(
        unsRegistry.address,
        cnsRegistry.address,
        linkToken.address,
        [paymentCapper.address],
      );
      await operator.addWhitelisted(whitelisted.address);
      await operator.connect(paymentCapper).setPaymentPerValidation(1, 2);
      await linkToken.transfer(operator.address, operatorInitialBalance);
    });

    it('should set twitter username and signature for .wallet domain', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q103`);
      const _operator = await operator.connect(whitelisted);

      await _operator.setValidation('rainberk', signature, walletTokenId, 0);
      const validationRecords = await unsRegistry.getMany(keys, walletTokenId);
      assert.deepEqual(validationRecords, ['rainberk', signature]);

      await _operator.setValidation('apple', signature, walletTokenId, 0);

      assert.deepEqual(await unsRegistry.getMany(keys, walletTokenId), ['apple', signature]);
    });

    it('should set twitter username and signature for .crypto domain', async () => {
      const cryptoTokenId = await mintCNSToken(cryptoRoot, `${domainName}_q313`);
      const _operator = await operator.connect(whitelisted);

      await _operator.setValidation('google', signature, cryptoTokenId, 0);

      assert.deepEqual(await cnsResolver.getMany(keys, cryptoTokenId), ['google', signature]);
    });

    it('should unlock LINK tokens after validation', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q9w3`);
      const withdrawalAmount = await operator.withdrawableTokens();
      const paymentPerValidation = await operator.operatorPaymentPerValidation();

      await operator.connect(whitelisted).setValidation('rainberk', 'signature', walletTokenId, 0);

      const expectedAmount = withdrawalAmount.add(paymentPerValidation).toNumber();
      const actualAmount = (await operator.withdrawableTokens()).toNumber();
      assert.equal(actualAmount, expectedAmount);
    });

    it('should withdraw allowed LINK tokens', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q56w3`);
      const funderInitialBalance = await linkToken.balanceOf(fundsReceiver.address);
      await operator.connect(whitelisted).setValidation('rainberk', 'signature', walletTokenId, 0);
      const withdrawableTokens = await operator.withdrawableTokens();
      await operator.withdraw(fundsReceiver.address, withdrawableTokens);

      const expectedBalance = funderInitialBalance.add(withdrawableTokens).toNumber();
      const actualBalance = (await linkToken.balanceOf(fundsReceiver.address)).toNumber();
      assert.isAbove(actualBalance, 0);
      assert.equal(actualBalance, expectedBalance);
    });

    it('should not allow to withdraw more LINK tokens that were unlocked', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q93w3`);
      await operator.connect(whitelisted)
        .setValidation('rainberk', 'signature', walletTokenId, 0);
      const withdrawableTokens = (await operator.withdrawableTokens()).toNumber();

      await expect(
        operator.withdraw(fundsReceiver.address, withdrawableTokens + 1),
      ).to.be.revertedWith('TwitterValidationOperator: TOO_MANY_TOKENS_REQUESTED');
    });

    it('should not allow to withdraw LINK tokens from non-admin address', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q03w9`);
      await operator.connect(whitelisted).setValidation('rainberk', 'signature', walletTokenId, 0);
      const withdrawableTokens = await operator.withdrawableTokens();

      await expect(
        operator.connect(whitelisted).withdraw(fundsReceiver.address, withdrawableTokens + 1),
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_ADMIN');
    });

    it('should not allowed to set validation from non-whitelised address', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q08j9`);
      await expect(
        operator.connect(fundsReceiver).setValidation('rainberk', 'signature', walletTokenId, 0),
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
    });

    it('should unlock LINK tokens for each validation', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q18k9`);
      const _operator = await operator.connect(whitelisted);
      const paymentPerValidation = (await operator.operatorPaymentPerValidation()).toNumber();

      await _operator.setValidation('rainberk', 'signature', walletTokenId, 0);
      await _operator.setValidation('rainberk', 'signature', walletTokenId, 0);
      await _operator.setValidation('rainberk', 'signature', walletTokenId, 0);

      const tokensAvailable = (await operator.withdrawableTokens()).toNumber();
      assert.equal(tokensAvailable, paymentPerValidation * 3);
    });

    it('should not allow set price per validation from Admin', async () => {
      await expect(
        operator.connect(coinbase).setPaymentPerValidation(100, 0),
      ).to.be.revertedWith('CapperRole: CALLER_IS_NOT_CAPPER');
    });

    it('should not allow set price per valiation from Whitelisted', async () => {
      await expect(
        operator.connect(whitelisted).setPaymentPerValidation(100, 0),
      ).to.be.revertedWith('CapperRole: CALLER_IS_NOT_CAPPER');
    });

    it('should pass canSetValidation check', async () => {
      assert.isTrue(await operator.connect(whitelisted).canSetValidation());
    });

    it('should fail canSetValidation from non-whitelisted address', async () => {
      await expect(operator.canSetValidation())
        .to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
    });

    it('should fail canSetValidation if not enough balance', async () => {
      await operator.connect(paymentCapper).setPaymentPerValidation(999999, 0);
      await expect(operator.connect(whitelisted).canSetValidation())
        .to.be.revertedWith('TwitterValidationOperator: NOT_ENOUGH_TOKENS_ON_CONTRACT_BALANCE');
    });

    it('should set payment per validation for operator and user', async () => {
      const operatorPaymentAmount = 10;
      const userPaymentAmount = 20;
      await operator.connect(paymentCapper).setPaymentPerValidation(operatorPaymentAmount, userPaymentAmount);
      assert.equal((await operator.operatorPaymentPerValidation()).toNumber(), operatorPaymentAmount);
      assert.equal((await operator.userPaymentPerValidation()).toNumber(), userPaymentAmount);
    });

    it('should initiate validation via LINK token transfer', async () => {
      const guestManageDomainName = 'guest-manage-verification';
      const tokenId = await unsRegistry.childIdOf(walletRoot, guestManageDomainName);
      await unsRegistry.mint(validationRequester.address, tokenId, guestManageDomainName);
      await unsRegistry.connect(validationRequester).approve(operator.address, tokenId);

      const operatorInitialBalance = await linkToken.balanceOf(operator.address);
      const userPaymentPerValidation = 2;
      const validationCode = 'adDweFs12fdSAd231aAdW21';
      const validationData = web3.eth.abi.encodeParameters(['uint256', 'string'], [tokenId.toString(), validationCode]);
      await linkToken.transfer(validationRequester.address, userPaymentPerValidation);

      await expect(
        linkToken.connect(validationRequester)
          .transferAndCall(operator.address, userPaymentPerValidation, validationData),
      ).to.emit(operator, 'ValidationRequest')
        .withArgs(
          tokenId.toString(),
          validationRequester.address,
          1,
          validationCode,
        );

      const operatorBalance = await linkToken.balanceOf(operator.address);
      assert.equal(operatorBalance.sub(operatorInitialBalance).toNumber(), userPaymentPerValidation);
      assert.equal((await operator.availableBalance()).toNumber(), operatorInitialBalance.toNumber());
    });

    it('should fail if trying initiate verification with incorrect LINK tokens amount', async () => {
      const userPaymentPerValidation = 1;
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q71l2`);
      const validationData = web3.eth.abi.encodeParameters(
        ['uint256', 'string'], [walletTokenId.toString(), 'adDweFs12']);

      await expect(
        linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData),
      ).to.be.revertedWith('TwitterValidationOperator: INCORRECT_TOKENS_AMOUNT');
    });

    it('should fail if calling onTokenTransfer method directly not via LINK token smart contact', async () => {
      const userPaymentPerValidation = 2;
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_qpol2`);
      const validationData = web3.eth.abi.encodeParameters(
        ['uint256', 'string'], [walletTokenId.toString(), 'adDweFs12']);

      await expect(
        operator.onTokenTransfer(coinbase.address, userPaymentPerValidation, validationData),
      ).to.be.revertedWith('TwitterValidationOperator: CAN_CALL_FROM_LINK_TOKEN_ONLY');
    });

    it('should fail if validation contract is not approved for tokenId', async () => {
      const userPaymentPerValidation = 2;
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_qm9l2`);
      await unsRegistry.approve(ZERO_ADDRESS, walletTokenId);
      const validationData = web3.eth.abi.encodeParameters(
        ['uint256', 'string'], [walletTokenId.toString(), 'adDweFs12']);

      await expect(
        linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData),
      ).to.be.revertedWith('TwitterValidationOperator: OPERATOR_SHOULD_BE_APPROVED');
    });

    it('should fail if sender doesn not have access to domain', async () => {
      const userPaymentPerValidation = 2;
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_qk9a2`);
      await linkToken.transfer(validationRequester.address, userPaymentPerValidation);
      const validationData = web3.eth.abi.encodeParameters(
        ['uint256', 'string'], [walletTokenId.toString(), 'adDweFs12']);

      await expect(
        linkToken.connect(validationRequester)
          .transferAndCall(operator.address, userPaymentPerValidation, validationData),
      ).to.be.revertedWith('TwitterValidationOperator: SENDER_DOES_NOT_HAVE_ACCESS_TO_DOMAIN');
    });

    it('should set validation initiated from blockchain', async () => {
      const userPaymentPerValidation = 2;
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_ql0a2`);
      const validationData = web3.eth.abi.encodeParameters(
        ['uint256', 'string'], [walletTokenId.toString(), 'adDweFs12']);
      await linkToken.transferAndCall(operator.address, userPaymentPerValidation, validationData);
      await operator.connect(whitelisted)
        .setValidation('rainberk', signature, walletTokenId, 1);
      const operatorBalance = await linkToken.balanceOf(operator.address);
      assert.equal((await operator.withdrawableTokens()).toNumber(), userPaymentPerValidation);
      assert.equal((await operator.availableBalance()).toNumber(), operatorBalance.toNumber());

      // Should not release additional tokens
      await operator.connect(whitelisted)
        .setValidation('rainberk', signature, walletTokenId, 1);
      assert.equal((await operator.withdrawableTokens()).toNumber(), userPaymentPerValidation);
    });
  });

  describe('non-generic', () => {
    it('should unlock predefined payment amount for valiation', async () => {
      const paymentPerValidation = 5;
      operator = await TwitterValidationOperator.deploy(
        unsRegistry.address,
        cnsRegistry.address,
        linkToken.address,
        [paymentCapper.address],
      );
      await operator.connect(paymentCapper).setPaymentPerValidation(paymentPerValidation, 0);
      await operator.addWhitelisted(whitelisted.address);
      await linkToken.transfer(operator.address, paymentPerValidation);

      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q10k5`);
      await operator.connect(whitelisted).setValidation('rainberk', 'signature', walletTokenId, 0);

      const tokensAvailable = (await operator.withdrawableTokens()).toNumber();
      assert.equal(tokensAvailable, paymentPerValidation);
    });

    it('should not allow validate if operator does not have enough LINK tokens on balance', async () => {
      const paymentPerValidation = 5;
      operator = await TwitterValidationOperator.deploy(
        unsRegistry.address,
        cnsRegistry.address,
        linkToken.address,
        [paymentCapper.address],
      );
      await operator.addWhitelisted(whitelisted.address);
      await operator.connect(paymentCapper).setPaymentPerValidation(paymentPerValidation, 0);
      await linkToken.transfer(operator.address, paymentPerValidation - 1);

      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q1of5`);
      await expect(
        operator.connect(whitelisted).setValidation('rainberk', 'signature', walletTokenId, 0),
      ).to.be.revertedWith('TwitterValidationOperator: NOT_ENOUGH_TOKENS_ON_CONTRACT_BALANCE');
    });

    it('should work with zero price', async () => {
      operator = await TwitterValidationOperator.deploy(
        unsRegistry.address,
        cnsRegistry.address,
        linkToken.address,
        [paymentCapper.address],
      );
      await operator.addWhitelisted(whitelisted.address);

      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q7ofd`);
      await operator.connect(whitelisted).setValidation('rainberk', 'signature', walletTokenId, 0);

      const paymentPerValidation = (await operator.operatorPaymentPerValidation()).toNumber();
      assert.equal(paymentPerValidation, 0);
    });

    it('should work with Registry.setApprovalForAll approval', async () => {
      operator = await TwitterValidationOperator.deploy(
        unsRegistry.address,
        cnsRegistry.address,
        linkToken.address,
        [paymentCapper.address],
      );
      await unsRegistry.setApprovalForAll(operator.address, true);
      await operator.addWhitelisted(whitelisted.address);

      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_q1ofs`);
      await operator.connect(whitelisted).setValidation('rainberk', 'signature', walletTokenId, 0);
    });

    it('should fail if calling onTokenTransfer when tokenId is invalid', async () => {
      const validationData = web3.eth.abi.encodeParameters(
        ['uint256', 'string'], [0, 'adDweFs12']);

      operator = await TwitterValidationOperator.deploy(
        unsRegistry.address,
        cnsRegistry.address,
        coinbase.address,
        [paymentCapper.address],
      );
      await operator.addWhitelisted(whitelisted.address);
      await operator.connect(paymentCapper).setPaymentPerValidation(0, 0);

      await expect(
        operator.onTokenTransfer(coinbase.address, 0, validationData),
      ).to.be.revertedWith('TwitterValidationOperator: TOKEN_NOT_FOUND');
    });

    it('should fail if calling onTokenTransfer when code is empty', async () => {
      const walletTokenId = await mintUNSToken(walletRoot, `${domainName}_qlewa`);
      const validationData = web3.eth.abi.encodeParameters(
        ['uint256', 'string'], [walletTokenId.toString(), '']);

      operator = await TwitterValidationOperator.deploy(
        unsRegistry.address,
        cnsRegistry.address,
        coinbase.address,
        [paymentCapper.address],
      );
      await operator.addWhitelisted(whitelisted.address);
      await operator.connect(paymentCapper).setPaymentPerValidation(0, 0);

      await expect(
        operator.onTokenTransfer(coinbase.address, 0, validationData),
      ).to.be.revertedWith('TwitterValidationOperator: CODE_IS_EMPTY');
    });
  });
});
