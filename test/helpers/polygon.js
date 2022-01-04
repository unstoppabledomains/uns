const { ethers } = require('hardhat');

const { utils } = ethers;

const abiCoder = new utils.AbiCoder();

const buildPredicateExitInput = async (
  withdrawer,
  receiver,
  tokenId,
) => {
  /**
   * keccak256("Transfer(address,address,uint256)") =
   *    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
   */
  const data = utils.RLP.encode([
    '0x', // skip first elem
    [
      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      withdrawer,
      receiver,
      abiCoder.encode(['uint256'], [tokenId]),
    ],
  ]);
  return data;
};

const buildPredicateMetadataExitInput = async (
  withdrawer,
  receiver,
  tokenId,
  metadata,
) => {
  /**
   * keccak256('TransferWithMetadata(address,address,uint256,bytes)') =
   *    0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14
   */
  const data = [
    '0x', // skip first elem
    [
      '0xf94915c6d1fd521cee85359239227480c7e8776d7caf1fc3bacad5c269b66a14',
      withdrawer,
      receiver,
      abiCoder.encode(['uint256'], [tokenId]),
    ],
  ];
  if (metadata) {
    data.push(abiCoder.encode(['bytes'], [metadata]));
  }
  return utils.RLP.encode(data);
};

const buildPredicateBatchExitInput = async (
  withdrawer,
  tokenIds,
) => {
  /**
   * keccak256("WithdrawnBatch(address,uint256[])") =
   *    0xf871896b17e9cb7a64941c62c188a4f5c621b86800e3d15452ece01ce56073df
   */
  return utils.RLP.encode([
    '0x', // skip first elem
    [
      '0xf871896b17e9cb7a64941c62c188a4f5c621b86800e3d15452ece01ce56073df',
      withdrawer,
    ],
    // tokenIds
    abiCoder.encode(['uint256[]'], [tokenIds]),
  ]);
};

module.exports = {
  buildPredicateExitInput,
  buildPredicateMetadataExitInput,
  buildPredicateBatchExitInput,
};
