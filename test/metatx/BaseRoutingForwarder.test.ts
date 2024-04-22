import { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumberish } from 'ethers';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ExecuteFunc, buildExecuteFunc, sign } from '../helpers/metatx';
import { TLD } from '../helpers/constants';
import { CNSRegistry } from '../../types/dot-crypto/contracts';
import { MintingController, SignatureController } from '../../types/dot-crypto/contracts/controllers';
import { CNSRegistry__factory } from '../../types/factories/dot-crypto/contracts';
import {
  MintingController__factory,
  SignatureController__factory,
} from '../../types/factories/dot-crypto/contracts/controllers';
import { BaseRoutingForwarderMock } from '../../types';

describe('BaseRoutingForwarder', () => {
  let forwarder: BaseRoutingForwarderMock,
    registry: CNSRegistry,
    mintingController: MintingController,
    signatureController: SignatureController;
  let signers: SignerWithAddress[], owner: SignerWithAddress, receiver: SignerWithAddress;

  const mintDomain = async (label: string, owner: string) => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(TLD.CRYPTO, label);
  };

  let buildExecuteParams: ExecuteFunc, buildExecuteRoutingParams: ExecuteFunc;

  const buildTransfer = async (from: SignerWithAddress, toAddress: string, tokenId: BigNumberish) => {
    return await buildExecuteParams(
      'transferFrom(address,address,uint256)',
      [from.address, toAddress, tokenId],
      from,
      tokenId,
    );
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver] = signers;

    registry = await new CNSRegistry__factory(owner).deploy();
    mintingController = await new MintingController__factory(owner).deploy(await registry.getAddress());
    signatureController = await new SignatureController__factory(owner).deploy(await registry.getAddress());

    await registry.addController(await mintingController.getAddress());
    await registry.addController(await signatureController.getAddress());

    forwarder = await ethers.deployContract('BaseRoutingForwarderMock');

    buildExecuteParams = buildExecuteFunc(registry.interface, await signatureController.getAddress(), forwarder);
    buildExecuteRoutingParams = buildExecuteFunc(forwarder.interface, await forwarder.getAddress(), forwarder);
  });

  it('should build valid `transferFrom` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_1');
    const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

    const expectedData = signatureController.interface.encodeFunctionData('transferFromFor', [
      owner.address,
      receiver.address,
      tokenId,
      signature,
    ]);

    const calldata = await forwarder.buildRouteData.staticCall(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should build valid `putString(string)` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_3');
    const { req, signature } = await buildExecuteRoutingParams('putString(string)', ['vv'], owner, tokenId);

    const expectedData = forwarder.interface.encodeFunctionData('putStringFor', ['vv', signature]);

    const calldata = await forwarder.buildRouteData.staticCall(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should build valid `putUint(uint)` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_4');
    const { req, signature } = await buildExecuteRoutingParams('putUint(uint256)', [1], owner, tokenId);

    const expectedData = forwarder.interface.encodeFunctionData('putUintFor', [1, signature]);

    const calldata = await forwarder.buildRouteData.staticCall(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should build valid `putUintArr(uint256[])` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_5');
    const { req, signature } = await buildExecuteRoutingParams('putUintArr(uint256[])', [[1, 2]], owner, tokenId);

    const expectedData = forwarder.interface.encodeFunctionData('putUintArrFor', [[1, 2], signature]);

    const calldata = await forwarder.buildRouteData.staticCall(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should revert when unknown function call', async () => {
    const tokenId = await mintDomain('test_foob_2', owner.address);

    const data = registry.interface.encodeFunctionData('setOwner', [receiver.address, tokenId]);
    const nonce = await forwarder.nonceOf(tokenId);
    const signature = await sign(data, await signatureController.getAddress(), nonce, owner);
    const req = { from: owner.address, nonce, tokenId, data };

    await expect(forwarder.buildRouteData.staticCall(req, signature)).to.be.revertedWith(
      'BaseRoutingForwarder: ROUTE_UNKNOWN',
    );
  });
});
