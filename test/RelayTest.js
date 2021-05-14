describe('RelayTest', () => {
  let RelayTest
  let relayTest

  before(async () => {
    RelayTest = await ethers.getContractFactory('RelayTest');
    relayTest = await RelayTest.deploy()
  })

  it('revert get string', async () => {
    const data = relayTest.interface.encodeFunctionData('getString', [0])

    await expect(
      web3.eth.call(
        {
          to: relayTest.address,
          data,
        },
        'latest',
      )
    ).to.be.revertedWith('Transaction reverted without a reason');
  })
})
