import { artifacts } from 'hardhat';
import {
  AbiCoder,
  BaseContract,
  BigNumberish,
  ContractTransactionReceipt,
  ContractTransactionResponse,
  encodeRlp,
  hexlify,
  toBeHex,
} from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { SimpleCheckpointManager } from '../../types/contracts/@maticnetwork/pos-portal/SimpleCheckpointManager.sol';
import { submitCheckpoint } from './@maticnetwork/checkpoint';
import { childWeb3 } from './@maticnetwork/contracts';

/**
 * keccak256('Transfer(address,address,uint256)') =
 *    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
 */
const ERC721_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

const abiCoder = new AbiCoder();

export const buildPredicateExitInput = (withdrawer: string, receiver: string, tokenId: BigNumberish): string => {
  return encodeRlp([
    '0x', // skip first elem
    [ERC721_TRANSFER_EVENT_SIG, withdrawer, receiver, abiCoder.encode(['uint256'], [tokenId])],
  ]);
};

export const writeCheckpoint = async (
  contract: BaseContract,
  admin: SignerWithAddress,
  txn: ContractTransactionResponse,
) => {
  const abi = (await artifacts.readArtifact('SimpleCheckpointManager')).abi;
  const checkpointManager = new childWeb3.eth.Contract(abi, await contract.getAddress(), {
    from: admin.address,
  });
  return await submitCheckpoint(checkpointManager, txn.hash);
};

export const buildExitInput = async (
  checkpointManager: SimpleCheckpointManager,
  receipt: ContractTransactionReceipt,
  checkpointData: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
  const headerNumber = await checkpointManager.currentCheckpointNumber();
  const logIndex = receipt.logs.findIndex(
    (log) => log.topics[0].toLowerCase() === ERC721_TRANSFER_EVENT_SIG.toLowerCase(),
  );

  return hexlify(
    encodeRlp(
      [
        toBeHex(headerNumber),
        Buffer.concat(checkpointData.proof),
        toBeHex(checkpointData.number),
        toBeHex(checkpointData.timestamp),
        checkpointData.transactionsRoot,
        checkpointData.receiptsRoot,
        checkpointData.receipt,
        encodeRlp(checkpointData.receiptParentNodes),
        checkpointData.path, // branch mask,
        toBeHex(logIndex),
      ].map((val) => hexlify(val)),
    ),
  );
};
