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
  // ENS
  ENSRegistry = 'ENSRegistry',
  BaseRegistrarImplementation = 'BaseRegistrarImplementation',
  ReverseRegistrar = 'ReverseRegistrar',
  NameWrapper = 'NameWrapper',
  DummyOracle = 'DummyOracle',
  StablePriceOracle = 'StablePriceOracle',
  ETHRegistrarController = 'ETHRegistrarController',
  PublicResolver = 'PublicResolver',
  ENSCustody = 'ENSCustody',
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

export enum EnsContractName {
  ENSRegistry = 'ENSRegistry',
  BaseRegistrarImplementation = 'BaseRegistrarImplementation',
  ReverseRegistrar = 'ReverseRegistrar',
  NameWrapper = 'NameWrapper',
  DummyOracle = 'DummyOracle',
  StablePriceOracle = 'StablePriceOracle',
  ETHRegistrarController = 'ETHRegistrarController',
  PublicResolver = 'PublicResolver',
  ENSCustody = 'ENSCustody',
}

export type ContractName = EnsContractName | UnsContractName;

export type ContractConfig = {
  address: string,
  legacyAddresses: string[],
  deploymentBlock: string,
  implementation?: string,
  forwarder?: string,
  deprecated?: boolean;
}

export type NsNetworkConfig = {
  contracts: ContractConfigMap
}

export type ContractConfigMap = {
  [k in ContractName]: ContractConfig
}

export type NsConfig = {
  version?: string;
  networks: {
    [chainId: number]: NsNetworkConfig
  };
}

export type DependenciesMap = {
  [k in ArtifactName]?: ContractConfig
}
