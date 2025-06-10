/**
 * values are paths the specific contracts
 */
export enum ArtifactName {
  CNSRegistry = 'CNSRegistry',
  CNSRegistryForwarder = 'CNSRegistryForwarder',
  SignatureController = 'SignatureController',
  MintingController = 'MintingController',
  URIPrefixController = 'URIPrefixController',
  Resolver = 'dot-crypto/contracts/Resolver.sol:Resolver',
  ResolverForwarder = 'ResolverForwarder',
  UNSRegistry = 'UNSRegistry',
  MintingManager = 'MintingManager',
  UNSOperator = 'UNSOperator',
  MintingManagerForwarder = 'MintingManagerForwarder',
  ProxyReader = 'contracts/ProxyReader.sol:ProxyReader',
  DummyStateSender = 'DummyStateSender',
  CheckpointManager = 'SimpleCheckpointManager',
  MintableERC721Predicate = 'MintableERC721Predicate',
  RootChainManager = 'RootChainManager',
  DotCoinBurner = 'DotCoinBurner',
  ZilliqaRecover = 'ZilliqaRecover',
  Seaport = 'Seaport',
  SeaportProxyBuyer = 'SeaportProxyBuyer',
  RegistrarCustody = 'RegistrarCustody',
  ConduitController = 'ConduitController',
  USDC = 'USDC',
  Muticall3 = 'Multicall3',
  Faucet = 'Faucet',
  Worker = 'Worker',

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
  LegacyENSRegistry = 'LegacyENSRegistry',
  LegacyETHRegistrarController = 'LegacyETHRegistrarController',
  DNSRegistrar = 'DNSRegistrar',
  DNSSECImpl = 'DNSSECImpl',
  TLDPublicSuffixList = 'TLDPublicSuffixList',
  RSASHA256Algorithm = 'RSASHA256Algorithm',
  DummyAlgorithm = 'DummyAlgorithm',
  SHA1Digest = 'SHA1Digest',
  SHA256Digest = 'SHA256Digest',
  SHA1NSEC3Digest = 'SHA1NSEC3Digest',
  Root = 'Root',
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
  ZilliqaRecover = 'ZilliqaRecover',
  Seaport = 'Seaport',
  SeaportProxyBuyer = 'SeaportProxyBuyer',
  RegistrarCustody = 'RegistrarCustody',
  USDC = 'USDC',
  Multicall3 = 'Multicall3',
  L1GasPriceOracle = 'L1GasPriceOracle',
  Faucet = 'Faucet',
  Worker = 'Worker',
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
  LegacyENSRegistry = 'LegacyENSRegistry',
  LegacyETHRegistrarController = 'LegacyETHRegistrarController',
  DNSRegistrar = 'DNSRegistrar',
  DNSSECImpl = 'DNSSECImpl',
  Root = 'Root',
}

export type ContractName = EnsContractName | UnsContractName;

export type ContractConfig = {
  address: string;
  legacyAddresses: string[];
  deploymentBlock: string;
  implementation?: string;
  forwarder?: string;
  deprecated?: boolean;
};

export type NsNetworkConfig = {
  contracts: ContractConfigMap;
};

export type ContractConfigMap = {
  [k in ContractName]: ContractConfig;
};

export type NsConfig = {
  version?: string;
  networks: {
    [chainId: number]: NsNetworkConfig;
  };
};

export type DependenciesMap = {
  [k in ArtifactName]?: ContractConfig;
};
