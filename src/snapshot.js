const { network } = require('hardhat');

async function snapshot () {
  return await network.provider.request({
    method: 'evm_snapshot',
    params: [],
  });
}

async function revert (snapshotId) {
  return await network.provider.request({
    method: 'evm_revert',
    params: [snapshotId],
  });
}

module.exports = {
  snapshot,
  revert,
};
