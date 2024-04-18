export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const ZERO_WORD = '0x0000000000000000000000000000000000000000000000000000000000000000';
/* eslint-disable max-len */
export const EMPTY_SIGNATURE =
  '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

export const DAY = 24 * 60 * 60;
export const REGISTRATION_TIME = 28 * DAY;
export const BUFFERED_REGISTRATION_COST = REGISTRATION_TIME + 3 * DAY;

export const TLD = {
  // Regular
  CRYPTO: BigInt('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f'),
  WALLET: BigInt('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230'),
  X: BigInt('0x241e7e2b7fd7333b3c0c049b326316b811af0c01cfc0c7a90b466fda3a70fc2d'),
  NFT: BigInt('0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d'),
  BLOCKCHAIN: BigInt('0x4118ebbd893ecbb9f5d7a817c7d8039c1bd991b56ea243e2ae84d0a1b2c950a7'),
  BITCOIN: BigInt('0x042fb01c1e43fb4a32f85b41c821e17d2faeac58cfc5fb23f80bc00c940f85e3'),
  888: BigInt('0x5c828ec285c0bf152a30a325b3963661a80cb87641d60920344caf04d4a0f31e'),
  DAO: BigInt('0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553'),
  ZIL: BigInt('0xd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d239'),
  POLYGON: BigInt('0xed9ce6b49a0e2c56c57c86795b131bd6df792312183994c3cf3de1516cfe92d6'),
  UNSTOPPABLE: BigInt('0x92bba949890cd44a226a8ce54135cf86538cd6c5ca0ccf41877102fd718cc8aa'),
  KLEVER: BigInt('0xa18784bb78ee0f577251fb21ad5cac7a140ab47e9414e3c7af5125e3e1d28923'),
  HI: BigInt('0xfdb51f7f56d9b1149db5ce99afcf60dda4416fd6fb8dc0649fec13cd03e1803e'),
  KRESUS: BigInt('0x2acf53593112265ba651274f0e33a6b3fe86f92bbee4d39211540592fde6b0f3'),
  ANIME: BigInt('0xaf4d61a6acdda7379d6f90207923aeb080994d0f1aaba4b8b24a14f965b2bb7c'),
  MANGA: BigInt('0x57ea207b3238a69d8a9a53252de172f2ceae1d856008b13208a203867a707c78'),
  BINANCEUS: BigInt('0x2a91107027b89ab420a4d8ec457493cfca12ab17615ec8c876695f1343f3f0fd'),
  REALM: BigInt('0x2ac5a394f941733376764fbf4c4b2933098b23a405bd8c55c9a8d32e2c8fb696'),
  GO: BigInt('0xa264639c3dbff58a1ded5efcf724e50a9c7847ff8197c87c00d009fbba2a3720'),
  ALTIMIST: BigInt('0x9bf15275eb85f2e69308f3dbfbe0f94cade4f05c2aa24ba7b9eba5ad2fb1a2cb'),
  PUDGY: BigInt('0x17936dd2b9c99a1e1bfa039dd7d40118f3ed535fcd9c8cda23c8070ffb4c2264'),
  AUSTIN: BigInt('0x89e68000b532da79f9a0d4b8416eaa4f64294236ab233205343453d5bec22933'),
  BITGET: BigInt('0xbf2121df4e351413ea6788cb220e735378a753cec288cb22644340d58d597b23'),
  POG: BigInt('0xe76cc52c68a868af0cba676c92337a921cc721b45b6630e47f7ecb78e3e0edcc'),
  CLAY: BigInt('0x58872a8ca9414ae0f3ab850f51efaf4c77b647d903f9ec89a03d3018bb42e4fa'),

  // Expirable
  COM: BigInt('0xac2c11ea5d4a4826f418d3befbf0537de7f13572d2a433edfe4a7314ea5dc896'),
};

export const EXPIRABLE_TLDS = [
  'COM',
];
