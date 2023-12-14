module.exports = {
  configureYulOptimizer: true,
  skipFiles: [
    './@ens',
    './@maticnetwork',
    './history',
    './mocks',
    './utils',
  ],
};
