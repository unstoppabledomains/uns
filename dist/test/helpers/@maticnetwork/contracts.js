"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.childWeb3 = void 0;
const web3_1 = __importDefault(require("web3"));
const hardhat_1 = require("hardhat");
exports.childWeb3 = new web3_1.default(hardhat_1.network.provider);
