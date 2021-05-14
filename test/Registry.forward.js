const { utils, BigNumber } = ethers;

describe('Registry (forwarder)', () => {
  let Registry, MintingController;
  let registry, mintingController;
  let signers, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('Registry');
    MintingController = await ethers.getContractFactory('MintingController');
    Simple = await ethers.getContractFactory('Simple');

    registry = await Registry.deploy();
    await registry.initialize();
    mintingController = await MintingController.deploy(registry.address);
    await registry.addController(mintingController.address);
  })

  describe('Registry', () => {
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

    it('should transfer through meta-tx', async () => {
      const owner = signers[1];
      const receiver = signers[2];
      const tok = await registry.childIdOf(await registry.root(), 'res_label_113a');
      await mintingController.mintSLD(owner.address, 'res_label_113a');

      const req = {
        from: owner.address,
        gas: '100000',
        tokenId: tok,
        nonce: Number(await registry.nonceOf(owner.address)),
        data: registry.interface.encodeFunctionData('setOwner', [receiver.address, tok]),
      };
      const sig = await sign(owner, req);

      await registry.execute(req, sig);

      assert.equal(receiver.address, await registry.ownerOf(tok))
    })
  });
})
