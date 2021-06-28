const fs = require('fs');
const merge = require('lodash.merge');

const configPath = './uns-config.json';

function readNetworkConfig () {
  const file = fs.existsSync(configPath) ? fs.readFileSync(configPath) : '{}';
  return JSON.parse(file.length ? file : '{}');
}

function mergeNetworkConfig (config) {
  const _config = merge(readNetworkConfig(), config);
  fs.writeFileSync(configPath, `${JSON.stringify(_config, null, 4)}\n`);
}

module.exports = {
  readNetworkConfig,
  mergeNetworkConfig,
};
