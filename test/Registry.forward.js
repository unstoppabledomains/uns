const { utils, BigNumber } = ethers;

describe('Registry (forward)', () => {
  let Registry, Forwarder, MintingController;
  let mintingController, registry, forwarder;
  let signers, accounts;

  before(async () => {
    signers = await ethers.getSigners();
    [, ...accounts] = signers.map(s => s.address);

    Registry = await ethers.getContractFactory('Registry');
    Forwarder = await ethers.getContractFactory('Forwarder');
    MintingController = await ethers.getContractFactory('MintingController');
    Simple = await ethers.getContractFactory('Simple');

    forwarder = await Forwarder.deploy();
    await forwarder.initialize();

    registry = await Registry.deploy();
    await registry.functions['initialize(address)'](forwarder.address);
    mintingController = await MintingController.deploy(registry.address);
    await registry.addController(mintingController.address);
  })

  describe('Registry', () => {
    const sign = async (signer, value) => {
      const domain = {
        name: 'MinimalForwarder',
        version: '0.0.1',
        chainId: await web3.eth.getChainId(),
        verifyingContract: forwarder.address,
      };

      const types = {
        ForwardRequest: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'gas', type: 'uint256' },
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
        to: registry.address,
        value: '0',
        gas: '100000',
        nonce: Number(await forwarder.getNonce(owner.address)),
        data: registry.interface.encodeFunctionData('setOwner', [receiver.address, tok]),
      };
      const sig = await sign(owner, req);

      await forwarder.execute(req, sig);

      assert.equal(receiver.address, await registry.ownerOf(tok))
    })
  });
})
