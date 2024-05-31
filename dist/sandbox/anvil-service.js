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
const ethers_1 = require("ethers");
const anvil_server_1 = require("./anvil-server");
class AnvilService {
    constructor(options = {}) {
        this._options = options;
        this._provider = new ethers_1.JsonRpcProvider(this.getRpcEndpoint());
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._server) {
                throw new Error('Anvil server is already started');
            }
            this._server = yield anvil_server_1.AnvilServer.launch(this._options, false);
        });
    }
    stopServer() {
        var _a;
        (_a = this._server) === null || _a === void 0 ? void 0 : _a.kill();
    }
    get provider() {
        return this._provider;
    }
    get server() {
        return this._server;
    }
    getRpcEndpoint() {
        return `http://${this._options.hostIpAddress}:${this._options.port}`;
    }
}
exports.default = AnvilService;
