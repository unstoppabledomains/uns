export declare enum ArtifactName {
    CNSRegistry = "CNSRegistry",
    CNSRegistryForwarder = "CNSRegistryForwarder",
    SignatureController = "SignatureController",
    MintingController = "MintingController",
    URIPrefixController = "URIPrefixController",
    Resolver = "Resolver",
    ResolverForwarder = "ResolverForwarder",
    UNSRegistry = "UNSRegistry",
    MintingManager = "MintingManager",
    MintingManagerForwarder = "MintingManagerForwarder",
    ProxyReader = "ProxyReader",
    DummyStateSender = "DummyStateSender",
    CheckpointManager = "SimpleCheckpointManager",
    MintableERC721Predicate = "MintableERC721Predicate",
    RootChainManager = "RootChainManager",
    DotCoinBurner = "DotCoinBurner"
}
export declare enum UnsContractName {
    UNSRegistry = "UNSRegistry",
    CNSRegistry = "CNSRegistry",
    MintingManager = "MintingManager",
    ProxyAdmin = "ProxyAdmin",
    SignatureController = "SignatureController",
    MintingController = "MintingController",
    WhitelistedMinter = "WhitelistedMinter",
    URIPrefixController = "URIPrefixController",
    DomainZoneController = "DomainZoneController",
    Resolver = "Resolver",
    ProxyReader = "ProxyReader",
    TwitterValidationOperator = "TwitterValidationOperator",
    FreeMinter = "FreeMinter",
    MintableERC721Predicate = "MintableERC721Predicate",
    RootChainManager = "RootChainManager",
    DotCoinBurner = "DotCoinBurner"
}
export declare type UnsContractConfig = {
    address: string;
    legacyAddresses: string[];
    deploymentBlock: string;
    implementation?: string;
    forwarder?: string;
    deprecated?: boolean;
};
export declare type UnsNetworkConfig = {
    contracts: UnsContractConfigMap;
};
export declare type UnsContractConfigMap = {
    [k in UnsContractName]: UnsContractConfig;
};
export declare type UnsConfig = {
    version?: string;
    networks: {
        [chainId: number]: UnsNetworkConfig;
    };
};
export declare type DependenciesMap = {
    [k in ArtifactName]?: UnsContractConfig;
};
//# sourceMappingURL=types.d.ts.map