module.exports = {
  skipFiles: [
    'mocks/ERC721ReceiverMock.sol',
    'mocks/LinkTokenMock.sol',
    'mocks/BaseForwarderMock.sol',
    'mocks/BaseRoutingForwarderMock.sol',
    'mocks/MinterRoleMock.sol',
    'mocks/ERC1271SmartWalletMock.sol',
    '@maticnetwork/pos-portal/DummyStateSender.sol',
    '@maticnetwork/pos-portal/MintableERC721Predicate.sol',
    '@maticnetwork/pos-portal/MockCheckpointManager.sol',
    '@maticnetwork/pos-portal/RootChainManager.sol',
    '@maticnetwork/IChildToken.sol',
    '@maticnetwork/IMintableERC721.sol',
    '@maticnetwork/IRootChainManager.sol',
    '@maticnetwork/RootChainManagerStorage.sol',
    'utils/MultiSend.sol'
  ],
}
