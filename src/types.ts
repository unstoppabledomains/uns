export enum ArtifactName {
  CNSRegistry = 'CNSRegistry',
  CNSRegistryForwarder = 'CNSRegistryForwarder',
  SignatureController = 'SignatureController',
  MintingController = 'MintingController',
  URIPrefixController = 'URIPrefixController',
  Resolver = 'Resolver',
  ResolverForwarder = 'ResolverForwarder',
  UNSRegistry = 'UNSRegistry',
  MintingManager = 'MintingManager',
  UNSOperator = 'UNSOperator',
  MintingManagerForwarder = 'MintingManagerForwarder',
  ProxyReader = 'ProxyReader',
  DummyStateSender = 'DummyStateSender',
  CheckpointManager = 'SimpleCheckpointManager',
  MintableERC721Predicate = 'MintableERC721Predicate',
  RootChainManager = 'RootChainManager',
  DotCoinBurner = 'DotCoinBurner',
}

export enum UnsContractName {
  UNSRegistry = 'UNSRegistry',
  CNSRegistry = 'CNSRegistry',
  MintingManager = 'MintingManager',
  UNSOperator = 'UNSOperator',
  ProxyAdmin = 'ProxyAdmin',
  SignatureController = 'SignatureController',
  MintingController = 'MintingController',
  WhitelistedMinter = 'WhitelistedMinter',
  URIPrefixController = 'URIPrefixController',
  DomainZoneController = 'DomainZoneController',
  Resolver = 'Resolver',
  ProxyReader = 'ProxyReader',
  TwitterValidationOperator = 'TwitterValidationOperator',
  FreeMinter = 'FreeMinter',
  MintableERC721Predicate = 'MintableERC721Predicate',
  RootChainManager = 'RootChainManager',
  DotCoinBurner = 'DotCoinBurner',
}

export type UnsContractConfig = {
  address: string,
  legacyAddresses: string[],
  deploymentBlock: string,
  implementation?: string,
  forwarder?: string,
  deprecated?: boolean;
}

export type UnsNetworkConfig = {
  contracts: UnsContractConfigMap
}

export type UnsContractConfigMap = {
  [k in UnsContractName]: UnsContractConfig
}

export type UnsConfig = {
  version?: string;
  networks: {
    [chainId: number]: UnsNetworkConfig
  };
}

export type DependenciesMap = {
  [k in ArtifactName]?: UnsContractConfig
}
