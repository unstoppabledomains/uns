const { utils, BigNumber } = ethers;

describe('RegistryForwarder', () => {
  let Registry, MintingController;
  let registry, mintingController;
  let signers, owner, nonOwner;

  const receiverAddress = '0x1234567890123456789012345678901234567890';

  const sign = async (signer, value) => {
    const domain = {
      name: 'RegistryForwarder',
      version: '0.0.1',
      chainId: await web3.eth.getChainId(),
      verifyingContract: registry.address,
    };

    const types = {
      ForwardRequest: [
        { name: 'from', type: 'address' },
        { name: 'gas', type: 'uint256' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' },
      ],
    };

    return signer._signTypedData(domain, types, value);
  }

  before(async () => {
    signers = await ethers.getSigners();
    [, owner, nonOwner] = signers;

    Registry = await ethers.getContractFactory('Registry');
    MintingController = await ethers.getContractFactory('MintingController');

    registry = await Registry.deploy();
    await registry.initialize();
    mintingController = await MintingController.deploy(registry.address);
    await registry.addController(mintingController.address);
  })

  describe('meta-transferFrom', () => {
    it('should transfer using meta-transferFrom', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_1591');
      await mintingController.mintSLD(owner.address, 'meta_1591');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('transferFrom', [owner.address, receiverAddress, tok]),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), receiverAddress);
    })

    it('should revert meta-transferFrom when used signature', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_80238');
      await mintingController.mintSLD(owner.address, 'meta_80238');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('transferFrom', [owner.address, receiverAddress, tok]),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.execute(req, sig)).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should revert meta-transferFrom for non-onwer', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_6458');
      await mintingController.mintSLD(owner.address, 'meta_6458');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('transferFrom', [nonOwner.address, receiverAddress, tok]),
      };
      const sig = await sign(nonOwner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), owner.address);
    })

    it('should revert meta-transferFrom when tokenId does not match', async () => {
      const tok1 = await registry.childIdOf(await registry.root(), 'meta_1311');
      const tok2 = await registry.childIdOf(await registry.root(), 'meta_3311');
      await mintingController.mintSLD(owner.address, 'meta_1311');
      await mintingController.mintSLD(owner.address, 'meta_3311');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok1,
        nonce: Number(await registry.nonceOf(tok1)),
        data: registry.interface.encodeFunctionData('transferFrom', [owner.address, receiverAddress, tok2]),
      };
      const sig = await sign(owner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok1), owner.address);
      assert.equal(await registry.ownerOf(tok2), owner.address);
    })
  })

  describe('meta-safeTransferFrom(address,address,uint256)', () => {
    it('should transfer using meta-safeTransferFrom', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_10235');
      await mintingController.mintSLD(owner.address, 'meta_10235');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiverAddress, tok]
        ),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), receiverAddress);
    })

    it('should revert meta-safeTransferFrom when used signature', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_5y812');
      await mintingController.mintSLD(owner.address, 'meta_5y812');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiverAddress, tok]
        ),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.execute(req, sig)).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should revert meta-safeTransferFrom for non-onwer', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_e5iuw');
      await mintingController.mintSLD(owner.address, 'meta_e5iuw');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [nonOwner.address, receiverAddress, tok]
        ),
      };
      const sig = await sign(nonOwner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), owner.address);
    })

    it('should revert meta-safeTransferFrom when tokenId does not match', async () => {
      const tok1 = await registry.childIdOf(await registry.root(), 'meta_2211');
      const tok2 = await registry.childIdOf(await registry.root(), 'meta_1122');
      await mintingController.mintSLD(owner.address, 'meta_2211');
      await mintingController.mintSLD(owner.address, 'meta_1122');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok1,
        nonce: Number(await registry.nonceOf(tok1)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFrom(address,address,uint256)',
          [owner.address, receiverAddress, tok2]),
      };
      const sig = await sign(owner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok1), owner.address);
      assert.equal(await registry.ownerOf(tok2), owner.address);
    })
  })

  // TODO: add tests for safeTransferFrom(address,address,uint256,bytes)

  describe('meta-burn', () => {
    it('should burn using meta-burn', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_ar093');
      await mintingController.mintSLD(owner.address, 'meta_ar093');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burn', [tok]),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);
  
      await expect(registry.ownerOf(tok)).to.be.revertedWith('ERC721: owner query for nonexistent token');
    })

    it('should revert meta-burn when used signature', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_5sdfs4');
      await mintingController.mintSLD(owner.address, 'meta_5sdfs4');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burn', [tok]),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.execute(req, sig)).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should revert meta-burn for non-onwer', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_53dg3');
      await mintingController.mintSLD(owner.address, 'meta_53dg3');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burn', [tok]),
      };
      const sig = await sign(nonOwner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), owner.address);
    })

    it('should revert meta-burn when tokenId does not match', async () => {
      const tok1 = await registry.childIdOf(await registry.root(), 'meta_rqd11');
      const tok2 = await registry.childIdOf(await registry.root(), 'meta_s11rq');
      await mintingController.mintSLD(owner.address, 'meta_rqd11');
      await mintingController.mintSLD(owner.address, 'meta_s11rq');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok1,
        nonce: Number(await registry.nonceOf(tok1)),
        data: registry.interface.encodeFunctionData('burn', [tok2]),
      };
      const sig = await sign(owner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok1), owner.address);
      assert.equal(await registry.ownerOf(tok2), owner.address);
    })
  })

  describe('meta-mintChild', () => {
    it('should mint using meta-mintChild', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_2435fg');
      await mintingController.mintSLD(owner.address, 'meta_2435fg');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('mintChild', [owner.address, tok, 'label']),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      const subTok = await registry.childIdOf(tok, 'label');
      assert.equal(await registry.ownerOf(subTok), owner.address);

      // transfer sub-domain by domain owner
      await registry.connect(owner).transferFrom(owner.address, receiverAddress, subTok);
      assert.equal(await registry.ownerOf(subTok), receiverAddress);
    })

    it('should revert meta-mintChild when used signature', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_fsge2');
      await mintingController.mintSLD(owner.address, 'meta_fsge2');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('mintChild', [owner.address, tok, 'label']),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.execute(req, sig)).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should revert meta-mintChild for non-onwer', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_23fwsg');
      await mintingController.mintSLD(owner.address, 'meta_23fwsg');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('mintChild', [owner.address, tok, 'label']),
      };
      const sig = await sign(nonOwner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), owner.address);
    })

    it('should revert meta-mintChild when tokenId does not match', async () => {
      const tok1 = await registry.childIdOf(await registry.root(), 'meta_r89dfsg');
      const tok2 = await registry.childIdOf(await registry.root(), 'meta_7sf67w');
      await mintingController.mintSLD(owner.address, 'meta_r89dfsg');
      await mintingController.mintSLD(owner.address, 'meta_7sf67w');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok1,
        nonce: Number(await registry.nonceOf(tok1)),
        data: registry.interface.encodeFunctionData('mintChild', [owner.address, tok2, 'label']),
      };
      const sig = await sign(owner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok1), owner.address);
      assert.equal(await registry.ownerOf(tok2), owner.address);

      const subTok = await registry.childIdOf(tok2, 'label');
      await expect(registry.ownerOf(subTok)).to.be
        .revertedWith('ERC721: owner query for nonexistent token');
    })
  })

  describe('meta-transferFromChild', () => {
    it('should mint using transferFromChild', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_oih245');
      await mintingController.mintSLD(owner.address, 'meta_oih245');

      const threeld = await registry.childIdOf(tok, 'label')
      await registry.connect(owner).mintChild(owner.address, tok, 'label')

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'transferFromChild',
          [owner.address, receiverAddress, tok, 'label']
        ),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(threeld), receiverAddress);
      await registry.connect(owner).transferFrom(owner.address, '0x5678901234567890123456789012345678901234', tok);
    })

    it('should revert meta-transferFromChild when used signature', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_fwef23f');
      await mintingController.mintSLD(owner.address, 'meta_fwef23f');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'transferFromChild',
          [owner.address, receiverAddress, tok, 'label']
        ),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.execute(req, sig)).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should revert meta-transferFromChild for non-onwer', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_dsvg34');
      await mintingController.mintSLD(owner.address, 'meta_dsvg34');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'transferFromChild',
          [owner.address, receiverAddress, tok, 'label']
        ),
      };
      const sig = await sign(nonOwner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), owner.address);
    })

    it('should revert meta-transferFromChild when tokenId does not match', async () => {
      const tok1 = await registry.childIdOf(await registry.root(), 'meta_34tne');
      const tok2 = await registry.childIdOf(await registry.root(), 'meta_fwef3');
      await mintingController.mintSLD(owner.address, 'meta_34tne');
      await mintingController.mintSLD(owner.address, 'meta_fwef3');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok1,
        nonce: Number(await registry.nonceOf(tok1)),
        data: registry.interface.encodeFunctionData(
          'transferFromChild',
          [owner.address, receiverAddress, tok2, 'label']
        ),
      };
      const sig = await sign(owner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok1), owner.address);
      assert.equal(await registry.ownerOf(tok2), owner.address);

      const subTok = await registry.childIdOf(tok2, 'label');
      await expect(registry.ownerOf(subTok)).to.be
        .revertedWith('ERC721: owner query for nonexistent token');
    })
  })

  describe('meta-safeTransferFromChild', () => {
    it('should mint using safeTransferFromChild', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_we23r');
      await mintingController.mintSLD(owner.address, 'meta_we23r');

      const threeld = await registry.childIdOf(tok, 'label');
      await registry.connect(owner).mintChild(owner.address, tok, 'label');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFromChild(address,address,uint256,string)',
          [owner.address, receiverAddress, tok, 'label']  
        ),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(threeld), receiverAddress);
      await registry.connect(owner).transferFrom(owner.address, '0x5678901234567890123456789012345678901234', tok);
    })

    it('should revert meta-safeTransferFromChild when used signature', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_dfgsyi3');
      await mintingController.mintSLD(owner.address, 'meta_dfgsyi3');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFromChild(address,address,uint256,string)',
          [owner.address, receiverAddress, tok, 'label']
        ),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.execute(req, sig)).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should revert meta-safeTransferFromChild for non-onwer', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_kj345c');
      await mintingController.mintSLD(owner.address, 'meta_kj345c');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFromChild(address,address,uint256,string)',
          [owner.address, receiverAddress, tok, 'label']
        ),
      };
      const sig = await sign(nonOwner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), owner.address);
    })

    it('should revert meta-safeTransferFromChild when tokenId does not match', async () => {
      const tok1 = await registry.childIdOf(await registry.root(), 'meta_dfvu6y4');
      const tok2 = await registry.childIdOf(await registry.root(), 'meta_sdfgiu2');
      await mintingController.mintSLD(owner.address, 'meta_dfvu6y4');
      await mintingController.mintSLD(owner.address, 'meta_sdfgiu2');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok1,
        nonce: Number(await registry.nonceOf(tok1)),
        data: registry.interface.encodeFunctionData(
          'safeTransferFromChild(address,address,uint256,string)',
          [owner.address, receiverAddress, tok2, 'label']
        ),
      };
      const sig = await sign(owner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok1), owner.address);
      assert.equal(await registry.ownerOf(tok2), owner.address);

      const subTok = await registry.childIdOf(tok2, 'label');
      await expect(registry.ownerOf(subTok)).to.be
        .revertedWith('ERC721: owner query for nonexistent token');
    })
  })

  describe('meta-burnChild', () => {
    it('should mint using burnChild', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_sfhk2');
      await mintingController.mintSLD(owner.address, 'meta_sfhk2');

      const threeld = await registry.childIdOf(tok, 'label');
      await registry.connect(owner).mintChild(owner.address, tok, 'label');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burnChild', [tok, 'label']),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.ownerOf(threeld)).to.be.revertedWith('ERC721: owner query for nonexistent token');
      await registry.connect(owner).transferFrom(owner.address, '0x5678901234567890123456789012345678901234', tok);
    })

    it('should revert meta-burnChild when used signature', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_wefh2356');
      await mintingController.mintSLD(owner.address, 'meta_wefh2356');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burnChild', [tok, 'label']),
      };
      const sig = await sign(owner, req);
      await registry.execute(req, sig);

      await expect(registry.execute(req, sig)).to.be.revertedWith('RegistryForwarder: signature does not match request');
    })

    it('should revert meta-burnChild for non-onwer', async () => {
      const tok = await registry.childIdOf(await registry.root(), 'meta_we2jh3');
      await mintingController.mintSLD(owner.address, 'meta_we2jh3');

      const req = {
        from: nonOwner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(tok)),
        data: registry.interface.encodeFunctionData('burnChild', [tok, 'label']),
      };
      const sig = await sign(nonOwner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok), owner.address);
    })

    it('should revert meta-burnChild when tokenId does not match', async () => {
      const tok1 = await registry.childIdOf(await registry.root(), 'meta_gf8974');
      const tok2 = await registry.childIdOf(await registry.root(), 'meta_se84mv');
      await mintingController.mintSLD(owner.address, 'meta_gf8974');
      await mintingController.mintSLD(owner.address, 'meta_se84mv');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok1,
        nonce: Number(await registry.nonceOf(tok1)),
        data: registry.interface.encodeFunctionData('burnChild', [tok2, 'label']),
      };
      const sig = await sign(owner, req);
      // TODO: add propper revert handling
      await registry.execute(req, sig);

      assert.equal(await registry.ownerOf(tok1), owner.address);
      assert.equal(await registry.ownerOf(tok2), owner.address);

      const subTok = await registry.childIdOf(tok2, 'label');
      await expect(registry.ownerOf(subTok)).to.be
        .revertedWith('ERC721: owner query for nonexistent token');
    })
  })
})
