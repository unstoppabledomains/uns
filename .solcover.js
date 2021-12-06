module.exports = {
  skipFiles: [
    'mocks/ERC721ReceiverMock.sol',
    'mocks/LinkTokenMock.sol',
    'mocks/BaseForwarderMock.sol',
    'mocks/BaseRoutingForwarderMock.sol',
    'mocks/MinterRoleMock.sol',
    '@maticnetwork/pos-portal/MintableERC721Predicate.sol',
    '@maticnetwork/pos-portal/RootChainManager.sol',
    '@maticnetwork/pos-portal/DummyStateSender.sol',
    '@maticnetwork/CustomMintableERC721Predicate.sol',
    '@maticnetwork/IRootChainManager.sol',
    '@maticnetwork/RootChainManagerStorage.sol',
  ],
}
