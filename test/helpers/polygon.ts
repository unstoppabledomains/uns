import { artifacts } from 'hardhat';
import { BigNumberish, Contract, ContractReceipt, ContractTransaction, utils } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { SimpleCheckpointManager } from '../../types/contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol';
import { submitCheckpoint } from './@maticnetwork/checkpoint';
import { childWeb3 } from './@maticnetwork/contracts';

/**
 * keccak256('Transfer(address,address,uint256)') =
 *    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
 */
const ERC721_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const abiCoder = new utils.AbiCoder();

export const buildPredicateExitInput = async (
  withdrawer: string,
  receiver: string,
  tokenId: BigNumberish,
): Promise<string> => {
  return utils.RLP.encode([
    '0x', // skip first elem
    [ERC721_TRANSFER_EVENT_SIG, withdrawer, receiver, abiCoder.encode(['uint256'], [tokenId])],
  ]);
};

export const writeCheckpoint = async (contract: Contract, admin: SignerWithAddress, txn: ContractTransaction) => {
  const abi = (await artifacts.readArtifact('SimpleCheckpointManager')).abi;
  const checkpointManager = new childWeb3.eth.Contract(abi, contract.address, {
    from: admin.address,
  });
  return await submitCheckpoint(checkpointManager, txn.hash);
};

export const buildExitInput = async (
  checkpointManager: SimpleCheckpointManager,
  receipt: ContractReceipt,
  checkpointData: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const headerNumber = (await checkpointManager.currentCheckpointNumber()).toNumber();
  const logIndex = receipt.logs.findIndex(
    (log) => log.topics[0].toLowerCase() === ERC721_TRANSFER_EVENT_SIG.toLowerCase(),
  );

  return utils.hexlify(
    utils.RLP.encode(
      [
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
      ].map((val) => utils.hexlify(val)),
    ),
  );
};
