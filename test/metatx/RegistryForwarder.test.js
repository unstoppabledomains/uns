const { signTypedData } = require('../helpers/metatx');

const { BigNumber } = ethers;

describe('RegistryForwarder', () => {
  let RegistryForwarder, forwarder;
  let signers;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, nonOwner] = signers;

    RegistryForwarder = await ethers.getContractFactory('RegistryForwarderMock');

    forwarder = await RegistryForwarder.deploy();
    await forwarder.initialize();
  })

  describe('Verify', () => {
    it('should verify signature', async () => {
      const tokenId = BigNumber.from(132);
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId,
        nonce: Number(await forwarder.nonceOf(tokenId)),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);
      expect(await forwarder.verify(req, sig)).to.be.true;
    })

    it('should verify signature when tokenId is empty', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await forwarder.nonceOf(owner.address)),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);
      expect(await forwarder.verify(req, sig)).to.be.true;
    })

    it('should fail verification when signature is tampered', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await forwarder.nonceOf(owner.address)),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);
      expect(await forwarder.verify({...req, tokenId: BigNumber.from(11)}, sig)).to.be.false;
    })

    it('should fail verification when signature is tampered 2', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await forwarder.nonceOf(owner.address)),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);
      expect(await forwarder.verify({...req, gas: '100001' }, sig)).to.be.false;
    })
  })

  describe('Execute', () => {
    it('should execute when signature is valid', async () => {
      const tokenId = BigNumber.from(132);
      const nonce = await forwarder.nonceOf(tokenId);
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId,
        nonce: Number(nonce),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);
      await forwarder.execute(req, sig);

      expect(await forwarder.nonceOf(tokenId)).to.be.equal(nonce.add(1));
    })

    // NOTE: When tokenId is empty, req.from is used for nonce verification
    it('should execute when signature is valid and tokenId is empty', async () => {
      const nonce = await forwarder.nonceOf(owner.address);
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(nonce),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);
      await forwarder.execute(req, sig);

      expect(await forwarder.nonceOf(owner.address)).to.be.equal(nonce.add(1));
    })

    it('should fail execution when signature is tampered', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await forwarder.nonceOf(owner.address)),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);

      await expect(
        forwarder.execute({...req, tokenId: BigNumber.from(11)}, sig)
      ).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should fail execution when signature is tampered', async () => {
      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: 0,
        nonce: Number(await forwarder.nonceOf(owner.address)),
        data: '0x',
      };
      const sig = await signTypedData(forwarder.address, owner, req);

      await expect(
        forwarder.execute({...req, gas: '100001' }, sig)
      ).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })
  })
})
