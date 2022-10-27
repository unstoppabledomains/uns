import Web3 from 'web3';
import { network } from 'hardhat';

// import { provider } from 'web3-core/types';

// TODO: fix as any here, network.provider and web3 provider are incompatible
export const childWeb3 = new Web3(network.provider as any);
