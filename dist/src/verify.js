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
const hardhat_1 = require("hardhat");
exports.default = (ctx, address, args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, hardhat_1.run)('verify:verify', {
            address,
            constructorArguments: args,
        });
    }
    catch (err) {
        ctx.log('Verification failed', { chainId: hardhat_1.network.config.chainId, address, args });
    }
});
