const Web3 = require('web3');
const { network } = require('hardhat');

const childWeb3 = new Web3(network.provider);

module.exports = {
  childWeb3,
};
