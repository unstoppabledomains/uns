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
import { formatsByName } from '@ensdomains/address-encoder';
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

const DEFAULT_VALIDATION_REGEX_STRING = '^(.+){1,1024}$';

// Reference: https://docs.ens.domains/contract-api-reference/publicresolver#get-contract-abi
const knownPublicResolverRecordKeys: EnsResolverKeyMap = {
  'pubkey.x': {
    unsKey: null,
    symbol: null,
    label: 'Public Key X',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'pubkey.y': {
    unsKey: null,
    symbol: null,
    label: 'Public Key Y',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
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
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.description': {
    unsKey: null,
    symbol: null,
    label: 'Description',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.display': {
    unsKey: null,
    symbol: null,
    label: 'Display Name',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
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
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.mail': {
    unsKey: null,
    symbol: null,
    label: 'Mailing Address',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.notice': {
    unsKey: null,
    symbol: null,
    label: 'Notice',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.location': {
    unsKey: null,
    symbol: null,
    label: 'Location',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.phone': {
    unsKey: null,
    symbol: null,
    label: 'Phone Number',
    validationRegex: '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
  },
  'text.url': {
    unsKey: null,
    symbol: null,
    label: 'Website URL',
    validationRegex:
      '^(http(s)?|ipfs)://(www.)?[a-zA-Z0-9_]+([-.]{1}[a-zA-Z0-9_]+)*.[a-zA-Z0-9_]+(:[0-9]{1,5})?(/.*)?$',
  },
  'text.com.github': {
    unsKey: null,
    symbol: null,
    label: 'GitHub Username',
    validationRegex: '^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$',
  },
  'text.com.peepeth': {
    unsKey: null,
    symbol: null,
    label: 'Peepeth Username',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.com.linkedin': {
    unsKey: null,
    symbol: null,
    label: 'LinkedIn Username',
    validationRegex: '^(http(s)?://)?([a-zA-Z0-9_]+.)?linkedin.com/(pub|in|profile)/([-a-zA-Z0-9]+)/*',
  },
  'text.com.twitter': {
    unsKey: 'social.twitter.username',
    symbol: null,
    label: 'Twitter Username',
    validationRegex: '^(?:https?://)?(?:www.)?(?:twitter.com/)?(?:#!/)?@?([a-zA-_Z0-9]+)(?:/.*)?$',
  },
  'text.io.keybase': {
    unsKey: null,
    symbol: null,
    label: 'Keybase Username',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
  'text.org.telegram': {
    unsKey: null,
    symbol: null,
    label: 'Telegram Username',
    validationRegex: '/([a-zA-Z0-9_]{5,}$)/',
  },
  'text.eth.ens.delegate': {
    unsKey: null,
    symbol: null,
    label: 'ETH ENS Delegate',
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  },
};

// Reference: https://github.com/ensdomains/content-hash/blob/master/src/profiles.ts#L165
// https://github.com/ensdomains/ens-app-v3/blob/main/src/constants/supportedContentHashKeys.json
// ENS APP content hash validation:
// https://github.com/ensdomains/ens-app-v3/blob/07f8f25c582355d95526de62bc6b31be99eec742/src/utils/contenthash.ts#L169
const knownEnsContentHashRecordKeys: EnsResolverKeyMap = {
  'contenthash.skynet': {
    unsKey: null,
    symbol: null,
    label: 'Skynet Content Hash',
    validationRegex: '^.{46}$',
  },
  'contenthash.swarm': {
    unsKey: null,
    symbol: null,
    label: 'Swarm Content Hash',
    validationRegex: '^.{4,}$',
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
    validationRegex: '^[a-zA-Z0-9]+$',
  },
  'contenthash.arweave': {
    unsKey: null,
    symbol: null,
    label: 'Arweave Content Hash',
    validationRegex: '^.{43}$',
  },
  'contenthash.onion': {
    unsKey: null,
    symbol: null,
    label: 'Onion Content Hash',
    validationRegex: '^(.{16}|.{56})$',
  },
};

const unsSingleChainTokenFormat = (symbol: string) => `crypto.${symbol}.address`;
const unsMultiChainERC20TokenFormat = (symbol: string) => `crypto.${symbol}.version.ERC20.address`;

// Reference: https://github.com/ensdomains/ens-app-v3/blob/main/src/constants/coinList.ts
const ensAppSupportedCoinListKeys = Object.keys(formatsByName).filter((c) => !c.match(/_LEGACY/));
const unsKeysObj = UnsResolverKeysJson.keys;

const bip44CoinNameMap: Record<string, string> = bip44Constants.reduce((map, [_, coinSymbol, coinName]) => {
  map[coinSymbol] = coinName;
  return map;
}, {});

// Map ENS supported coins with UNS resolver keys tokens
// For now, the ens-resolver-keys.json is only being used on the website frontend,
// so we just need the same known coin list from ENS.
const ensCoinKeys: EnsResolverKeyMap = ensAppSupportedCoinListKeys.reduce((map, coinSymbol) => {
  const coinName = bip44CoinNameMap[coinSymbol];
  const { coinType } = formatsByName[coinSymbol];

  const key = `addr.${coinType}`;

  map[key] = {
    unsKey: null,
    symbol: coinSymbol,
    label: coinName,
    validationRegex: DEFAULT_VALIDATION_REGEX_STRING,
  };

  const unsSingleChainKey = unsSingleChainTokenFormat(coinSymbol);
  const unsMultiChainKey = unsMultiChainERC20TokenFormat(coinSymbol);

  // Map single chain coins
  if (unsKeysObj[unsSingleChainKey]) {
    map[key].unsKey = unsSingleChainKey;
    map[key].validationRegex = unsKeysObj[unsSingleChainKey].validationRegex || null;
  }
  // Map multi chain coins
  // We only map ERC20 tokens in the UNS resolver keys
  else if (unsKeysObj[unsMultiChainKey]) {
    map[key].unsKey = unsMultiChainKey;
    map[key].validationRegex = unsKeysObj[unsMultiChainKey].validationRegex || null;
  }

  return map;
}, {} as EnsResolverKeyMap);

const resultKeys: EnsResolverKeyMap = {
  ...ensCoinKeys,
  ...knownTextRecordKeys,
  ...knownEnsContentHashRecordKeys,
  ...knownPublicResolverRecordKeys,
};

const resultTemplate = (keys: object) => ({
  version: '0.0.1',
  information: {
    description: 'All common ENS resolver keys with a defined meaning and related metadata',
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
