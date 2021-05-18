const { ZERO_ADDRESS } = require('./helpers/constants');

describe('Forwarder', () => {
  let Forwarder, forwarder;
  let signers, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [, ...accounts] = signers.map(s => s.address);

    Forwarder = await ethers.getContractFactory('Forwarder');

    forwarder = await Forwarder.deploy();
    await forwarder.initialize();
  })

  beforeEach(async () => {
    this.sender = signers[0].address;

    this.domain = {
      name: 'MinimalForwarder',
      version: '0.0.1',
      chainId: await web3.eth.getChainId(),
      verifyingContract: forwarder.address,
    };

    this.types = {
      ForwardRequest: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' },
      ],
    };

    this.req = {
      from: this.sender,
      to: ZERO_ADDRESS,
      value: '0',
      gas: '100000',
      nonce: Number(await forwarder.getNonce(this.sender)),
      data: '0x',
    };

    this.sign = signers[0]._signTypedData(this.domain, this.types, this.req);
  });

  describe('verify', async () => {
    it('success', async () => {
      expect(await forwarder.verify(this.req, this.sign)).to.be.equal(true);
    });

    it('tampered from', async () => {
      expect(await forwarder.verify({ ...this.req, from: accounts[0] }, this.sign))
        .to.be.equal(false);
    });
  });

  describe('execute', async () => {
    it('success', async () => {
      await forwarder.execute(this.req, this.sign);
    });

    it('tampered from', async () => {
      await expect(
        forwarder.execute({ ...this.req, from: accounts[0] }, this.sign)
      ).to.be.revertedWith('MinimalForwarder: signature does not match request');
    });
  })
})
