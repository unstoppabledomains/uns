"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExitInput = exports.writeCheckpoint = exports.buildPredicateExitInput = void 0;
const hardhat_1 = require("hardhat");
const ethers_1 = require("ethers");
const checkpoint_1 = require("./@maticnetwork/checkpoint");
const contracts_1 = require("./@maticnetwork/contracts");
const ERC721_TRANSFER_EVENT_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
const abiCoder = new ethers_1.utils.AbiCoder();
const buildPredicateExitInput = (withdrawer, receiver, tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    return ethers_1.utils.RLP.encode([
        '0x',
        [ERC721_TRANSFER_EVENT_SIG, withdrawer, receiver, abiCoder.encode(['uint256'], [tokenId])],
    ]);
});
exports.buildPredicateExitInput = buildPredicateExitInput;
const writeCheckpoint = (contract, admin, txn) => __awaiter(void 0, void 0, void 0, function* () {
    const abi = (yield hardhat_1.artifacts.readArtifact('SimpleCheckpointManager')).abi;
    const checkpointManager = new contracts_1.childWeb3.eth.Contract(abi, contract.address, {
        from: admin.address,
    });
    return yield (0, checkpoint_1.submitCheckpoint)(checkpointManager, txn.hash);
});
exports.writeCheckpoint = writeCheckpoint;
const buildExitInput = (checkpointManager, receipt, checkpointData) => __awaiter(void 0, void 0, void 0, function* () {
    const headerNumber = (yield checkpointManager.currentCheckpointNumber()).toNumber();
    const logIndex = receipt.logs.findIndex((log) => log.topics[0].toLowerCase() === ERC721_TRANSFER_EVENT_SIG.toLowerCase());
    return ethers_1.utils.hexlify(ethers_1.utils.RLP.encode([
        headerNumber,
        Buffer.concat(checkpointData.proof),
        checkpointData.number,
        checkpointData.timestamp,
        checkpointData.transactionsRoot,
        checkpointData.receiptsRoot,
        checkpointData.receipt,
        ethers_1.utils.RLP.encode(checkpointData.receiptParentNodes),
        checkpointData.path,
        logIndex,
    ].map((val) => ethers_1.utils.hexlify(val))));
});
exports.buildExitInput = buildExitInput;
