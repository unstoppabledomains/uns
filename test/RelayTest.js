const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Web3 = require('web3')

const RelayTest = artifacts.require('test-helpers/RelayTest.sol')
const expectRevert = require('./helpers/expectRevert.js')

chai.use(chaiAsPromised)
const {assert} = chai

contract.skip('RelayTest', ([coinbase]) => {
  let relayTest

  before(async () => {
    relayTest = await RelayTest.new({from: coinbase})
  })

  function getCallData(web3, method, ...params) {
    const abi = RelayTest.toJSON().abi.find(v => v.name === method)
    return web3.eth.abi.encodeFunctionCall(abi, params)
  }

  async function sign(web3, pk, ...params) {
    return web3.eth.accounts.sign(Web3.utils.soliditySha3(...params), pk)
  }

  async function calcSignature(web3, pk, data, address) {
    return await sign(
      web3,
      pk,
      {
        type: 'bytes32',
        value: Web3.utils.keccak256(data),
      },
      {
        type: 'address',
        value: address,
      },
    )
  }

  describe('Ganache', () => {
    it('revert get string', async () => {
      const web3 = new Web3(relayTest.constructor.web3.currentProvider)
      const abi = RelayTest.toJSON().abi.find(v => v.name === 'getString')
      const data = web3.eth.abi.encodeFunctionCall(abi, [0])

      await expectRevert(
        web3.eth.call(
          {
            to: relayTest.address,
            data,
          },
          'latest',
        ),
        'VM Exception while processing transaction: revert',
      )
    })
  })

  describe('Ropsten', () => {
    const to = '0xc13e670D7f74C6505792501B76B73227d008AA7d'
    const pKey = process.env.ROPSTEN_PRIVATE_KEY
    const web3 = new Web3(
      `https://ropsten.infura.io/v3/${process.env.INFURA_TEST_KEY}`,
    )

    const setString = async (key, value) => {
      const contract = new web3.eth.Contract(RelayTest.toJSON().abi, to)
      const setStringData = contract.methods.setString(key, value).encodeABI()
      const signedTx = await web3.eth.accounts.signTransaction(
        {
          to,
          data: setStringData,
          gas: 50000,
        },
        pKey,
      )
      const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)
      console.debug('tx', tx)
    }

    it('return same response(direct and relay) when get string revert', async () => {
      const data = getCallData(web3, 'getString', 0)
      const directCall = await web3.eth.call({to, data}, 'latest')
      console.log('directCall', directCall)

      const sig = await calcSignature(web3, pKey, data, to)
      const relayData = getCallData(web3, 'relay', data, sig.signature)
      const relayCall = await web3.eth.call({to, data: relayData}, 'latest')
      console.debug('relayCall', relayCall)

      assert.equal(directCall, relayCall)
    })

    it('return same response(direct and relay) when get uint revert', async () => {
      const data = getCallData(web3, 'getUint', 0)
      const directCall = await web3.eth.call({to, data}, 'latest')
      console.debug('directCall', directCall)

      const sig = await calcSignature(web3, pKey, data, to)
      const relayData = getCallData(web3, 'relay', data, sig.signature)
      const relayCall = await web3.eth.call({to, data: relayData}, 'latest')
      console.debug('directRelayCall', relayCall)

      assert.equal(directCall, relayCall)
    })

    it('return same response(direct and relay) when get string', async () => {
      // await setString(1, 'hello')

      const data = getCallData(web3, 'getString', 1)
      const directCall = await web3.eth.call({to, data}, 'latest')
      console.debug('directCall', directCall)

      const sig = await calcSignature(web3, pKey, data, to)
      const relayData = getCallData(web3, 'relay', data, sig.signature)
      const relayCall = await web3.eth.call({to, data: relayData}, 'latest')
      console.debug('relayCall', relayCall)

      const relayCallDecode = web3.eth.abi.decodeParameters(
        ['bytes'],
        relayCall,
      )
      assert.equal(directCall, relayCallDecode['0'])

      const decodedOutput = web3.eth.abi.decodeParameters(
        ['string'],
        relayCallDecode['0'],
      )
      assert.equal('hello', decodedOutput['0'])
    })
  })
})
