import { ethers } from 'hardhat';

import { BradenRegistry } from '../../build/types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('BradenRecords', () => {
  let account1: SignerWithAddress;
  let account2: SignerWithAddress;
  before(`load accounts`, async () => {
    [account1, account2] = await ethers.getSigners();
  });

  let registry: BradenRegistry;
  beforeEach(`deploy BradenRegistry contract`, async () => {
    const registryFactory = await ethers.getContractFactory('BradenRegistry');

    registry = (await registryFactory
      .connect(account1)
      .deploy('0x1234567890123456789012345678901234567890')) as BradenRegistry;

    await registry.deployTransaction.wait();
  });

  describe(`newPreset(...)/setPreset(...)/usePreset(...)`, () => {
    it(`should work`, async () => {
      const payloads: string[] = [];

      const tokenId = 1;
      const tokenId2 = 2;
      const presetId = 1;

      payloads.push(
        registry.interface.encodeFunctionData('mint', [tokenId]),
        registry.interface.encodeFunctionData('newOwnedPreset', [
          presetId,
          await account1.getAddress(),
        ]),
        registry.interface.encodeFunctionData('setOwnedPreset', [
          presetId,
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          [
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine',
            'ten',
          ],
        ]),
        registry.interface.encodeFunctionData('useOwnedPreset', [
          tokenId,
          presetId,
        ]),

        // Negligible cost to add additional names.
        registry.interface.encodeFunctionData('mint', [2]),
        registry.interface.encodeFunctionData('useOwnedPreset', [2, presetId]),
        registry.interface.encodeFunctionData('mint', [3]),
        registry.interface.encodeFunctionData('useOwnedPreset', [3, presetId]),
      );

      const presetTx = await registry.connect(account1).executeBatch(payloads);

      console.log('presetTx:', (await presetTx.wait()).gasUsed.toNumber());

      console.log(
        `get(${tokenId}) ->`,
        await registry.getMany(tokenId, [1, 2, 3, 4, 5]),
      );
    });

    // it('should work too', async () => {
    //   const allInOneTx = await registry.allInOne(
    //     1,
    //     1,
    //     [1, 2, 3, 4, 5],
    //     ['one', 'two', 'three', 'four', 'five'],
    //   )

    //   console.log('allInOneTx:', (await allInOneTx.wait()).gasUsed.toNumber())
    // })
  });
});
