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
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-solhint");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require('solidity-coverage');
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
                version: '0.8.4',
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
        goerli: {
            url: `https://goerli.infura.io/v3/${process.env.GOERLI_INFURA_KEY}`,
            chainId: 5,
            accounts: process.env.GOERLI_UNS_PRIVATE_KEY ? [process.env.GOERLI_UNS_PRIVATE_KEY] : undefined,
        },
        mainnet: {
            url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_KEY}`,
            chainId: 1,
            accounts: process.env.MAINNET_UNS_PRIVATE_KEY ? [process.env.MAINNET_UNS_PRIVATE_KEY] : undefined,
            loggingEnabled: true,
        },
        mumbai: {
            url: `https://polygon-mumbai.infura.io/v3/${process.env.MUMBAI_INFURA_KEY}`,
            chainId: 80001,
            accounts: process.env.MUMBAI_UNS_PRIVATE_KEY ? [process.env.MUMBAI_UNS_PRIVATE_KEY] : undefined,
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
        target: 'ethers-v5',
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
        only: ['UNSRegistry.sol', 'ProxyReader.sol', 'MintingManager.sol'],
    },
    mocha: {
        timeout: 100000,
        require: ['./test/helpers/setup.ts'],
    },
    etherscan: {
        apiKey: (0, lodash_1.pickBy)({
            mainnet: process.env.ETHERSCAN_API_KEY,
            goerli: process.env.ETHERSCAN_API_KEY,
            polygon: process.env.POLYGONSCAN_API_KEY,
            polygonMumbai: process.env.POLYGONSCAN_API_KEY,
        }),
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
            goerli: [
                '0xb3B86785A51B950fd54ABdF420ff3B60E091870c',
                '0x7EF88A779651f26a4967026a32Cae4F01fF8D151',
                '0x0c71a3494484459bbF9777Dd3109515B2E653CCb',
                '0x288DA3443BBEBcc7a339182323aa3F23126DFe7a',
                '0xe45541799119C1D63b60e0F834F3A381D4BEDbea',
                '0xdb36B5c4cF1D96f020D7629a09cB54ab787414d6',
                '0x3b9FB7983d897B7fe2fD7563e07e24CbA830b03B',
                '0x903aA579B9eF13862Fda73275B349017d8fD09eB',
                '0x7Ac8596cfbb0504DFDEC08d5088B67E7fbfae47f',
                '0xB83180632b72f988585AF02FC27229bF2Eabd139',
                '0x1daf08a27304a78434e22ab79bea508e341f910d',
            ],
            mainnet: [],
            mumbai: ['0xc152ba5caa9db5883f2cfefb984610fd3bd7914a'],
            polygon: ['0xd8263053a6d08ef3acbf2381f144b90841726233'],
        },
    },
};
exports.default = config;
