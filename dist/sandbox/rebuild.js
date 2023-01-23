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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const tar_1 = __importDefault(require("tar"));
const config_1 = require("../src/config");
const deployer_1 = require("../src/deployer");
const _1 = require(".");
if (require.main === module) {
    (() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sandbox = yield _1.Sandbox.create({ extract: false });
            yield sandbox.start({ noSnapshot: true });
            const deployer = yield deployer_1.Deployer.create();
            const config = yield deployer.execute(['full', 'config_polygon_pos_bridge']);
            yield sandbox.stop();
            (0, config_1.mergeNetworkConfig)(config);
            const dbPath = _1.GANACHE_SERVER_CONFIG.database.dbPath;
            const snapshotPath = _1.Sandbox.snapshotPath();
            yield tar_1.default.create({
                cwd: dbPath,
                gzip: true,
                file: snapshotPath,
                filter: p => p.indexOf('_tmp') === -1,
            }, fs_1.default.readdirSync(dbPath));
        }
        catch (error) {
            console.error(error);
        }
        process.exit();
    }))();
}
