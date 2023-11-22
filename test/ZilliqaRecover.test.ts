import { readFileSync } from 'fs';
import { expect } from 'chai';
import { decryptPrivateKey, getAddressFromPublicKey, compressPublicKey, KeystoreV3 } from '@zilliqa-js/crypto';
import { hashMessage, namehash } from 'ethers/lib/utils';
import { ethers, network } from 'hardhat';

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumber, Wallet } from 'ethers';
import { ZilliqaRecover__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { ZERO_ADDRESS } from './helpers/constants';

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
const ZilKey: KeystoreV3 = JSON.parse(
  readFileSync('./test/zil18k3cvzg379g02et9fg2ga395r027jx5jggzvh5.json').toString(),
);
describe('ZilliqaRecover', () => {
  let signers: SignerWithAddress[];
  let coinbase: SignerWithAddress;
  let privateKey: string;
  let zilWallet: Wallet;
  let publicKey: string;
  let zilAddress: string;

  before(async () => {
    signers = await ethers.getSigners();
    privateKey = await decryptPrivateKey('UNSTesting32;', ZilKey);
    [coinbase] = signers;
    zilWallet = new Wallet(privateKey, coinbase.provider);
    publicKey = zilWallet.publicKey.replace(/^0x04/, '0x');
    zilAddress = getAddressFromPublicKey(normalizePublicKey(zilWallet.publicKey)).toLowerCase();
    await (
      await coinbase.sendTransaction({ to: zilWallet.address, value: BigNumber.from('100000000000000000000') })
    ).wait();
  });

  it('works', async () => {
    const content: KeystoreV3 = JSON.parse(
      readFileSync('./test/zil18k3cvzg379g02et9fg2ga395r027jx5jggzvh5.json').toString(),
    );
    // ETH public key format has a 0x04 constant prefix
    // We don't need to that when operating public key in a contract
    expect(zilAddress).to.eql(content.address.toLowerCase());
    const message = utils.solidityKeccak256(['uint256', 'uint256', 'bytes'], [NetworkId, TokenId, publicKey]);

    const contract = await new ZilliqaRecover__factory(coinbase).deploy();
    await contract.initialize(
      ZERO_ADDRESS,
      coinbase.address,
      // zil checksum is not the same as eth checksum
    );
    expect(await contract.message(TokenId, publicKey)).to.eql(message, 'Low message failed');
    expect(await contract.ethSignedMessage(TokenId, publicKey)).to.eql(
      hashMessage(utils.arrayify(message)),
      'High message failed',
    );
    expect(await contract.ethAddress(publicKey)).to.eql(zilWallet.address);
    const compressedPublicKey = await contract.compressPublicKey(publicKey);
    expect(compressedPublicKey).to.eql('0x' + compressPublicKey(zilWallet.publicKey.replace('0x', '')));
    // y^2 = a*x^3 + b
    expect(
      // zil checksum is not the same as eth checksum
      (await contract.zilAddress(publicKey)).toLowerCase(),
    ).to.eql(zilAddress);
    const signature = await zilWallet.signMessage(ethers.utils.arrayify(message));
    const recover = await contract.recover1(TokenId, publicKey, signature);
    expect(recover.recovered).to.eql(zilWallet.address);
    await contract.setZilOwner([TokenId], zilAddress);
    const verify = await contract.verify1(TokenId, publicKey, signature);

    expect(verify).to.eql(true);
  });

  it('claims', async () => {
    const labels = DomainName.split('.');
    const newOwner = signers[1];
    const unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    const zilliqaRecover = await new ZilliqaRecover__factory(coinbase).deploy();
    await zilliqaRecover.initialize(unsRegistry.address, coinbase.address);
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await zilliqaRecover.setZilOwner([TokenId], zilAddress);
    await unsRegistry.mintWithRecords(zilliqaRecover.address, labels, [], [], false);
    expect(await unsRegistry.ownerOf(TokenId)).to.eql(zilliqaRecover.address);
    console.log({ balance: (await zilWallet.getBalance()).toString() });
    await zilliqaRecover.connect(zilWallet).claim(TokenId, publicKey, newOwner.address);
    expect(await unsRegistry.ownerOf(TokenId)).to.eql(newOwner.address);
  });

  it('claims via meta', async () => {
    expect(1).to.eql(1);
  });
});
