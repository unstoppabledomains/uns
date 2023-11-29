import { readFileSync } from 'fs';
import { expect } from 'chai';
import { decryptPrivateKey, getAddressFromPublicKey, compressPublicKey, KeystoreV3 } from '@zilliqa-js/crypto';
import { namehash } from 'ethers/lib/utils';
import { ethers } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, Wallet } from 'ethers';
import { ZilliqaRecover__factory, UNSRegistry__factory, MintingManager__factory } from '../types/factories/contracts';
import { MintingManager, UNSRegistry, ZilliqaRecover } from '../types';
import { ZERO_ADDRESS } from './helpers/constants';
import { buildExecuteFunc } from './helpers/metatx';

export const CompressedKeyRegex = /^(0x)?0(2|3)[a-f0-9]{64}$/i;
export const UncompressedKeyRegex = /^(0x)?(04)?[a-f0-9]{128}$/i;

export const normalizePublicKey = (key: string): string => {
  if (key.match(/^0x[a-f0-9]+$/i)) {
    key = key.substring(2);
  }
  if (key.match(UncompressedKeyRegex)) {
    if (key.length === 128) {
      key = '04' + key;
    }
    key = compressPublicKey(key);
  }
  return key;
};

export const messagePrefix = '\x19Ethereum Signed Message:\n';

const ZilKey: KeystoreV3 = JSON.parse(
  readFileSync('./test/zil18k3cvzg379g02et9fg2ga395r027jx5jggzvh5.json').toString(),
);

describe('ZilliqaRecover', () => {
  let signers: SignerWithAddress[];
  let coinbase: SignerWithAddress;
  let privateKey: string;
  let zilWallet: Wallet;
  let newOwner: SignerWithAddress;
  let publicKey: string;
  let zilAddress: string;
  let unsRegistry: UNSRegistry;
  let mintingManager: MintingManager;
  let zilliqaRecover: ZilliqaRecover;

  const getRandomDomain = () => {
    const name = `hello-world-${Math.random().toString().replace('0.', '')}.zil`;
    return { name, tokenId: namehash(name), labels: name.split('.'), label: name.split('.')[0] };
  };

  before(async () => {
    signers = await ethers.getSigners();
    privateKey = await decryptPrivateKey('UNSTesting32;', ZilKey);
    [coinbase, newOwner] = signers;
    zilWallet = new Wallet(privateKey, coinbase.provider);
    // ETH public key format has a 0x04 constant prefix
    // We don't need to that when operating public key in a contract
    publicKey = zilWallet.publicKey.replace(/^0x04/, '0x');
    zilAddress = getAddressFromPublicKey(normalizePublicKey(zilWallet.publicKey)).toLowerCase();
    await (
      await coinbase.sendTransaction({ to: zilWallet.address, value: BigNumber.from('100000000000000000000') })
    ).wait();
    zilliqaRecover = await new ZilliqaRecover__factory(coinbase).deploy();
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    mintingManager = await new MintingManager__factory(coinbase).deploy();
    await zilliqaRecover.initialize(unsRegistry.address, mintingManager.address, coinbase.address);
    await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await mintingManager.initialize(
      unsRegistry.address,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.addMinter(zilliqaRecover.address);
  });

  it('works', async () => {
    const { tokenId, label } = getRandomDomain();
    expect(zilAddress).to.eql(ZilKey.address.toLowerCase());
    expect(await zilliqaRecover.ethAddress(publicKey)).to.eql(zilWallet.address);
    const compressedPublicKey = await zilliqaRecover.compressPublicKey(publicKey);
    expect(compressedPublicKey).to.eql('0x' + compressPublicKey(zilWallet.publicKey.replace('0x', '')));
    expect(
      // zil checksum is not the same as eth checksum
      (await zilliqaRecover.zilAddress(publicKey)).toLowerCase(),
    ).to.eql(zilAddress);
    await zilliqaRecover.mint(label, zilAddress);
    expect((await zilliqaRecover.zilOwnerOf(tokenId)).toLowerCase()).to.eql(zilAddress);
    expect(await unsRegistry.ownerOf(tokenId)).to.eql(zilliqaRecover.address);
  });

  it('claims', async () => {
    const { tokenId, label } = getRandomDomain();
    await zilliqaRecover.mint(label, zilAddress);
    expect(await unsRegistry.ownerOf(tokenId)).to.eql(zilliqaRecover.address);
    await zilliqaRecover.connect(zilWallet).claim(tokenId, publicKey, newOwner.address);
    expect(await unsRegistry.ownerOf(tokenId)).to.eql(newOwner.address);
  });

  it('claims via meta', async () => {
    const { tokenId, label } = getRandomDomain();
    const buildExecuteParams = buildExecuteFunc(zilliqaRecover.interface, zilliqaRecover.address, zilliqaRecover);
    const params = await buildExecuteParams(
      'claim(uint256,bytes,address)',
      [tokenId, publicKey, newOwner.address],
      zilWallet,
      tokenId,
    );
    await zilliqaRecover.mint(label, zilAddress);
    await zilliqaRecover.execute(params.req, params.signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.eql(newOwner.address);
  });

  describe('mintAll, claimAll', async () => {
    it('allows to claim multiple domains', async () => {
      const domain1 = getRandomDomain();
      const domain2 = getRandomDomain();
      await zilliqaRecover.mintAll([
        { label: domain1.label, zilOwner: zilAddress },
        { label: domain2.label, zilOwner: zilAddress },
      ]);

      expect(await unsRegistry.ownerOf(domain1.tokenId)).to.eql(zilliqaRecover.address);
      expect(await unsRegistry.ownerOf(domain2.tokenId)).to.eql(zilliqaRecover.address);
      expect((await zilliqaRecover.zilOwnerOf(domain1.tokenId)).toLowerCase()).to.eql(zilAddress);
      expect((await zilliqaRecover.zilOwnerOf(domain2.tokenId)).toLowerCase()).to.eql(zilAddress);
      await zilliqaRecover.connect(zilWallet).claimAll([domain1.tokenId, domain2.tokenId], publicKey, newOwner.address);

      expect(await unsRegistry.ownerOf(domain1.tokenId)).to.eql(newOwner.address);
      expect(await unsRegistry.ownerOf(domain2.tokenId)).to.eql(newOwner.address);
    });
  });
});
