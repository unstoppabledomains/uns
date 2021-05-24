const { utils, BigNumber } = ethers;

describe('ERC2771RegistryContext', () => {
  let ERC2771RegistryContext, context;

  const getReason = (returnData) => {
    let reason;
    if (returnData && returnData.slice(2, 10).toString('hex') === '08c379a0') {
      var abiCoder = new utils.AbiCoder();
      reason = abiCoder.decode(['string'], '0x' + returnData.slice(10))[0];
    }
    return reason;
  }

  before(async () => {
    signers = await ethers.getSigners();
    [, ...accounts] = signers.map(s => s.address);

    ERC2771RegistryContext = await ethers.getContractFactory('ERC2771RegistryContextMock');

    context = await ERC2771RegistryContext.deploy();
    await context.initialize();
  })

  describe('isTrustedForwarder', () => {
    it('should return false untrusterd forwarders', async () => {
      expect(await context.isTrustedForwarder(accounts[0])).to.be.false;
      expect(await context.isTrustedForwarder(accounts[9])).to.be.false;
    })
  
    it('should return true trusted forwarder (self-address)', async () => {
      expect(await context.isTrustedForwarder(context.address)).to.be.true;
    })
  })

  describe('validate forwarded token(last 32bytes in calldata)', () => {
    it('should successfully validate tokenId', async () => {
      const tokenId = BigNumber.from(102);
      const calldata = context.interface.encodeFunctionData('isValidForwardedToken', [tokenId]);

      const encodedTokenId = utils.defaultAbiCoder.encode([ 'uint256' ], [ tokenId ]);
      const [success, ] = await context.callStatic.execute(calldata + encodedTokenId.slice(2));

      expect(success).to.be.true;
    })

    it('should fail when tokenId is validation', async () => {
      const tokenId = BigNumber.from(926);
      const calldata = context.interface.encodeFunctionData('isValidForwardedToken', [tokenId]);

      const encodedTokenId = utils.defaultAbiCoder.encode([ 'uint256' ], [ 1 ]);
      const [success, returnData] = await context.callStatic.execute(calldata + encodedTokenId.slice(2));

      expect(success).to.be.false;
      expect(getReason(returnData)).to.be.eql('ERC2771RegistryContext: TOKEN_INVALID');
    })

    it('should skip token validation for untrusted forwarders', async () => {
      const tokenId = BigNumber.from(1241);
      const success = await context.isValidForwardedToken(tokenId);
      expect(success).to.be.true;

      const success2 = await context.connect(signers[2]).isValidForwardedToken(tokenId);
      expect(success2).to.be.true;
    })
  })

  describe('validate msg.from (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
    it('should return sender address when trusted forwarder', async () => {
      const calldata = context.interface.encodeFunctionData('msgSender');

      const encodedTokenId = utils.defaultAbiCoder.encode([ 'uint256' ], [ 0 ]);
      const encodedAddress = utils.defaultAbiCoder.encode([ 'address' ], [ signers[0].address ]);
      const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
      const [success, returnData] = await context.callStatic.execute(encodedData);

      expect(success).to.be.true;
      const [address] = utils.defaultAbiCoder.decode(['address'], returnData);
      expect(address).to.be.eql(signers[0].address);
    })

    it('should return sender address when untrusted forwarder', async () => {
      const sender = await context.callStatic.msgSender();
      expect(sender).to.be.eql(signers[0].address);

      const sender2 = await context.connect(signers[2]).callStatic.msgSender();
      expect(sender2).to.be.eql(signers[2].address);
    })
  })

  describe('validate msg.data (calldata = "{bytes:data}{address:from}{bytes32:tokenId}")', () => {
    it('should return data when trusted forwarder', async () => {
      const calldata = context.interface.encodeFunctionData('msgData');

      const encodedTokenId = utils.defaultAbiCoder.encode([ 'uint256' ], [ 0 ]);
      const encodedAddress = utils.defaultAbiCoder.encode([ 'address' ], [ signers[0].address ]);
      const encodedData = calldata + encodedAddress.slice(2) + encodedTokenId.slice(2);
      const [success, returnData] = await context.callStatic.execute(encodedData);

      expect(success).to.be.true;
      const [,, funcSig] = utils.defaultAbiCoder.decode(['bytes32', 'bytes32', 'bytes4'], returnData);
      expect(funcSig).to.be.eql(calldata);
    })

    it('should return data when untrusted forwarder', async () => {
      const data = await context.callStatic.msgData();
      expect(data).to.be.eql('0xc4c2bfdc');
    })
  })
});
