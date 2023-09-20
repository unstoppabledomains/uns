/**
 * Script to generate the ens-resolver-keys.json file
 *
 * Run the script:
 * npx ts-node scripts/generate_ens-resolver-keys.ts
 *
 * References:
 * - https://github.com/satoshilabs/slips/blob/master/slip-0044.md
 */

import * as fs from 'fs';
import { exec } from 'child_process';
import bip44Constants from 'bip44-constants';
import UnsResolverKeysJson from '../resolver-keys.json';

type EnsResolverKey = {
  unsKey: string | null;
  symbol: string | null;
  label: string | null;
  validationRegex: string | null;
};

type EnsResolverKeyMap = {
  [key: string]: EnsResolverKey;
};

// Reference: https://docs.ens.domains/contract-api-reference/publicresolver#get-contract-abi
const knownPublicResolverRecordKeys: EnsResolverKeyMap = {
  'pubkey.x': {
    unsKey: null,
    symbol: null,
    label: 'Public Key X',
    validationRegex: null,
  },
  'pubkey.y': {
    unsKey: null,
    symbol: null,
    label: 'Public Key Y',
    validationRegex: null,
  },
  'abi.json': {
    unsKey: null,
    symbol: null,
    label: 'ABI',
    validationRegex: null,
  },
};

// Reference: https://docs.ens.domains/ens-improvement-proposals/ensip-5-text-records
const knownTextRecordKeys: EnsResolverKeyMap = {
  'text.avatar': {
    unsKey: 'social.picture.value',
    symbol: null,
    label: 'Avatar',
    validationRegex: null,
  },
  'text.description': {
    unsKey: null,
    symbol: null,
    label: 'Description',
    validationRegex: null,
  },
  'text.display': {
    unsKey: null,
    symbol: null,
    label: 'Display Name',
    validationRegex: null,
  },
  'text.email': {
    unsKey: 'whois.email.value',
    symbol: null,
    label: 'Email',
    validationRegex: '^[^@]+@[^\\.]+\\..+$',
  },
  'text.keywords': {
    unsKey: null,
    symbol: null,
    label: 'Keywords',
    validationRegex: null,
  },
  'text.mail': {
    unsKey: null,
    symbol: null,
    label: 'Mailing Address',
    validationRegex: null,
  },
  'text.notice': {
    unsKey: null,
    symbol: null,
    label: 'Notice',
    validationRegex: null,
  },
  'text.location': {
    unsKey: null,
    symbol: null,
    label: 'Location',
    validationRegex: null,
  },
  'text.phone': {
    unsKey: null,
    symbol: null,
    label: 'Phone Number',
    validationRegex: null,
  },
  'text.url': {
    unsKey: null,
    symbol: null,
    label: 'Website URL',
    validationRegex: null,
  },
  'text.com.github': {
    unsKey: null,
    symbol: null,
    label: 'GitHub Username',
    validationRegex: null,
  },
  'text.com.peepeth': {
    unsKey: null,
    symbol: null,
    label: 'Peepeth Username',
    validationRegex: null,
  },
  'text.com.linkedin': {
    unsKey: null,
    symbol: null,
    label: 'LinkedIn Username',
    validationRegex: null,
  },
  'text.com.twitter': {
    unsKey: 'social.twitter.username',
    symbol: null,
    label: 'Twitter Username',
    validationRegex: null,
  },
  'text.io.keybase': {
    unsKey: null,
    symbol: null,
    label: 'Keybase Username',
    validationRegex: null,
  },
  'text.org.telegram': {
    unsKey: null,
    symbol: null,
    label: 'Telegram Username',
    validationRegex: null,
  },
};

// Reference: https://github.com/ensdomains/content-hash/blob/master/src/profiles.ts#L165
const knownEnsContentHashRecordKeys: EnsResolverKeyMap = {
  'contenthash.skynet': {
    unsKey: null,
    symbol: null,
    label: 'Skynet Content Hash',
    validationRegex: null,
  },
  'contenthash.swarm': {
    unsKey: null,
    symbol: null,
    label: 'Swarm Content Hash',
    validationRegex: null,
  },
  'contenthash.ipfs': {
    unsKey: 'dweb.ipfs.hash',
    symbol: null,
    label: 'IPFS Content Hash',
    validationRegex:
      '^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})$',
  },
  'contenthash.ipns': {
    unsKey: null,
    symbol: null,
    label: 'IPNS Content Hash',
    validationRegex: null,
  },
  'contenthash.arweave': {
    unsKey: null,
    symbol: null,
    label: 'Arweave Content Hash',
    validationRegex: null,
  },
  'contenthash.default': {
    unsKey: null,
    symbol: null,
    label: 'Default Content Hash',
    validationRegex: null,
  },
};

const BIP44_COIN_TYPE_OFF_SET = 2147483648;
const unsSingleChainTokenFormat = (symbol: string) => `crypto.${symbol}.address`;
const unsMultiChainERC20TokenFormat = (symbol: string) => `crypto.${symbol}.version.ERC20.address`;

const unsKeysObj = UnsResolverKeysJson.keys;

const ensCoinKeys: EnsResolverKeyMap = {};

// Map BIP-0044 coins with UNS resolver keys tokens
bip44Constants.forEach((row) => {
  const constant = row[0];
  const coinSymbol = row[1];
  const coinName = row[2];

  const coinType = constant - BIP44_COIN_TYPE_OFF_SET;

  const key = `addr.${coinType}`;

  ensCoinKeys[key] = {
    unsKey: null,
    symbol: coinSymbol,
    label: coinName,
    validationRegex: null,
  };

  const unsSingleChainKey = unsSingleChainTokenFormat(coinSymbol);
  const unsMultiChainKey = unsMultiChainERC20TokenFormat(coinSymbol);

  // Map single chain coins
  if (unsKeysObj[unsSingleChainKey]) {
    ensCoinKeys[key].unsKey = unsSingleChainKey;
    ensCoinKeys[key].validationRegex = unsKeysObj[unsSingleChainKey].validationRegex || null;
  }
  // Map multi chain coins
  // We only map ERC20 tokens in the UNS resolver keys
  else if (unsKeysObj[unsMultiChainKey]) {
    ensCoinKeys[key].unsKey = unsMultiChainKey;
    ensCoinKeys[key].validationRegex = unsKeysObj[unsMultiChainKey].validationRegex || null;
  }
});

const resultKeys: EnsResolverKeyMap = {
  ...ensCoinKeys,
  ...knownTextRecordKeys,
  ...knownEnsContentHashRecordKeys,
  ...knownPublicResolverRecordKeys,
};

const resultTemplate = (keys: object) => ({
  version: '0.0.1',
  information: {
    description: 'All ENS resolver keys supported by Unstoppable Domains with a defined meaning and related metadata',
    documentation: 'https://docs.unstoppabledomains.com/resolution/guides/records-reference',
    contribution: 'https://github.com/unstoppabledomains/uns/blob/main/ens-resolver-keys.json',
  },
  keys: {
    ...keys,
  },
});

fs.writeFile('ens-resolver-keys.json', JSON.stringify(resultTemplate(resultKeys)), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('ens-resolver-keys.json written successfully');

    exec('prettier --write ens-resolver-keys.json', (error, _, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log('File formatted');
    });
  }
});
