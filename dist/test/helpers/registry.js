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
exports.mintRandomDomain = exports.mintDomain = void 0;
const hardhat_1 = require("hardhat");
const generateRandomLabel = () => 'domain-' + hardhat_1.ethers.utils.hexlify(hardhat_1.ethers.utils.randomBytes(16));
function mintDomain(registry, owner, labels, withoutReverse = false, keys = [], values = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const ownerIsWallet = !(typeof owner == 'string');
        const address = ownerIsWallet ? owner.address : owner;
        yield registry.mintWithRecords(address, labels, keys, values, !withoutReverse);
        return yield registry.namehash(labels);
    });
}
exports.mintDomain = mintDomain;
const mintRandomDomain = (registry, owner, tld, withoutReverse = false, keys = [], values = []) => __awaiter(void 0, void 0, void 0, function* () {
    const labels = [generateRandomLabel(), tld];
    const ownerIsWallet = !(typeof owner == 'string');
    const address = ownerIsWallet ? owner.address : owner;
    yield registry.mintWithRecords(address, labels, keys, values, !withoutReverse);
    return yield registry.namehash(labels);
});
exports.mintRandomDomain = mintRandomDomain;
