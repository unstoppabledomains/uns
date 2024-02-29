import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { UNSRegistry } from '../../types/contracts/UNSRegistry';

const generateRandomLabel = () => 'domain-' + ethers.utils.hexlify(
  ethers.utils.randomBytes(16),
);

type BaseMintParams = {
  unsRegistry: UNSRegistry,
  owner: string | SignerWithAddress,
  withoutReverse?: boolean,
  expiry?: number;
  keys?: string[],
  values?: string[],
};

export type MintDomainParams = BaseMintParams & {
  labels: string[],
};

export type MintRandomDomainParams = BaseMintParams & {
  tld: string,
};

export async function mintDomain ({
  unsRegistry,
  owner,
  labels,
  expiry = 0,
  withoutReverse = false,
  keys = [],
  values = [],
}: MintDomainParams) {
  const ownerIsWallet = !(typeof owner == 'string');
  const address = ownerIsWallet ? owner.address : owner;

  await unsRegistry.mintWithRecords(address, labels, keys, values, !withoutReverse);

  const tokenId = await unsRegistry.namehash(labels);
  if(expiry > 0) {
    await unsRegistry.setExpiry(expiry, tokenId);
  }

  return tokenId;
}

export const mintRandomDomain = async ({
  unsRegistry,
  owner,
  tld,
  expiry = 0,
  withoutReverse = false,
  keys = [],
  values = [],
}: MintRandomDomainParams) => {
  const labels = [generateRandomLabel(), tld];

  const ownerIsWallet = !(typeof owner == 'string');
  const address = ownerIsWallet ? owner.address : owner;

  await unsRegistry.mintWithRecords(address, labels, keys, values, !withoutReverse);

  const tokenId = await unsRegistry.namehash(labels);
  if(expiry > 0) {
    await unsRegistry.setExpiry(expiry, tokenId);
  }

  return tokenId;
};
