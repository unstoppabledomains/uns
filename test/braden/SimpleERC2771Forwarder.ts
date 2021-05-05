import { ethers } from 'hardhat';
import { expect } from 'chai';

import { SimpleERC2771Forwarder } from '../../build/types';
import { ERC2771FungibleToken } from '../../build/types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('SimpleERC2771Forwarder', () => {
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;
  before(`load accounts`, async () => {
    [account1, account2] = await ethers.getSigners();
  });

  let token: ERC2771FungibleToken;
  let forwarder: SimpleERC2771Forwarder;
  beforeEach(
    `deploy SimpleERC2771Forwarder and ERC2771FungibleToken contracts`,
    async () => {
      // Deploy forwarder

      const forwarderFactory = await ethers.getContractFactory(
        'SimpleERC2771Forwarder',
      );
      forwarder = (await forwarderFactory
        .connect(account1)
        .deploy()) as SimpleERC2771Forwarder;
      await forwarder.deployTransaction.wait();

      // Deploy token

      const tokenFactory = await ethers.getContractFactory(
        'ERC2771FungibleToken',
      );
      token = (await tokenFactory
        .connect(account1)
        .deploy(forwarder.address)) as ERC2771FungibleToken;
      await token.deployTransaction.wait();

      // Configure forwarder

      await forwarder.setRecipient(token.address);
    },
  );

  describe(`forward(...)`, () => {
    it(`should execute a batch of transactions`, async () => {
      async function forward(payload: string, account: SignerWithAddress) {
        const expiry = (Date.now() / 1000 + 10000).toFixed(0);
        const nonce = await forwarder.nonceOf(await account.getAddress());

        const domain = {
          chainId: await account.getChainId(),
          name: 'SimpleERC2771Forwarder',
          verifyingContract: forwarder.address,
        };

        const types = {
          SimpleERC2771ForwarderParams: [
            { name: 'payload', type: 'bytes' },
            { name: 'expiry', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
          ],
        };

        const value = {
          payload,
          expiry,
          nonce,
        };

        const { r, s, v } = ethers.utils.splitSignature(
          await account._signTypedData(domain, types, value),
        );

        return (await forwarder.forward(value, r, s, v)).wait();
      }

      const tx = await forward(
        token.interface.encodeFunctionData('executeBatch', [
          new Array(10).fill(token.interface.encodeFunctionData('mint', [100])),
        ]),
        account1,
      );

      // console.log(
      //   tx.events?.map((v) => {
      //     const log = token.interface.parseLog(v);
      //     return [log.signature, ...log.args];
      //   }),
      // );

      console.log('token:', token.address);
      console.log('forwarder:', forwarder.address);
      console.log('account1:', await account1.getAddress());

      console.log(
        'balance:',
        (await token.balanceOf(await account1.getAddress())).toNumber(),
      );
    });
  });
});
