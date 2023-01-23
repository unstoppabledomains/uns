"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TLD = exports.EMPTY_SIGNATURE = exports.ZERO_WORD = exports.ZERO_ADDRESS = exports.DEAD_ADDRESS = void 0;
const hardhat_1 = require("hardhat");
const { BigNumber } = hardhat_1.ethers;
exports.DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';
exports.ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
exports.ZERO_WORD = '0x0000000000000000000000000000000000000000000000000000000000000000';
exports.EMPTY_SIGNATURE = '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
exports.TLD = {
    CRYPTO: BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f'),
    WALLET: BigNumber.from('0x1e3f482b3363eb4710dae2cb2183128e272eafbe137f686851c1caea32502230'),
    X: BigNumber.from('0x241e7e2b7fd7333b3c0c049b326316b811af0c01cfc0c7a90b466fda3a70fc2d'),
    NFT: BigNumber.from('0xb75cf4f3d8bc3deb317ed5216d898899d5cc6a783f65f6768eb9bcb89428670d'),
    BLOCKCHAIN: BigNumber.from('0x4118ebbd893ecbb9f5d7a817c7d8039c1bd991b56ea243e2ae84d0a1b2c950a7'),
    BITCOIN: BigNumber.from('0x042fb01c1e43fb4a32f85b41c821e17d2faeac58cfc5fb23f80bc00c940f85e3'),
    888: BigNumber.from('0x5c828ec285c0bf152a30a325b3963661a80cb87641d60920344caf04d4a0f31e'),
    DAO: BigNumber.from('0xb5f2bbf81da581299d4ff7af60560c0ac854196f5227328d2d0c2bb0df33e553'),
    ZIL: BigNumber.from('0xd81bbfcee722494b885e891546eeac23d0eedcd44038d7a2f6ef9ec2f9e0d239'),
    POLYGON: BigNumber.from('0xed9ce6b49a0e2c56c57c86795b131bd6df792312183994c3cf3de1516cfe92d6'),
    UNSTOPPABLE: BigNumber.from('0x92bba949890cd44a226a8ce54135cf86538cd6c5ca0ccf41877102fd718cc8aa'),
    KLEVER: BigNumber.from('0xa18784bb78ee0f577251fb21ad5cac7a140ab47e9414e3c7af5125e3e1d28923'),
    HI: BigNumber.from('0xfdb51f7f56d9b1149db5ce99afcf60dda4416fd6fb8dc0649fec13cd03e1803e'),
};
