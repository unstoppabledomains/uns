import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UNSRegistry } from '../../types/contracts/UNSRegistry';

const generateRandomLabel = () => 'domain-' + ethers.utils.hexlify(
  ethers.utils.randomBytes(16),
);

// TODO: make a params object instead of arguments list here
export async function mintDomain (
  registry: UNSRegistry,
  owner: string | SignerWithAddress,
  labels: string[],
  withoutReverse = false,
  keys: string[] = [],
  values: string[] = [],
) {
  const ownerIsWallet = !(typeof owner == 'string');
  const address = ownerIsWallet ? owner.address : owner;

  await registry.mintWithRecords(address, labels, keys, values, !withoutReverse);

  return await registry.namehash(labels);
}

export const mintRandomDomain = async (
  registry: UNSRegistry,
  owner: string | SignerWithAddress,
  tld: string,
  withoutReverse = false,
  keys = [],
  values = [],
) => {
  const labels = [generateRandomLabel(), tld];

  const ownerIsWallet = !(typeof owner == 'string');
  const address = ownerIsWallet ? owner.address : owner;

  await registry.mintWithRecords(address, labels, keys, values, !withoutReverse);

  return await registry.namehash(labels);
};
