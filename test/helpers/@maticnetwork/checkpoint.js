const { bufferToHex } = require('ethereumjs-util');
const assert = require('assert');

const MerkleTree = require('./merkle-tree');
const {
  getTxBytes,
  getReceiptBytes,
  getReceiptProof,
  getTxProof,
  verifyTxProof,
} = require('./proofs');
const { getBlockHeader } = require('./blocks');
const { childWeb3 } = require('./contracts');

let headerNumber = 0;

async function build (event) {
  const blockHeader = getBlockHeader(event.block);
  const tree = new MerkleTree([blockHeader]);
  const receiptProof = await getReceiptProof(
    event.receipt,
    event.block,
    null /* web3 */,
    [event.receipt],
  );
  const txProof = await getTxProof(event.tx, event.block);
  assert.ok(verifyTxProof(receiptProof), 'verify receipt proof failed in js');

  headerNumber += 1;
  return {
    header: {
      number: headerNumber,
      root: tree.getRoot(),
      start: event.receipt.blockNumber,
    },
    receipt: getReceiptBytes(event.receipt), // rlp encoded
    receiptParentNodes: receiptProof.parentNodes,
    tx: getTxBytes(event.tx), // rlp encoded
    txParentNodes: txProof.parentNodes,
    path: Buffer.concat([Buffer.from('00', 'hex'), receiptProof.path]),
    number: event.receipt.blockNumber,
    timestamp: event.block.timestamp,
    transactionsRoot: Buffer.from(event.block.transactionsRoot.slice(2), 'hex'),
    receiptsRoot: Buffer.from(event.block.receiptsRoot.slice(2), 'hex'),
    proof: await tree.getProof(blockHeader),
  };
}

async function submitCheckpoint (checkpointManager, txnHash) {
  const tx = await childWeb3.eth.getTransaction(txnHash);
  const receipt = await childWeb3.eth.getTransactionReceipt(txnHash);
  const block = await childWeb3.eth.getBlock(
    receipt.blockHash,
    true, /* returnTransactionObjects */
  );
  const event = {
    tx,
    receipt,
    block,
  };
  // build checkpoint
  const checkpointData = await build(event);
  const root = bufferToHex(checkpointData.header.root);

  // submit checkpoint including burn (withdraw) tx
  const setCheckPointTxReceipt = await checkpointManager.methods.setCheckpoint(root, block.number, block.number).send();
  const setCheckPointTx = await childWeb3.eth.getTransaction(setCheckPointTxReceipt.transactionHash);

  // return checkpoint data
  return { checkpointData, setCheckPointTx };
}

module.exports = {
  build,
  submitCheckpoint,
};
