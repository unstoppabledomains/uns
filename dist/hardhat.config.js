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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const config_1 = require("hardhat/config");
const lodash_1 = require("lodash");
require("@typechain/hardhat");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-solhint");
require("hardhat-tracer");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
const yargs_1 = __importDefault(require("yargs/yargs"));
const sandbox_1 = require("./sandbox");
const argv = (0, yargs_1.default)().env('').boolean('enableGasReport').boolean('enableContractSizer').boolean('ci').parseSync();
(0, config_1.task)(task_names_1.TASK_COMPILE, 'hook compile task to perform post-compile task', (_, hre, runSuper) => __awaiter(void 0, void 0, void 0, function* () {
    const { root, flatArtifacts } = hre.config.paths;
    const outputDir = path_1.default.resolve(root, flatArtifacts);
    yield runSuper();
    if (fs_1.default.existsSync(outputDir)) {
        fs_1.default.rmdirSync(outputDir, { recursive: true });
    }
    fs_1.default.mkdirSync(outputDir, { recursive: true });
    for (const artifactPath of yield hre.artifacts.getArtifactPaths()) {
        const artifact = fs_1.default.readFileSync(artifactPath);
        const { abi, contractName } = JSON.parse(artifact.toString());
        if (!abi.length || contractName.includes('Mock'))
            continue;
        const target = path_1.default.join(outputDir, `${contractName}.json`);
        fs_1.default.copyFileSync(artifactPath, target);
    }
}));
require("hardhat-abi-exporter");
const settings = {
    optimizer: {
        enabled: true,
        runs: 200,
    },
};
const config = {
    solidity: {
        compilers: [
            {
                version: '0.5.12',
                settings,
            },
            {
                version: '0.6.6',
                settings: Object.assign(Object.assign({}, settings), { metadata: {
                        bytecodeHash: 'none',
                    } }),
            },
            {
                version: '0.8.17',
                settings: Object.assign(Object.assign({}, settings), { metadata: {
                        bytecodeHash: 'none',
                    } }),
            },
        ],
    },
    paths: {
        artifacts: './.artifacts',
        flatArtifacts: './artifacts',
    },
    networks: {
        hardhat: {
            blockGasLimit: 10000000,
            initialBaseFeePerGas: 0,
            hardfork: 'merge',
        },
        localhost: {
            url: 'http://localhost:8545',
            chainId: 31337,
            loggingEnabled: true,
        },
        sandbox: sandbox_1.Sandbox.defaultNetworkOptions(),
        sepolia: {
            url: `https://sepolia.infura.io/v3/${process.env.SEPOLIA_INFURA_KEY}`,
            chainId: 11155111,
            accounts: process.env.SEPOLIA_UNS_PRIVATE_KEY ? [process.env.SEPOLIA_UNS_PRIVATE_KEY] : undefined,
        },
        amoy: {
            url: `https://polygon-amoy.infura.io/v3/${process.env.AMOY_INFURA_KEY}`,
            chainId: 80002,
            accounts: process.env.AMOY_UNS_PRIVATE_KEY ? [process.env.AMOY_UNS_PRIVATE_KEY] : undefined,
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_KEY}`,
            chainId: 1,
            accounts: process.env.MAINNET_UNS_PRIVATE_KEY ? [process.env.MAINNET_UNS_PRIVATE_KEY] : undefined,
            loggingEnabled: true,
        },
        polygon: {
            url: `https://polygon-mainnet.infura.io/v3/${process.env.POLYGON_INFURA_KEY}`,
            chainId: 137,
            accounts: process.env.POLYGON_UNS_PRIVATE_KEY ? [process.env.POLYGON_UNS_PRIVATE_KEY] : undefined,
            loggingEnabled: true,
        },
    },
    typechain: {
        outDir: 'types',
        target: 'ethers-v6',
    },
    gasReporter: {
        enabled: argv.enableGasReport,
        currency: 'USD',
        outputFile: argv.ci ? 'gas-report.txt' : undefined,
        excludeContracts: ['ERC721ReceiverMock', 'ERC2771RegistryContextMock', 'ERC20Upgradeable'],
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: argv.enableContractSizer,
        disambiguatePaths: false,
        only: ['UNSRegistry.sol', 'ProxyReader.sol', 'MintingManager.sol', 'ENSCustody.sol'],
    },
    mocha: {
        timeout: 100000,
    },
    etherscan: {
        apiKey: (0, lodash_1.pickBy)({
            mainnet: process.env.ETHERSCAN_API_KEY,
            sepolia: process.env.ETHERSCAN_API_KEY,
            polygon: process.env.POLYGONSCAN_API_KEY,
            polygonAmoy: process.env.POLYGONSCAN_API_KEY,
        }),
        customChains: [
            {
                network: 'polygonAmoy',
                chainId: 80002,
                urls: {
                    apiURL: 'https://api-amoy.polygonscan.com/api',
                    browserURL: 'https://amoy.polygonscan.com/',
                },
            },
        ],
    },
    abiExporter: {
        path: './artifacts/abi',
        clear: true,
        flat: true,
        except: ['Mock'],
        spacing: 0,
    },
    uns: {
        minters: {
            hardhat: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
            localhost: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'],
            sandbox: ['0x9DC64b2558b458A15C7f01c192D874Ef460f0A29'],
            sepolia: ['0x1daf08a27304a78434e22ab79bea508e341f910d'],
            amoy: ['0x31df70766e92c0a69ada7ecb6dc1634d64748be2'],
            mainnet: ['0x5465c72ce00196550d6f89c40830f6bc81599f4f'],
            polygon: ['0x58cb2542a5b3b0999d41de59ad03331bbfb4dda3'],
        },
        multisig: {
            mainnet: '0x6bEca92600be24179ae70A430AEF4aE632fddDc8',
            polygon: '0xC8E1B5c41c42ad1cE8336714cA2b2f2588F0a337',
            sepolia: '0x1197C09C38d460584473e8837D79c14343f24890',
            amoy: '0x458adB6cce7D9984b74bC83c6F71Fbd1fd16085e',
        },
    },
    defender: {
        apiKey: process.env.DEFENDER_API_KEY || '',
        apiSecret: process.env.DEFENDER_API_SECRET || '',
    },
};
exports.default = config;
