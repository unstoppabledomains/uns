const { ethers } = require('hardhat');
const { utils, BigNumber } = ethers;

describe.skip('E2E', () => {
  const {
    UNS_WORKER_PRIVATE_KEY,
    UNS_REGISTRY_PROXY,
    UNS_MINTING_MANAGERE_PROXY,
    CNS_REGISTRY,
    CNS_RESOLVER,
    UNS_PROXY_READER,
  } = process.env;

  const domainPrefix = 'ug0e2';
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
  const walletRoot = BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230');

  let Registry, MintingManager, CryptoRegistry, CryptoResolver, ProxyReader;
  let registry, mintingManager, cryptoRegistry, cryptoResolver, proxyReader, worker;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    Registry = await ethers.getContractFactory('contracts/Registry.sol:Registry');
    MintingManager = await ethers.getContractFactory('contracts/MintingManager.sol:MintingManager');
    CryptoRegistry = await ethers.getContractFactory('contracts/cns/CryptoRegistry.sol:CryptoRegistry');
    CryptoResolver = await ethers.getContractFactory('contracts/cns/CryptoResolver.sol:CryptoResolver');
    ProxyReader = await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader');

    registry = await Registry.attach(UNS_REGISTRY_PROXY);
    mintingManager = await MintingManager.attach(UNS_MINTING_MANAGERE_PROXY);
    cryptoRegistry = await CryptoRegistry.attach(CNS_REGISTRY);
    cryptoResolver = await CryptoResolver.attach(CNS_RESOLVER);
    proxyReader = await CryptoResolver.attach(UNS_PROXY_READER);

    worker = new ethers.Wallet(UNS_WORKER_PRIVATE_KEY, ethers.provider);
  })

  const getReason = (returnData) => {
    let reason;
    if (returnData && returnData.slice(2, 10).toString('hex') === '08c379a0') {
      var abiCoder = new utils.AbiCoder();
      reason = abiCoder.decode(['string'], '0x' + returnData.slice(10))[0];
    }
    return reason;
  }

  const sign = async (data, address, signer) => {
    return signer.signMessage(
      utils.arrayify(
        utils.solidityKeccak256(
          [ 'bytes32', 'address' ],
          [ utils.keccak256(data), address ]
        )
      )
    )
  }

  const signFor = async (data, address, nonce, signer) => {
    return signer.signMessage(
      utils.arrayify(
        utils.solidityKeccak256(
          [ 'bytes32', 'address', 'uint256' ],
          [ utils.keccak256(data), address, nonce ]
        )
      )
    )
  }

  it('should mint .wallet and resolve records', async () => {
    const _domainName = `${domainPrefix}_test_e2e_wallet_131`;

    // mint
    let tx = await mintingManager.connect(worker)
      .mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    const tokenId_wallet = await registry.childIdOf(walletRoot, _domainName);
    assert.equal(await registry.ownerOf(tokenId_wallet), coinbase.address);

    // set records
    tx = await registry.connect(coinbase)
      .set('key_t1', 'value_t1', tokenId_wallet);
    await tx.wait();

    assert.equal(await registry.get('key_t1', tokenId_wallet), 'value_t1');
    assert.equal(await proxyReader.get('key_t1', tokenId_wallet), 'value_t1');
  })

  it('should mint .crypto and resolve records', async () => {
    const _domainName = `${domainPrefix}_test_e2e_crypto_131`;

    // mint
    let tx = await mintingManager.connect(worker)
      .mintSLDWithRecords(coinbase.address, cryptoRoot, _domainName, [], []);
    await tx.wait();

    const tokenId_crypto = await cryptoRegistry.childIdOf(cryptoRoot, _domainName);
    assert.equal(await cryptoRegistry.ownerOf(tokenId_crypto), coinbase.address);

    // set records
    tx = await cryptoResolver.connect(coinbase)
      .set('key_t2', 'value_t2', tokenId_crypto);
    await tx.wait();

    assert.equal(await cryptoResolver.get('key_t2', tokenId_crypto), 'value_t2');
    assert.equal(await proxyReader.get('key_t2', tokenId_crypto), 'value_t2');
  })

  it('should set URIPrefix for all registries', async () => {
    const _domainName = `${domainPrefix}_test_e2e_221`;

    // mint
    let tx = await mintingManager.connect(worker).mintSLD(coinbase.address, cryptoRoot, _domainName);
    await tx.wait();
    tx = await mintingManager.connect(worker).mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    tx = await mintingManager.setTokenURIPrefix(`/${domainPrefix}_custom_prefix/`);
    await tx.wait();

    const tokenId_crypto = await cryptoRegistry.childIdOf(cryptoRoot, _domainName);
    assert.equal(await cryptoRegistry.tokenURI(tokenId_crypto), `/${domainPrefix}_custom_prefix/${domainPrefix}_test_e2e_221.crypto`);

    const tokenId_wallet = await registry.childIdOf(walletRoot, _domainName);
    assert.equal(await registry.tokenURI(tokenId_wallet), `/${domainPrefix}_custom_prefix/${tokenId_wallet}`);
  })

  it('should mint .wallet domain through metatx(Relay)', async () => {
    const _domainName = `${domainPrefix}_test_e2e_wallet_038`;

    const data = mintingManager.interface.encodeFunctionData(
      'mintSLD(address,uint256,string)',
      [coinbase.address, walletRoot, _domainName]
    );
    const signature = sign(data, mintingManager.address, worker);

    // min
    let tx = await mintingManager.connect(coinbase).relay(data, signature)
    await tx.wait();

    const tokenId_wallet = await registry.childIdOf(walletRoot, _domainName);
    assert.equal(await registry.ownerOf(tokenId_wallet), coinbase.address);
  })

  it('should mint .crypto domain through metatx(Relay)', async () => {
    const _domainName = `${domainPrefix}_test_e2e_crypto_038`;

    const data = mintingManager.interface.encodeFunctionData(
      'mintSLD(address,uint256,string)',
      [coinbase.address, cryptoRoot, _domainName]
    );
    const signature = sign(data, mintingManager.address, worker);

    // min
    let tx = await mintingManager.connect(coinbase).relay(data, signature)
    await tx.wait();

    const tokenId_crypto = await cryptoRegistry.childIdOf(cryptoRoot, _domainName);
    assert.equal(await cryptoRegistry.ownerOf(tokenId_crypto), coinbase.address);
  })

  it('should burn .wallet domain through oll metatx(For)', async () => {
    const _domainName = `${domainPrefix}_test_e2e_wallet_974`;

    // mint
    let tx = await mintingManager.connect(worker)
      .mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    const tokenId_wallet = await registry.childIdOf(walletRoot, _domainName);
    assert.equal(await registry.ownerOf(tokenId_wallet), coinbase.address);

    const data = registry.interface.encodeFunctionData('burn(uint256)', [tokenId_wallet]);
    const signature = await signFor(data, registry.address, await registry.nonceOf(tokenId_wallet), coinbase);

    tx = await registry.connect(worker).burnFor(tokenId_wallet, signature);
    await tx.wait();

    await expect(registry.ownerOf(tokenId_wallet)).to.be.revertedWith('ERC721: owner query for nonexistent token');
  })
})
