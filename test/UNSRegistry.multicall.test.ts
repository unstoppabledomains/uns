import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { UNSRegistry, UNSRegistry__factory } from '../types';
import { TLD } from '../src/tlds';
import { ZERO_ADDRESS } from './helpers/constants';

describe('UNSRegistry (multicall)', () => {
  let unsRegistry: UNSRegistry;
  let signers: SignerWithAddress[], coinbase: SignerWithAddress, owner: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, owner] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.crypto.hash, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
  });

  it('should mint domain, set records and transfer domain', async () => {
    const labels = ['mul_1', 'crypto'];
    const tokenId = await unsRegistry.namehash(labels);

    await unsRegistry.multicall([
      unsRegistry.interface.encodeFunctionData('mintWithRecords', [
        coinbase.address,
        labels,
        ['key_11'],
        ['value_11'],
        false,
      ]),
      unsRegistry.interface.encodeFunctionData('set', ['key_21', 'value_21', tokenId]),
      unsRegistry.interface.encodeFunctionData('setOwner', [owner.address, tokenId]),
    ]);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
    expect(await unsRegistry.get('key_11', tokenId)).to.be.equal('value_11');
    expect(await unsRegistry.get('key_21', tokenId)).to.be.equal('value_21');
  });

  it('throw multicall tx when one of the internal tx reverts', async () => {
    const labels = ['mul_2', 'crypto'];
    const tokenId = await unsRegistry.namehash(labels);

    await unsRegistry.mintWithRecords(coinbase.address, labels, [], [], false);
    await expect(
      unsRegistry.multicall([
        unsRegistry.interface.encodeFunctionData('setOwner', [owner.address, tokenId]),
        unsRegistry.interface.encodeFunctionData('mintWithRecords', [coinbase.address, labels, [''], [''], false]),
        unsRegistry.interface.encodeFunctionData('set', ['key_21', 'value_21', tokenId]),
      ]),
    ).to.be.revertedWith('ERC721: token already minted');

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(coinbase.address);
  });
});
