import { readFileSync } from 'fs';
import { expect } from 'chai';
import {
  decryptPrivateKey,
  getAddressFromPublicKey,
  getPubKeyFromPrivateKey,
  toBech32Address,
  compressPublicKey,
  KeystoreV3,
} from '@zilliqa-js/crypto';
import { hashMessage, namehash } from 'ethers/lib/utils';
import { ethers, network } from 'hardhat';

import { ZilliqaRecover__factory } from '../types/factories/contracts';

const { utils } = ethers;
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

const DomainName = 'bogdan-test2.zil';
const TokenId = namehash(DomainName);
const NetworkId = network.config.chainId;
describe('ZilliqaRecover', () => {
  it('works', async () => {
    const content: KeystoreV3 = JSON.parse(
      readFileSync('./test/zil18k3cvzg379g02et9fg2ga395r027jx5jggzvh5.json').toString(),
    );
    const pk = await decryptPrivateKey('UNSTesting32;', content);
    const wallet = new ethers.Wallet(pk);
    const zilAddress = getAddressFromPublicKey(normalizePublicKey(wallet.publicKey));
    // ETH public key format has a 0x04 constant prefix
    // We don't need to that when operating public key in a contract
    expect(zilAddress).to.eql(content.address);
    const publicKey = wallet.publicKey.replace(/^0x04/, '0x');
    console.log({
      zilpubkey: getPubKeyFromPrivateKey(pk),
      ethpubkey: publicKey,
      normalize: normalizePublicKey(publicKey),
    });
    console.log({ pub: getPubKeyFromPrivateKey(pk), zilAddress: zilAddress, bech: toBech32Address(zilAddress) });
    const message = utils.solidityKeccak256(['uint256', 'uint256', 'bytes'], [NetworkId, TokenId, publicKey]);

    const [deployer] = await ethers.getSigners();
    const contract = await new ZilliqaRecover__factory(deployer).deploy();
    await contract.initialize(
      TokenId,
      // zil checksum is not the same as eth checksum
      zilAddress.toLowerCase(),
    );
    expect(await contract.message(TokenId, publicKey)).to.eql(message, 'Low message failed');
    expect(await contract.ethSignedMessage(TokenId, publicKey)).to.eql(
      hashMessage(utils.arrayify(message)),
      'High message failed',
    );
    expect(await contract.ethAddress(publicKey)).to.eql(wallet.address);
    const compressedPublicKey = await contract.compressPublicKey(publicKey);
    expect(compressedPublicKey).to.eql('0x' + compressPublicKey(wallet.publicKey.replace('0x', '')));
    // y^2 = a*x^3 + b
    expect(
      // zil checksum is not the same as eth checksum
      (await contract.zilAddress(publicKey)).toLowerCase(),
    ).to.eql(zilAddress.toLowerCase());
    const signature = await wallet.signMessage(ethers.utils.arrayify(message));
    const recover = await contract.recover(TokenId, publicKey, signature);
    expect(recover.recovered).to.eql(wallet.address);
    const verify = await contract.verify(TokenId, publicKey, signature);

    expect(verify).to.eql(true);
  });
});
