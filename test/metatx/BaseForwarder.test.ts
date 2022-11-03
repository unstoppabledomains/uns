import { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumber, Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BaseForwarderMock } from '../../types/contracts/mocks';
import { BaseForwarderMock__factory } from '../../types/factories/contracts/mocks';
import { ERC1271SimpleWallet } from '../../types/contracts/utils';
import { ERC1271SimpleWallet__factory } from '../../types/factories/contracts/utils';
import { buildExecuteFunc, ExecuteFunc } from './../helpers/metatx';

describe('BaseForwarder', () => {
  let forwarder: BaseForwarderMock;
  let signers: SignerWithAddress[], owner: SignerWithAddress, account: SignerWithAddress;

  let simpleWallet: ERC1271SimpleWallet;
  let mockWallet: Contract;

  let buildExecuteParams: ExecuteFunc;

  before(async () => {
    signers = await ethers.getSigners();
    [owner, account] = signers;

    const ERC1271MockFactory = await ethers.getContractFactory('ERC1271Mock');

    forwarder = await new BaseForwarderMock__factory(owner).deploy();
    simpleWallet = await new ERC1271SimpleWallet__factory(owner).deploy(owner.address);
    mockWallet = await ERC1271MockFactory.deploy();

    buildExecuteParams = buildExecuteFunc(forwarder.interface, forwarder.address, forwarder);
  });

  describe('Verify', async () => {
    it('should verify when the signature is valid', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams(
        'revertWithReason()',
        [],
        owner,
        tokenId,
      );

      expect(await forwarder.verify(req, signature)).to.eq(true);
    });

    it('should verify that the address matches the recovered one', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams(
        'revertWithReason()',
        [],
        owner,
        tokenId,
      );

      expect(
        await forwarder.verify({ ...req, from: account.address }, signature),
      ).to.eq(false);
    });

    it('should verify that nonces match the address once', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams(
        'revertWithReason()',
        [],
        owner,
        tokenId,
      );

      expect(await forwarder.verify({ ...req, nonce: 42 }, signature)).to.eq(
        false,
      );
    });

    describe('with metatx from contract addresses', async () => {
      it('should be able to verify the ERC1271 contract signature', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams(
          'mintAsset()',
          [],
          owner,
          tokenId,
        );

        expect(
          await forwarder.verify(
            { ...req, from: simpleWallet.address },
            signature,
          ),
        ).to.eq(true);
      });

      it('should be able to handle situation when ERC1271 contract returns false', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams(
          'mintAsset()',
          [],
          account,
          tokenId,
        );

        expect(
          await forwarder.verify(
            { ...req, from: simpleWallet.address },
            signature,
          ),
        ).to.eq(false);
      });

      it('should be able to handle situation when contract does not implement ERC1271', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams(
          'mintAsset()',
          [],
          owner,
          tokenId,
        );

        expect(
          await forwarder.verify(
            { ...req, from: mockWallet.address },
            signature,
          ),
        ).to.eq(false);
      });
    });
  });

  describe('Execute', async () => {
    it('should revert with native reason', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams(
        'revertWithReason()',
        [],
        owner,
        tokenId,
      );

      await expect(forwarder.execute(req, signature)).to.be.revertedWith(
        'AAAAAA',
      );
    });

    it('should revert with forwarding reason', async () => {
      const tokenId = BigNumber.from(100010);
      const { req, signature } = await buildExecuteParams(
        'revertWithoutReason()',
        [],
        owner,
        tokenId,
      );

      await expect(forwarder.execute(req, signature)).to.be.revertedWith(
        'BaseForwarder: CALL_FAILED',
      );
    });

    describe('metatx from contract addresses', async () => {
      it('should be able to mint asset on behalf of ERC1271SmartWallet', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams(
          'mintAsset()',
          [],
          owner,
          tokenId,
        );

        await forwarder.execute(
          { ...req, from: simpleWallet.address },
          signature,
        );

        expect(await forwarder.hasAsset(simpleWallet.address)).to.eq(true);
      });

      it('should revert when the signature is made not on behalf of smart wallet owner', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams(
          'mintAsset()',
          [],
          account,
          tokenId,
        );

        await expect(
          forwarder.execute({ ...req, from: mockWallet.address }, signature),
        ).to.be.revertedWith('BaseForwarderMock: SIGNATURE_INVALID');
      });

      it('should revert when contract does not implement ERC1271', async () => {
        const tokenId = BigNumber.from(100010);
        const { req, signature } = await buildExecuteParams(
          'mintAsset()',
          [],
          owner,
          tokenId,
        );

        await expect(
          forwarder.execute({ ...req, from: mockWallet.address }, signature),
        ).to.be.revertedWith('BaseForwarderMock: SIGNATURE_INVALID');
      });
    });
  });
});
