import Web3 from 'web3';
import { network } from 'hardhat';

// TODO: fix as any here, network.provider and web3 provider are incompatible
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const childWeb3 = new Web3(network.provider as any);
