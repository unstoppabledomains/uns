describe('RelayMock', () => {
  let RelayMock
  let relayMock

  before(async () => {
    RelayMock = await ethers.getContractFactory('RelayMock');
    relayMock = await RelayMock.deploy()
  })

  it('revert get string', async () => {
    const data = relayMock.interface.encodeFunctionData('getString', [0])

    await expect(
      web3.eth.call(
        {
          to: relayMock.address,
          data,
        },
        'latest',
      )
    ).to.be.revertedWith('Transaction reverted without a reason');
  })
})
