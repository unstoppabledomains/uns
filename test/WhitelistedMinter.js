const { BigNumber } = require('@ethersproject/bignumber');
const { ZERO_ADDRESS } = require('./helpers/constants');

const Registry = artifacts.require('registry/Registry.sol')
const WhitelistedMinter = artifacts.require('util/WhitelistedMinter.sol')
const {sign} = require('./helpers/signature.js')

contract('WhitelistedMinter', function([coinbase, faucet, ...accounts]) {
  let whitelistedMinter, registry, root;

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

  beforeEach(async () => {
    root = BigNumber.from('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');

    registry = await Registry.new();
    whitelistedMinter = await WhitelistedMinter.new(registry.address);
    await whitelistedMinter.addWhitelisted(coinbase);

    await registry.initialize(whitelistedMinter.address);
    await whitelistedMinter.mint();
  })

  describe.skip('renounce minter', () => {
    it('revert when renouncing by non-admin', async () => {
      await expect(
        whitelistedMinter.renounceMinter({from: accounts[0]})
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_ADMIN');
    })

    it('revert minting when minter has been renounced', async () => {
      await whitelistedMinter.renounceMinter({from: coinbase})

      await expect(
        whitelistedMinter.safeMintSLD(coinbase, 'label')
      ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
    })
  })

  describe('close whitelisted account', () => {
    it('revert when closing by non-whitelisted account', async () => {
      await expect(
        whitelistedMinter.closeWhitelisted(accounts[0], {from: accounts[0]})
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
    })

    it('revert when zero account', async () => {
      await expect(
        whitelistedMinter.closeWhitelisted(ZERO_ADDRESS, {from: coinbase})
      ).to.be.revertedWith('WhitelistedMinter: RECEIVER_IS_EMPTY');
    })

    it('close whitelisted without forwarding funds', async () => {
      const initBalance = await web3.eth.getBalance(faucet)

      await whitelistedMinter.closeWhitelisted(faucet, {
        from: coinbase,
        value: 0,
      })

      await expect(
        whitelistedMinter.safeMintSLD(coinbase, 'label')
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');

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

      await expect(
        whitelistedMinter.safeMintSLD(coinbase, 'label')
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');

      const actualBalance = await web3.eth.getBalance(faucet)
      const expectedBalance = BigNumber.from(initBalance).add(value)
      assert.equal(actualBalance, expectedBalance)
    })
  })

  describe('rotate whitelisted account', () => {
    it('revert when rotateing by non-whitelisted account', async () => {
      await expect(
        whitelistedMinter.rotateWhitelisted(accounts[0], {from: accounts[0]})
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
    })

    it('revert when zero account', async () => {
      await expect(
        whitelistedMinter.rotateWhitelisted(ZERO_ADDRESS, {from: coinbase})
      ).to.be.revertedWith('WhitelistedMinter: RECEIVER_IS_EMPTY');
    })

    it('rotate whitelisted without defining value', async () => {
      const [receiver] = accounts
      const initBalance = await web3.eth.getBalance(receiver)

      await whitelistedMinter.rotateWhitelisted(receiver, {from: coinbase})

      await expect(
        whitelistedMinter.safeMintSLD(coinbase, 'label')
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');

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

      await expect(
        whitelistedMinter.safeMintSLD(coinbase, 'label')
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');

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

      await expect(
        whitelistedMinter.safeMintSLD(coinbase, 'label')
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');

      const actualBalance = await web3.eth.getBalance(receiver)
      const expectedBalance = BigNumber.from(initBalance).add(value)
      assert.equal(actualBalance, expectedBalance.toString())
    })
  })

  describe('mint second level domain', () => {
    it('revert minting when account is not whitelisted', async () => {
      await expect(
        whitelistedMinter.mintSLD(coinbase, 'test-1ka', {
          from: accounts[0],
        })
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
    })

    it('mint domain', async () => {
      await whitelistedMinter.mintSLD(coinbase, 'test-1dp')
      const tokenId = await registry.childIdOf(root, 'test-1dp')
      assert.equal(await registry.ownerOf(tokenId), coinbase)
    })
  })

  describe('safe mint second level domain', () => {
    it('revert safe minting when account is not whitelisted', async () => {
      const funcSig = 'safeMintSLD(address,string)';
      await expect(
        whitelistedMinter.methods[funcSig](coinbase, 'test-2oa', {
          from: accounts[0],
        })
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
    })

    it('safe mint domain', async () => {
      await whitelistedMinter.safeMintSLD(coinbase, 'test-2oa')
      const tokenId = await registry.childIdOf(root, 'test-2oa')
      assert.equal(await registry.ownerOf(tokenId), coinbase)
    })
  })

  describe('safe mint(data) second level domain', () => {
    it('revert safe minting when account is not whitelisted', async () => {
      const funcSig = 'safeMintSLD(address,string,bytes)';
      await expect(
        whitelistedMinter.methods[funcSig](coinbase, 'test-3oa', '0x', {
          from: accounts[0],
        })
      ).to.be.revertedWith('WhitelistedRole: CALLER_IS_NOT_WHITELISTED');
    })

    it('safe mint domain', async () => {
      const funcSig = 'safeMintSLD(address,string,bytes)'
      await whitelistedMinter.methods[funcSig](coinbase, 'test-3oa', '0x')

      const tokenId = await registry.childIdOf(root, 'test-3oa')
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

      await expect(
        whitelistedMinter.relay(data, signature, {
          from: accounts[0],
        })
      ).to.be.revertedWith('WhitelistedMinter: SIGNER_IS_NOT_WHITELISTED');
    })

    it('revert relay meta-mint when signature is empty', async () => {
      const data = getCallData(
        whitelistedMinter,
        'mintSLD(address,string)',
        accounts[0],
        'test-p1-revert',
      )

      await expect(
        whitelistedMinter.relay(data, '0x', {
          from: accounts[0],
        })
      ).to.be.revertedWith('ECDSA: invalid signature length');
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

      const tokenId = await registry.childIdOf(root, 'test-p1-p1sapr')
      
      assert.equal(await registry.ownerOf(tokenId), accounts[0]);
      // expectEvent(receipt, 'Relayed', {
      //   sender: accounts[1],
      //   signer: coinbase,
      //   funcSig:
      //     '0xb2da297900000000000000000000000000000000000000000000000000000000',
      //   dataHash: Web3.utils.keccak256(data),
      // })
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

      const tokenId = await registry.childIdOf(root, 'test-p1-p1saor')
      assert.equal(await registry.ownerOf(tokenId), accounts[0])
      // expectEvent(receipt, 'Relayed', {
      //   sender: accounts[1],
      //   signer: coinbase,
      //   funcSig:
      //     '0xbe362e2e00000000000000000000000000000000000000000000000000000000',
      //   dataHash: Web3.utils.keccak256(data),
      // })
    })

    it('relay meta-mint with records', async () => {
      const data = getCallData(
        whitelistedMinter,
        'mintSLDWithRecords(address,string,string[],string[])',
        accounts[0],
        'test-p1-p1adr',
        [],
        [],
      )
      const signature = await calcSignature(data)
      const receipt = await whitelistedMinter.relay(data, signature, {
        from: accounts[1],
      })

      const tokenId = await registry.childIdOf(root, 'test-p1-p1adr')
      assert.equal(await registry.ownerOf(tokenId), accounts[0])
      // expectEvent(receipt, 'Relayed', {
      //   sender: accounts[1],
      //   signer: coinbase,
      //   funcSig:
      //     '0x3d7989fe00000000000000000000000000000000000000000000000000000000',
      //   dataHash: Web3.utils.keccak256(data),
      // })
    })
  })

  describe('Gas consumption', () => {
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
