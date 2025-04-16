import { HardhatUserConfig } from 'hardhat/types/config';
declare type MintersMap = Record<string, string[]>;
declare module 'hardhat/types/config' {
    interface HardhatUserConfig {
        uns?: {
            minters: MintersMap;
            multisig: Record<string, string | null>;
        };
        safe?: {
            txServiceUrls?: Record<number, string>;
        };
    }
    interface HardhatConfig {
        uns: {
            minters: MintersMap;
            multisig: Record<string, string>;
        };
        safe: {
            txServiceUrls: Record<number, string>;
        };
    }
    interface ProjectPathsUserConfig {
        flatArtifacts: string;
    }
    interface ProjectPathsConfig {
        flatArtifacts: string;
    }
}
import '@typechain/hardhat';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-verify';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomiclabs/hardhat-solhint';
import 'hardhat-tracer';
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import '@nomicfoundation/hardhat-ledger';
import 'hardhat-abi-exporter';
declare const config: HardhatUserConfig;
export default config;
//# sourceMappingURL=hardhat.config.d.ts.map