import { NameService } from './config';

export enum Network {
  POLYGON,
  ETHEREUM,
  BASE,
}

export const NetworkChainIds = {
  [Network.POLYGON]: [137, 80002],
  [Network.ETHEREUM]: [1, 11155111],
  [Network.BASE]: [8453, 84532],
};

export type TLDConfig = {
  nameServices: NameService[];
  networks: Network[];
  hash: bigint;
  expirable?: boolean;
};

export const TLD: Record<string, TLDConfig> = {
  crypto: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f'),
  },
  wallet: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230'),
  },
  x: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x241e7e2b7fd7333b3c0c049b326316b811af0c01cfc0c7a90b466fda3a70fc2d'),
  },
  nft: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d'),
  },
  blockchain: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x4118ebbd893ecbb9f5d7a817c7d8039c1bd991b56ea243e2ae84d0a1b2c950a7'),
  },
  bitcoin: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x042fb01c1e43fb4a32f85b41c821e17d2faeac58cfc5fb23f80bc00c940f85e3'),
  },
  888: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x5c828ec285c0bf152a30a325b3963661a80cb87641d60920344caf04d4a0f31e'),
  },
  dao: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553'),
  },
  polygon: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xed9ce6b49a0e2c56c57c86795b131bd6df792312183994c3cf3de1516cfe92d6'),
  },
  unstoppable: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x92bba949890cd44a226a8ce54135cf86538cd6c5ca0ccf41877102fd718cc8aa'),
  },
  klever: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xa18784bb78ee0f577251fb21ad5cac7a140ab47e9414e3c7af5125e3e1d28923'),
  },
  hi: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xfdb51f7f56d9b1149db5ce99afcf60dda4416fd6fb8dc0649fec13cd03e1803e'),
  },
  kresus: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x2acf53593112265ba651274f0e33a6b3fe86f92bbee4d39211540592fde6b0f3'),
  },
  anime: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xaf4d61a6acdda7379d6f90207923aeb080994d0f1aaba4b8b24a14f965b2bb7c'),
  },
  manga: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x57ea207b3238a69d8a9a53252de172f2ceae1d856008b13208a203867a707c78'),
  },
  binanceus: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x2a91107027b89ab420a4d8ec457493cfca12ab17615ec8c876695f1343f3f0fd'),
  },
  realm: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x2ac5a394f941733376764fbf4c4b2933098b23a405bd8c55c9a8d32e2c8fb696'),
  },
  go: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xa264639c3dbff58a1ded5efcf724e50a9c7847ff8197c87c00d009fbba2a3720'),
  },
  altimist: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x9bf15275eb85f2e69308f3dbfbe0f94cade4f05c2aa24ba7b9eba5ad2fb1a2cb'),
  },
  pudgy: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x17936dd2b9c99a1e1bfa039dd7d40118f3ed535fcd9c8cda23c8070ffb4c2264'),
  },
  austin: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x89e68000b532da79f9a0d4b8416eaa4f64294236ab233205343453d5bec22933'),
  },
  bitget: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xbf2121df4e351413ea6788cb220e735378a753cec288cb22644340d58d597b23'),
  },
  pog: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xe76cc52c68a868af0cba676c92337a921cc721b45b6630e47f7ecb78e3e0edcc'),
  },
  clay: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x58872a8ca9414ae0f3ab850f51efaf4c77b647d903f9ec89a03d3018bb42e4fa'),
  },
  witg: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xf72e00036d7ef2d56e70c6df1d619bcccb64c93ea5b96305e7d7f24c47b4b563'),
  },
  metropolis: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x46a29e7d78413806ab5b6e30bc360bbff329e7bec2fc3ddf6f62d8c6c17c45b6'),
  },
  wrkx: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xacf08822cf871e802cb23fdb2224cb924878985b866b92e55aaae8c0a8a898eb'),
  },
  secret: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x335f1d8a43ebd6d9277127e859f502a14bbe3ccbe2d3f89be38fd0086da4c396'),
  },
  raiin: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x2418c6dc1c5996890c54f1b197ce3d5f255b857445bce309215d0751b56fcd65'),
  },
  stepn: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x05cb1b6d0e0a38c2fdeacf5d8383eea8f73d8fdeca1e4cc99a0e202f68d5b7df'),
  },
  kryptic: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x5e0664fb4fc872470219240d9272bd532629149e28b8ceed74f00d9e7314abb4'),
  },
  ubu: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x0adc8e928b9a2309a49011aae110462d6f3642f8b8b0602ccd9a14763ba2f283'),
  },
  tball: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x241cdd75e86f1a1da99d0321ae7d8e31cdf7c71a31d68b44d8f6f20dfafa9db6'),
  },
  farms: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xd75c01499ad11caab105cfefbf62ed6f0c7208f8de3fa293f01c209b37a1d036'),
  },
  dfz: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x3b270f4d000c6046ee64e8c025ad8cff71e728b275a81bf53a060442fe9f9766'),
  },
  lfg: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x8a1e62a27632ec008a082a22be9aded2ff7668fdd019e4d4001a5a27c4e84f81'),
  },
  dream: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x30b126da528ed6a22ad6ce11ea44a16f3990a215ef04115d84bb9275b709e89c'),
  },
  zil: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d239'),
  },

  com: {
    nameServices: [NameService.UNS, NameService.ENS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xac2c11ea5d4a4826f418d3befbf0537de7f13572d2a433edfe4a7314ea5dc896'),
    expirable: true,
  },
  ca: {
    nameServices: [NameService.UNS, NameService.ENS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0xc9dca3620bc4f436a4161d86f335af2a8f7eb7bae05865a71e18fc617ef98c4e'),
    expirable: true,
  },
  pw: {
    nameServices: [NameService.UNS],
    networks: [Network.POLYGON, Network.ETHEREUM],
    hash: BigInt('0x664762df8e3be902c3ad74d28b175ee867db0c563d649d3583cef4f5e5a4449d'),
    expirable: true,
  },

  // ENS
  eth: {
    nameServices: [NameService.ENS],
    networks: [Network.ETHEREUM],
    hash: BigInt('0xac2c11ea5d4a4826f418d3befbf0537de7f13572d2a433edfe4a7314ea5dc896'),
    expirable: true,
  },

  // BASE
  udtest: {
    nameServices: [NameService.UNS],
    networks: [Network.BASE],
    hash: BigInt('0xe1fcc786688c3e9242130dc114f8907dfd657ff4136158359d984ea697413c33'),
  },
  smobler: {
    nameServices: [NameService.UNS],
    networks: [Network.BASE],
    hash: BigInt('0x670e86e82c6551930f0b729bfa9173a1bfdebc6fb08f49fb97cc0077cae611a1'),
  },
};
