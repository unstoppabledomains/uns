"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_waffle_1 = require("ethereum-waffle");
const chai_1 = __importDefault(require("chai"));
chai_1.default.use(ethereum_waffle_1.solidity);
