import { HardhatUserConfig } from 'hardhat/types/config';
declare type MintersMap = Record<string, string[]>;
declare module 'hardhat/types/config' {
    interface HardhatUserConfig {
        uns?: {
            minters: MintersMap;
        };
    }
    interface HardhatConfig {
        uns: {
            minters: MintersMap;
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
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-solhint';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import 'hardhat-abi-exporter';
declare const config: HardhatUserConfig;
export default config;
//# sourceMappingURL=hardhat.config.d.ts.map