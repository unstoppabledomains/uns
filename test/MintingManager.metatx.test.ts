import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { MintingManager, UNSRegistry } from '../types/contracts';
import { MintingManagerForwarder } from '../types/contracts/metatx';
import {
  MintingManager__factory,
  UNSRegistry__factory,
} from '../types/factories/contracts';
import { MintingManagerForwarder__factory } from '../types/factories/contracts/metatx';
import { buildExecuteFunc, ExecuteFunc } from './helpers/metatx';
import { ZERO_ADDRESS } from './helpers/constants';

describe('MintingManager (metatx)', () => {
  let unsRegistry: UNSRegistry,
    mintingManager: MintingManager,
    forwarder: MintingManagerForwarder,
    buildExecuteParams: ExecuteFunc;
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    receiver: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, receiver] = signers;
  });

  beforeEach(async () => {
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    mintingManager = (await upgrades.deployProxy(
      new MintingManager__factory(coinbase),
      [],
      { initializer: false },
    )) as MintingManager;
    await unsRegistry.initialize(mintingManager.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    forwarder = await new MintingManagerForwarder__factory(coinbase).deploy(
      mintingManager.address,
    );

    await mintingManager.initialize(
      unsRegistry.address,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      forwarder.address,
    );
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');

    buildExecuteParams = buildExecuteFunc(
      mintingManager.interface,
      mintingManager.address,
      forwarder,
    );
  });

  it('should mint through forwarder', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw11', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw11', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await forwarder.execute(req, signature);

    expect(await unsRegistry.ownerOf(tokenId)).to.be.equal(receiver.address);
  });

  it('should revert forwarding when forwarder not trusted', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw11', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw11', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await mintingManager.setForwarder(ZERO_ADDRESS);

    await expect(forwarder.execute(req, signature)).to.be.revertedWith(
      'MintingManager: CALLER_IS_NOT_MINTER',
    );
  });

  it('should revert execution when signature is not valid', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw1341', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw1341', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await expect(
      forwarder.execute({ ...req, from: receiver.address }, signature),
    ).to.be.revertedWith('MintingManagerForwarder: SIGNATURE_INVALID');
  });

  it('should revert execution when used signature', async () => {
    const tokenId = await unsRegistry.namehash(['test-qw1341', 'wallet']);
    const { req, signature } = await buildExecuteParams(
      'issueWithRecords(address,string[],string[],string[],bool)',
      [receiver.address, ['test-qw1341', 'wallet'], [], [], true],
      coinbase,
      tokenId,
    );

    await forwarder.execute(req, signature);

    await expect(forwarder.execute(req, signature)).to.be.revertedWith(
      'MintingManagerForwarder: SIGNATURE_INVALID',
    );
  });

  describe('Backfill reverse names though MintingManager (metatx)', () => {
    it('should backfill domain name', async () => {
      const labels = ['minting-manager-backfill-metatx', 'wallet'];
      const uri = labels.join('.');
      await mintingManager.issueWithRecords(receiver.address, labels, [], [], false);
      const tokenId = ethers.utils.namehash(labels.join('.'));
      await unsRegistry.connect(receiver)['setReverse(uint256)'](tokenId);
      expect(await unsRegistry.reverseNameOf(receiver.address)).to.be.eq('');

      const { req, signature } = await buildExecuteParams(
        'backfillReverseNames(string[][])',
        [[labels]],
        coinbase,
        0,
      );
      await forwarder.execute(req, signature);
      expect(await unsRegistry.reverseNameOf(receiver.address)).to.be.eq(uri);
    });

    it('should not allow backfilling from non-allowed address', async () => {
      const labels = ['minting-manager-backfill-metatx', 'wallet'];
      const { req, signature } = await buildExecuteParams(
        'backfillReverseNames(string[][])',
        [[labels]],
        receiver,
        0,
      );
      await expect(forwarder.execute(req, signature))
        .to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
    });

    it('should backfill multiple domain names', async () => {
      const domains = [
        ['minting-manager-multiple-backfill-metatx-1', 'x'],
        ['minting-manager-multiple-backfill-metatx-2', 'x'],
        ['minting-manager-multiple-backfill-metatx-3', 'x'],
      ];
      for (const labels of domains) {
        await mintingManager.issueWithRecords(receiver.address, labels, [], [], false);
        const tokenId =  ethers.utils.namehash(labels.join('.'));
        await unsRegistry.connect(receiver)['setReverse(uint256)'](tokenId);
        expect(await unsRegistry.reverseNameOf(receiver.address)).to.be.eq('');
      }
      const { req, signature } = await buildExecuteParams(
        'backfillReverseNames(string[][])',
        [domains],
        coinbase,
        0,
      );
      await forwarder.execute(req, signature);
      for (const labels of domains) {
        const uri = labels.join('.');
        const tokenId = ethers.utils.namehash(uri);
        await unsRegistry.connect(receiver)['setReverse(uint256)'](tokenId);
        expect(await unsRegistry.reverseNameOf(receiver.address)).to.be.eq(uri);
      }
    });
  });
});
