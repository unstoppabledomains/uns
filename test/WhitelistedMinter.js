const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');

const Registry = artifacts.require('registry/Registry.sol')
const MintingController = artifacts.require('controller/MintingController.sol')
const WhitelistedMinter = artifacts.require('util/WhitelistedMinter.sol')
const {sign} = require('./helpers/signature.js')

const { ZERO_ADDRESS } = constants;

contract('WhitelistedMinter', function([coinbase, faucet, ...accounts]) {
  let whitelistedMinter, registry, mintingController

  const getCallData = (contract, funcSig, ...args) => {
    const web3 = new Web3(contract.constructor.web3.currentProvider)
    let encodedFunctionSig = web3.eth.abi.encodeFunctionSignature(funcSig)
    const abi = contract.constructor._json.abi.find(
      v => v.signature === encodedFunctionSig,
    )
    return web3.eth.abi.encodeFunctionCall(abi, args)
  }

  const calcSignature = async (data, address, from) => {
    address = address || whitelistedMinter.address
    from = from || coinbase

    return await sign(
      from,
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

  before(async () => {
    registry = await Registry.new()
    mintingController = await MintingController.new(registry.address)
    await registry.addController(mintingController.address)
  })

  beforeEach(async () => {
    whitelistedMinter = await WhitelistedMinter.new(mintingController.address)
    await whitelistedMinter.addWhitelisted(coinbase)

    await mintingController.addMinter(whitelistedMinter.address)
  })

  describe('renounce minter', () => {
    it('revert when renouncing by non-admin', async () => {
      await expectRevert(
        whitelistedMinter.renounceMinter({from: accounts[0]}),
        'WhitelistedRole: CALLER_IS_NOT_ADMIN',
      )
    })

    it('revert minting when minter has been renounced', async () => {
      await whitelistedMinter.renounceMinter({from: coinbase})

      await expectRevert(
        whitelistedMinter.safeMintSLD(coinbase, 'label'),
        'MinterRole: CALLER_IS_NOT_MINTER',
      )
    })
  })

  describe('close whitelisted account', () => {
    it('revert when closing by non-whitelisted account', async () => {
      await expectRevert(
        whitelistedMinter.closeWhitelisted(accounts[0], {from: accounts[0]}),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )
    })

    it('revert when zero account', async () => {
      await expectRevert(
        whitelistedMinter.closeWhitelisted(ZERO_ADDRESS, {from: coinbase}),
        'WhitelistedMinter: RECEIVER_IS_EMPTY',
      )
    })

    it('close whitelisted without forwarding funds', async () => {
      const initBalance = await web3.eth.getBalance(faucet)

      await whitelistedMinter.closeWhitelisted(faucet, {
        from: coinbase,
        value: 0,
      })

      await expectRevert(
        whitelistedMinter.safeMintSLD(coinbase, 'label'),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )

      const actualBalance = await web3.eth.getBalance(faucet)
      assert.equal(actualBalance, initBalance)
    })

    it('close whitelisted with forwarding funds', async () => {
      const value = 1
      const initBalance = await web3.eth.getBalance(faucet)

      await whitelistedMinter.closeWhitelisted(faucet, {
        from: coinbase,
        value,
      })

      await expectRevert(
        whitelistedMinter.safeMintSLD(coinbase, 'label'),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )

      const actualBalance = await web3.eth.getBalance(faucet)
      const expectedBalance = new BN(initBalance).add(new BN(value))
      assert.equal(actualBalance, expectedBalance)
    })
  })

  describe('rotate whitelisted account', () => {
    it('revert when rotateing by non-whitelisted account', async () => {
      await expectRevert(
        whitelistedMinter.rotateWhitelisted(accounts[0], {from: accounts[0]}),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )
    })

    it('revert when zero account', async () => {
      await expectRevert(
        whitelistedMinter.rotateWhitelisted(ZERO_ADDRESS, {from: coinbase}),
        'WhitelistedMinter: RECEIVER_IS_EMPTY',
      )
    })

    it('rotate whitelisted without defining value', async () => {
      const [receiver] = accounts
      const initBalance = await web3.eth.getBalance(receiver)

      await whitelistedMinter.rotateWhitelisted(receiver, {from: coinbase})

      await expectRevert(
        whitelistedMinter.safeMintSLD(coinbase, 'label'),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )

      const actualBalance = await web3.eth.getBalance(receiver)
      assert.equal(actualBalance, initBalance)
    })

    it('rotate whitelisted without forwarding funds', async () => {
      const [receiver] = accounts
      const initBalance = await web3.eth.getBalance(receiver)

      await whitelistedMinter.rotateWhitelisted(receiver, {
        from: coinbase,
        value: 0,
      })

      await expectRevert(
        whitelistedMinter.safeMintSLD(coinbase, 'label'),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )

      const actualBalance = await web3.eth.getBalance(receiver)
      assert.equal(actualBalance, initBalance)
    })

    it('rotate whitelisted with forwarding funds', async () => {
      const value = 3
      const [receiver] = accounts
      const initBalance = await web3.eth.getBalance(receiver)

      await whitelistedMinter.rotateWhitelisted(receiver, {
        from: coinbase,
        value,
      })

      await expectRevert(
        whitelistedMinter.safeMintSLD(coinbase, 'label'),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )

      const actualBalance = await web3.eth.getBalance(receiver)
      const expectedBalance = new BN(initBalance).add(new BN(value))
      assert.equal(actualBalance, expectedBalance.toString())
    })
  })

  describe('mint second level domain', () => {
    it('revert minting when account is not whitelisted', async () => {
      await expectRevert(
        whitelistedMinter.mintSLD(coinbase, 'test-1ka', {
          from: accounts[0],
        }),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )
    })

    it('mint domain', async () => {
      await whitelistedMinter.mintSLD(coinbase, 'test-1dp')
      const tokenId = await registry.childIdOf(
        await registry.root(),
        'test-1dp',
      )
      assert.equal(await registry.ownerOf(tokenId), coinbase)
    })
  })

  describe('safe mint second level domain', () => {
    it('revert safe minting when account is not whitelisted', async () => {
      const funcSig = 'safeMintSLD(address,string)'
      await expectRevert(
        whitelistedMinter.methods[funcSig](coinbase, 'test-2oa', {
          from: accounts[0],
        }),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )
    })

    it('safe mint domain', async () => {
      await whitelistedMinter.safeMintSLD(coinbase, 'test-2oa')
      const tokenId = await registry.childIdOf(
        await registry.root(),
        'test-2oa',
      )
      assert.equal(await registry.ownerOf(tokenId), coinbase)
    })
  })

  describe('safe mint(data) second level domain', () => {
    it('revert safe minting when account is not whitelisted', async () => {
      const funcSig = 'safeMintSLD(address,string,bytes)'
      await expectRevert(
        whitelistedMinter.methods[funcSig](coinbase, 'test-3oa', '0x', {
          from: accounts[0],
        }),
        'WhitelistedRole: CALLER_IS_NOT_WHITELISTED',
      )
    })

    it('safe mint domain', async () => {
      const funcSig = 'safeMintSLD(address,string,bytes)'
      await whitelistedMinter.methods[funcSig](coinbase, 'test-3oa', '0x')

      const tokenId = await registry.childIdOf(
        await registry.root(),
        'test-3oa',
      )
      assert.equal(await registry.ownerOf(tokenId), coinbase)
    })
  })

  describe('relay', () => {
    it('revert relay meta-mint when signer is not whitelisted', async () => {
      const data = getCallData(
        whitelistedMinter,
        'mintSLD(address,string)',
        accounts[0],
        'test-p1-revert',
      )
      const signature = await calcSignature(data, faucet)

      await expectRevert(
        whitelistedMinter.relay(data, signature, {
          from: accounts[0],
        }),
        'WhitelistedMinter: SIGNER_IS_NOT_WHITELISTED',
      )
    })

    it('revert relay meta-mint when signature is empty', async () => {
      const data = getCallData(
        whitelistedMinter,
        'mintSLD(address,string)',
        accounts[0],
        'test-p1-revert',
      )

      await expectRevert(
        whitelistedMinter.relay(data, '0x', {
          from: accounts[0],
        }),
        'ECDSA: invalid signature length',
      )
    })

    it('relay meta-safe mint', async () => {
      const data = getCallData(
        whitelistedMinter,
        'safeMintSLD(address,string)',
        accounts[0],
        'test-p1-p1sapr',
      )
      const signature = await calcSignature(data)
      const receipt = await whitelistedMinter.relay(data, signature, {
        from: accounts[1],
      })

      const tokenId = await registry.childIdOf(
        await registry.root(),
        'test-p1-p1sapr',
      )
      assert.equal(await registry.ownerOf(tokenId), accounts[0])
      expectEvent(receipt, 'Relayed', {
        sender: accounts[1],
        signer: coinbase,
        funcSig:
          '0xb2da297900000000000000000000000000000000000000000000000000000000',
        dataHash: Web3.utils.keccak256(data),
      })
    })

    it('relay meta-safe mint with data', async () => {
      const data = getCallData(
        whitelistedMinter,
        'safeMintSLD(address,string,bytes)',
        accounts[0],
        'test-p1-p1saor',
        '0x',
      )
      const signature = await calcSignature(data)
      const receipt = await whitelistedMinter.relay(data, signature, {
        from: accounts[1],
      })

      const tokenId = await registry.childIdOf(
        await registry.root(),
        'test-p1-p1saor',
      )
      assert.equal(await registry.ownerOf(tokenId), accounts[0])
      expectEvent(receipt, 'Relayed', {
        sender: accounts[1],
        signer: coinbase,
        funcSig:
          '0xbe362e2e00000000000000000000000000000000000000000000000000000000',
        dataHash: Web3.utils.keccak256(data),
      })
    })
  })

  describe('Gas consumption', () => {
    const keys1 = ['test-key1']
    const keys2 = [...keys1, 'test-key2']
    const keys5 = [...keys2, 'test-key3', 'test-key4', 'test-key5']
    const keys10 = [
      ...keys5,
      'test-key6',
      'test-key7',
      'test-key8',
      'test-key9',
      'test-key10',
    ]
    const values1 = ['test-value1']
    const values2 = [...values1, 'test-value2']
    const values5 = [...values2, 'test-value3', 'test-value4', 'test-value5']
    const values10 = [
      ...values5,
      'test-value6',
      'test-value7',
      'test-value8',
      'test-value9',
      'test-value10',
    ]

    function percDiff(a, b) {
      return -((a - b) / a) * 100
    }

    const getCases = () => {
      return [
        {
          func: 'mintSLD',
          funcSig: 'mintSLD(address,string)',
          params: [accounts[0], 't1-w1-'],
        },
        {
          func: 'safeMintSLD',
          funcSig: 'safeMintSLD(address,string)',
          params: [accounts[0], 't1-m1-'],
        },
        {
          func: 'safeMintSLD',
          funcSig: 'safeMintSLD(address,string,bytes)',
          params: [accounts[0], 't1-y1-', '0x'],
        },
      ]
    }

    it('Consumption', async () => {
      const result = []

      const cases = getCases()
      for (let i = 0; i < cases.length; i++) {
        const {func, funcSig, params} = cases[i]
        const [acc, token, ...rest] = params
        const relayParams = [acc, token + 'r', ...rest]

        const callData = getCallData(whitelistedMinter, funcSig, ...relayParams)
        const signature = await calcSignature(callData)
        const {receipt: relayReceipt} = await whitelistedMinter.relay(
          callData,
          signature,
          {
            from: accounts[1],
          },
        )

        const tx = await whitelistedMinter[func](...params)
        result.push({
          funcSig,
          records: Array.isArray(params[2]) ? params[2].length : '-',
          send: tx.receipt.gasUsed,
          relay: relayReceipt.gasUsed,
          increase:
            percDiff(tx.receipt.gasUsed, relayReceipt.gasUsed).toFixed(2) +
            ' %',
        })
      }
      console.table(result)
    })
  })
})
