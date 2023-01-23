import debug from 'debug';
import { Contract, ContractFactory } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { NetworkConfig } from 'hardhat/types';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { ArtifactName, UnsConfig, UnsNetworkConfig, UnsContractName } from './types';
declare type DeployerOptions = {
    basePath: string;
    proxy: boolean;
};
declare type DeployConfig = {
    contracts: {
        [k in ArtifactName]: {
            address: string;
            legacyAddresses: string[];
            deploymentBlock: string;
            implementation: string;
            forwarder: string;
            transaction: TransactionResponse;
        };
    };
};
declare type AccountsMap = Record<string, SignerWithAddress>;
declare type ArtifactsMap = {
    [k in ArtifactName]: ContractFactory;
};
export declare class Deployer {
    options: DeployerOptions;
    artifacts: ArtifactsMap;
    accounts: AccountsMap;
    log: debug.Debugger;
    minters: string[];
    multisig: string;
    network: NetworkConfig;
    static create(options?: DeployerOptions): Promise<Deployer>;
    constructor(options: DeployerOptions, artifacts: ArtifactsMap, accounts: AccountsMap, minters: string[], multisig: string);
    execute(tags: string[], config?: UnsNetworkConfig, params?: Record<string, string>): Promise<UnsConfig>;
    getNetworkConfig(): UnsConfig;
    getDeployConfig(): DeployConfig;
    saveContractConfig(name: UnsContractName, contract: Contract, implAddress?: string, forwarder?: Contract): Promise<void>;
    saveForwarderConfig(name: UnsContractName, contract: Contract): Promise<void>;
    _saveConfig(config: unknown): Promise<void>;
}
export {};
//# sourceMappingURL=deployer.d.ts.map