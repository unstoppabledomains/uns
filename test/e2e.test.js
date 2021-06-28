const { ethers, network } = require('hardhat');
const { expect } = require('chai');

const { snapshot, revert } = require('../src/snapshot');
const Deployer = require('../src/deployer');

const { utils, BigNumber } = ethers;

describe.skip('E2E', () => {
  // const {
  //   UNS_WORKER_PRIVATE_KEY,
  //   UNS_REGISTRY_PROXY,
  //   UNS_MINTING_MANAGERE_PROXY,
  //   UNS_PROXY_READER,
  //   CNS_REGISTRY,
  //   CNS_RESOLVER,
  // } = process.env;

  const domainPrefix = 'ug0e2';
  const cryptoRoot = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
  const walletRoot = BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230');

  let UNSRegistry, MintingManager, CNSRegistry, Resolver, ProxyReader;
  let unsRegistry, mintingManager, cnsRegistry, resolver, proxyReader, minter;
  let signers, coinbase, snapshotId;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;

    UNSRegistry = await ethers.getContractFactory('contracts/UNSRegistry.sol:UNSRegistry');
    MintingManager = await ethers.getContractFactory('contracts/MintingManager.sol:MintingManager');
    CNSRegistry = await ethers.getContractFactory('dot-crypto/contracts/Registry.sol:Registry');
    Resolver = await ethers.getContractFactory('dot-crypto/contracts/Resolver.sol:Resolver');
    ProxyReader = await ethers.getContractFactory('contracts/ProxyReader.sol:ProxyReader');

    const [unsDeployer] = await ethers.getSigners();
    minter = unsDeployer;

    const deployer = await Deployer.create();
    const unsConfig = await deployer.execute(['full']);
    const { contracts } = unsConfig.networks[network.config.chainId];

    unsRegistry = await UNSRegistry.attach(contracts.UNSRegistry.address);
    mintingManager = await MintingManager.attach(contracts.MintingManager.address);
    cnsRegistry = await CNSRegistry.attach(contracts.CNSRegistry.address);
    resolver = await Resolver.attach(contracts.Resolver.address);
    proxyReader = await ProxyReader.attach(contracts.ProxyReader.address);
  });

  beforeEach(async () => {
    snapshotId = await snapshot();
    console.log('snapshotId', snapshotId);
  });

  afterEach(async () => {
    await revert(snapshotId);
  });

  const sign = async (data, address, signer) => {
    return signer.signMessage(
      utils.arrayify(
        utils.solidityKeccak256(
          [ 'bytes32', 'address' ],
          [ utils.keccak256(data), address ],
        ),
      ),
    );
  };

  const signFor = async (data, address, nonce, signer) => {
    return signer.signMessage(
      utils.arrayify(
        utils.solidityKeccak256(
          [ 'bytes32', 'address', 'uint256' ],
          [ utils.keccak256(data), address, nonce ],
        ),
      ),
    );
  };

  describe('snapsots', () => {
    it('should mint a token', async () => {
      const _domainName = `${domainPrefix}_test_e2e_wallet_0`;

      const tx = await mintingManager.connect(minter)
        .mintSLD(coinbase.address, walletRoot, _domainName);
      await tx.wait();

      const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
      assert.equal(await unsRegistry.ownerOf(_walletTokenId), coinbase.address);
    });

    it('should mint same token as prev test', async () => {
      const _domainName = `${domainPrefix}_test_e2e_wallet_0`;

      const tx = await mintingManager.connect(minter)
        .mintSLD(coinbase.address, walletRoot, _domainName);
      await tx.wait();

      const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
      assert.equal(await unsRegistry.ownerOf(_walletTokenId), coinbase.address);
    });
  });

  it('should mint .wallet and resolve records', async () => {
    const _domainName = `${domainPrefix}_test_e2e_wallet_131`;

    // mint
    let tx = await mintingManager.connect(minter)
      .mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
    assert.equal(await unsRegistry.ownerOf(_walletTokenId), coinbase.address);

    // set records
    tx = await unsRegistry.connect(coinbase)
      .set('key_t1', 'value_t1', _walletTokenId);
    await tx.wait();

    assert.equal(await unsRegistry.get('key_t1', _walletTokenId), 'value_t1');
    assert.equal(await proxyReader.get('key_t1', _walletTokenId), 'value_t1');
  });

  it('should mint .crypto and resolve records', async () => {
    const _domainName = `${domainPrefix}_test_e2e_crypto_131`;

    // mint
    let tx = await mintingManager.connect(minter)
      .mintSLDWithRecords(coinbase.address, cryptoRoot, _domainName, [], []);
    await tx.wait();

    const _cryptoTokenId = await cnsRegistry.childIdOf(cryptoRoot, _domainName);
    assert.equal(await cnsRegistry.ownerOf(_cryptoTokenId), coinbase.address);

    // set records
    tx = await resolver.connect(coinbase)
      .set('key_t2', 'value_t2', _cryptoTokenId);
    await tx.wait();

    assert.equal(await resolver.get('key_t2', _cryptoTokenId), 'value_t2');
    assert.equal(await proxyReader.get('key_t2', _cryptoTokenId), 'value_t2');
  });

  it('should set URIPrefix for all registries', async () => {
    const _domainName = `${domainPrefix}_test_e2e_221`;

    // mint
    let tx = await mintingManager.connect(minter).mintSLD(coinbase.address, cryptoRoot, _domainName);
    await tx.wait();
    tx = await mintingManager.connect(minter).mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    tx = await mintingManager.setTokenURIPrefix(`/${domainPrefix}_custom_prefix/`);
    await tx.wait();

    const _cryptoTokenId = await cnsRegistry.childIdOf(cryptoRoot, _domainName);
    assert.equal(
      await cnsRegistry.tokenURI(_cryptoTokenId),
      `/${domainPrefix}_custom_prefix/${domainPrefix}_test_e2e_221.crypto`);

    const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
    assert.equal(await unsRegistry.tokenURI(_walletTokenId), `/${domainPrefix}_custom_prefix/${_walletTokenId}`);
  });

  it('should mint .wallet domain through metatx(Relay)', async () => {
    const _domainName = `${domainPrefix}_test_e2e_wallet_038`;

    const data = mintingManager.interface.encodeFunctionData(
      'mintSLD(address,uint256,string)',
      [coinbase.address, walletRoot, _domainName],
    );
    const signature = sign(data, mintingManager.address, minter);

    // min
    const tx = await mintingManager.connect(coinbase).relay(data, signature);
    await tx.wait();

    const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
    assert.equal(await unsRegistry.ownerOf(_walletTokenId), coinbase.address);
  });

  it('should mint .crypto domain through metatx(Relay)', async () => {
    const _domainName = `${domainPrefix}_test_e2e_crypto_038`;

    const data = mintingManager.interface.encodeFunctionData(
      'mintSLD(address,uint256,string)',
      [coinbase.address, cryptoRoot, _domainName],
    );
    const signature = sign(data, mintingManager.address, minter);

    // min
    const tx = await mintingManager.connect(coinbase).relay(data, signature);
    await tx.wait();

    const _cryptoTokenId = await cnsRegistry.childIdOf(cryptoRoot, _domainName);
    assert.equal(await cnsRegistry.ownerOf(_cryptoTokenId), coinbase.address);
  });

  it('should burn .wallet domain through old metatx(For)', async () => {
    const _domainName = `${domainPrefix}_test_e2e_wallet_974`;

    // mint
    let tx = await mintingManager.connect(minter)
      .mintSLD(coinbase.address, walletRoot, _domainName);
    await tx.wait();

    const _walletTokenId = await unsRegistry.childIdOf(walletRoot, _domainName);
    assert.equal(await unsRegistry.ownerOf(_walletTokenId), coinbase.address);

    const data = unsRegistry.interface.encodeFunctionData('burn(uint256)', [_walletTokenId]);
    const signature = await signFor(data, unsRegistry.address, await unsRegistry.nonceOf(_walletTokenId), coinbase);

    tx = await unsRegistry.connect(minter).burnFor(_walletTokenId, signature);
    await tx.wait();

    await expect(unsRegistry.ownerOf(_walletTokenId)).to.be.revertedWith('ERC721: owner query for nonexistent token');
  });
});
