import { readFileSync } from 'fs';
import { expect } from 'chai';
import { decryptPrivateKey, getAddressFromPublicKey, compressPublicKey, KeystoreV3 } from '@zilliqa-js/crypto';
import { namehash } from 'ethers/lib/utils';
import { ethers } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, Wallet } from 'ethers';
import { custody, UNSRegistry__factory, MintingManager__factory } from '../../types/factories/contracts';
import { MintingManager, UNSRegistry, ZilliqaRecover } from '../../types';
import { ZERO_ADDRESS } from '../helpers/constants';
import { buildExecuteFunc } from '../helpers/metatx';

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
  readFileSync(`${__dirname}/zil18k3cvzg379g02et9fg2ga395r027jx5jggzvh5.json`).toString(),
);

const onChainPubKey = (wallet: Wallet | string): [string, string] => {
  return (typeof wallet === 'string' ? wallet : wallet.publicKey)
    .replace(/^0x04/, '')
    .split(/(.{64})/)
    .filter((s) => s.length)
    .map((s) => `0x${s}`) as [string, string];
};

describe('ZilliqaRecover', () => {
  let signers: SignerWithAddress[];
  let coinbase: SignerWithAddress;
  let privateKey: string;
  let zilWallet: Wallet;
  let newOwner: SignerWithAddress;
  let publicKey: [string, string];
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
    publicKey = onChainPubKey(zilWallet.publicKey);
    zilAddress = getAddressFromPublicKey(normalizePublicKey(zilWallet.publicKey)).toLowerCase();
    await (
      await coinbase.sendTransaction({ to: zilWallet.address, value: BigNumber.from('100000000000000000000') })
    ).wait();
    zilliqaRecover = await new custody.ZilliqaRecover__factory(coinbase).deploy();
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

  describe('ethAddress', async () => {
    it('calculates eth address from public key', async () => {
      expect(await zilliqaRecover.ethAddress(...publicKey)).to.eql(zilWallet.address);
    });
  });

  describe('zilAddress', async () => {
    it('calculates zil address from public key', async () => {
      expect(
        // zil checksum is not the same as eth checksum
        (await zilliqaRecover.zilAddress(...publicKey)).toLowerCase(),
      ).to.eql(zilAddress);
    });
  });

  describe('claim', async () => {
    it('provides ability to recover zil domain', async () => {
      const { tokenId, label } = getRandomDomain();
      await zilliqaRecover.mint(label, zilAddress);
      await zilliqaRecover.connect(zilWallet).claim(tokenId, ...publicKey, newOwner.address);
      expect(await unsRegistry.ownerOf(tokenId)).to.eql(newOwner.address);
    });

    it('requires matching public key without prefix', async () => {
      const { tokenId, label } = getRandomDomain();
      await zilliqaRecover.mint(label, zilAddress);
      await expect(
        zilliqaRecover
          .connect(zilWallet)
          .claim(tokenId, ...onChainPubKey(Wallet.createRandom().publicKey), newOwner.address),
      ).to.be.revertedWith('ZilliqaRecover: PUBLIC_KEY_DOENT_MATCH_SENDER_ADDRESS');
    });

    it('forbids to return a domain', async () => {
      const { tokenId, label } = getRandomDomain();
      await zilliqaRecover.mint(label, zilAddress);
      await zilliqaRecover.connect(zilWallet).claim(tokenId, ...publicKey, newOwner.address);
      expect(await zilliqaRecover.znsOwnerOf(tokenId)).to.eql(ZERO_ADDRESS);
      await expect(
        unsRegistry
          .connect(newOwner)
          ['safeTransferFrom(address,address,uint256)'](newOwner.address, zilliqaRecover.address, tokenId),
      ).to.be.revertedWith('ZilliqaRecover: UNKNOWN_TOKEN_RECEIVED');
    });

    it('checks token ownership', async () => {
      const { tokenId, label } = getRandomDomain();
      await zilliqaRecover.mint(label, zilAddress.replace(/0x..../, '0xf000'));
      await expect(zilliqaRecover.connect(zilWallet).claim(tokenId, ...publicKey, newOwner.address)).to.be.revertedWith(
        'ZilliqaRecover: TOKEN_OWNED_BY_OTHER_ADDRESS',
      );
    });
  });

  describe('execute', async () => {
    it('supports claiming via meta transaction', async () => {
      const { tokenId, label } = getRandomDomain();
      const buildExecuteParams = buildExecuteFunc(zilliqaRecover.interface, zilliqaRecover.address, zilliqaRecover);
      await zilliqaRecover.mint(label, zilAddress);

      const params = await buildExecuteParams(
        'claim(uint256,bytes32,bytes32,address)',
        [tokenId, ...publicKey, newOwner.address],
        zilWallet,
        tokenId,
      );
      await zilliqaRecover.execute(params.req, params.signature);

      expect(await unsRegistry.ownerOf(tokenId)).to.eql(newOwner.address);
    });
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
      expect((await zilliqaRecover.znsOwnerOf(domain1.tokenId)).toLowerCase()).to.eql(zilAddress);
      expect((await zilliqaRecover.znsOwnerOf(domain2.tokenId)).toLowerCase()).to.eql(zilAddress);
      await zilliqaRecover
        .connect(zilWallet)
        .claimAll([domain1.tokenId, domain2.tokenId], ...publicKey, newOwner.address);

      expect(await unsRegistry.ownerOf(domain1.tokenId)).to.eql(newOwner.address);
      expect(await unsRegistry.ownerOf(domain2.tokenId)).to.eql(newOwner.address);
    });
  });
});
