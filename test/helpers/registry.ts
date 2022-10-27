import {ethers} from 'hardhat';
import {BigNumberish} from 'ethers';

import {UNSRegistry} from '../../typechain-types/contracts/UNSRegistry';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const generateRandomLabel = () => 'domain-' + ethers.utils.hexlify(
  ethers.utils.randomBytes(16),
);

// TODO: make a params object instead of arguments list here
export async function mintDomain(
  registry: UNSRegistry,
  owner: string | SignerWithAddress, 
  tld: BigNumberish, 
  label: string = generateRandomLabel(),
  withoutReverse: boolean = false
) {
  const tokenId = await registry.childIdOf(tld, label);

  const ownerIsWallet = !(typeof owner == 'string');

  const address = ownerIsWallet ? owner.address : owner;

  await registry['mint(address,uint256,string)'](address, tokenId, label);

  if (ownerIsWallet && withoutReverse) {
    await registry.connect(owner)['removeReverse()']();
  }

  return tokenId;
}
