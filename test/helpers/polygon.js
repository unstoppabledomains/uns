const { ethers, artifacts } = require('hardhat');

const { childWeb3 } = require('./@maticnetwork/contracts');
const { submitCheckpoint } = require('./@maticnetwork/checkpoint');

const { utils } = ethers;

const ERC721_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const abiCoder = new utils.AbiCoder();

const buildPredicateExitInput = async (withdrawer, receiver, tokenId) => {
  /**
   * keccak256('Transfer(address,address,uint256)') =
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

const buildPredicateBatchExitInput = async (withdrawer, tokenIds) => {
  /**
   * keccak256('WithdrawnBatch(address,uint256[])') =
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

const writeCheckpoint = async (contract, admin, txn) => {
  const abi = (await artifacts.readArtifact('SimpleCheckpointManager')).abi;
  const checkpointManager = new childWeb3.eth.Contract(abi, contract.address, {
    from: admin.address,
  });
  return await submitCheckpoint(checkpointManager, txn.hash);
};

const buildExitInput = async (checkpointManager, receipt, checkpointData) => {
  const headerNumber = (await checkpointManager.currentCheckpointNumber()).toNumber();
  const logIndex = receipt.logs
    .findIndex(log => log.topics[0].toLowerCase() === ERC721_TRANSFER_EVENT_SIG.toLowerCase());

  return utils.hexlify(
    utils.RLP.encode([
      headerNumber,
      Buffer.concat(checkpointData.proof),
      checkpointData.number,
      checkpointData.timestamp,
      checkpointData.transactionsRoot,
      checkpointData.receiptsRoot,
      checkpointData.receipt,
      utils.RLP.encode(checkpointData.receiptParentNodes),
      checkpointData.path, // branch mask,
      logIndex,
    ].map(utils.hexlify)),
  );
};

module.exports = {
  buildPredicateExitInput,
  buildPredicateMetadataExitInput,
  buildPredicateBatchExitInput,
  writeCheckpoint,
  buildExitInput,
};
