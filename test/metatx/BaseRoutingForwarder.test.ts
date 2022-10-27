import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ExecuteFunc, buildExecuteFunc, sign } from '../helpers/metatx';
import { TLD } from '../helpers/constants';
import { CNSRegistry } from '../../typechain-types/dot-crypto/contracts';
import { MintingController, SignatureController } from '../../typechain-types/dot-crypto/contracts/controllers';
import { CNSRegistry__factory } from '../../typechain-types/factories/dot-crypto/contracts';
import { MintingController__factory, SignatureController__factory } from '../../typechain-types/factories/dot-crypto/contracts/controllers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { BigNumberish, Contract } from 'ethers';

describe('BaseRoutingForwarder', () => {
  let forwarder: Contract, registry: CNSRegistry, mintingController: MintingController, signatureController: SignatureController;
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

    const BaseRoutingForwarder = await ethers.getContractFactory('BaseRoutingForwarderMock');

    registry = await new CNSRegistry__factory(owner).deploy();
    mintingController = await new MintingController__factory(owner).deploy(registry.address);
    signatureController = await new SignatureController__factory(owner).deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await BaseRoutingForwarder.deploy();

    buildExecuteParams = buildExecuteFunc(registry.interface, signatureController.address, forwarder);
    buildExecuteRoutingParams = buildExecuteFunc(forwarder.interface, forwarder.address, forwarder);
  });

  it('should build valid `transferFrom` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_1');
    const { req, signature } = await buildTransfer(owner, receiver.address, tokenId);

    const expectedData = signatureController.interface.encodeFunctionData(
      'transferFromFor',
      [owner.address, receiver.address, tokenId, signature],
    );

    const calldata = await forwarder.callStatic.buildRouteData(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should build valid `putString(string)` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_3');
    const { req, signature } = await buildExecuteRoutingParams(
      'putString(string)',
      ['vv'],
      owner,
      tokenId,
    );

    const expectedData = forwarder.interface.encodeFunctionData('putStringFor(string,bytes)', ['vv', signature]);

    const calldata = await forwarder.callStatic.buildRouteData(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should build valid `putUint(uint)` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_4');
    const { req, signature } = await buildExecuteRoutingParams(
      'putUint(uint256)',
      [1],
      owner,
      tokenId,
    );

    const expectedData = forwarder.interface.encodeFunctionData('putUintFor(uint256,bytes)', [1, signature]);

    const calldata = await forwarder.callStatic.buildRouteData(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should build valid `putUintArr(uint256[])` route calldata', async () => {
    const tokenId = await registry.childIdOf(TLD.CRYPTO, 'test_foob_5');
    const { req, signature } = await buildExecuteRoutingParams(
      'putUintArr(uint256[])',
      [[1, 2]],
      owner,
      tokenId,
    );

    const expectedData = forwarder.interface.encodeFunctionData(
      'putUintArrFor(uint256[],bytes)',
      [[1, 2], signature],
    );

    const calldata = await forwarder.callStatic.buildRouteData(req, signature);
    expect(calldata).to.be.equal(expectedData);
  });

  it('should revert when unknown function call', async () => {
    const tokenId = await mintDomain('test_foob_2', owner.address);

    const data = registry.interface.encodeFunctionData(
      'setOwner',
      [receiver.address, tokenId],
    );
    const nonce = await forwarder.nonceOf(tokenId);
    const signature = await sign(data, signatureController.address, nonce, owner);
    const req = { from: owner.address, nonce, tokenId, data };

    await expect(
      forwarder.callStatic.buildRouteData(req, signature),
    ).to.be.revertedWith('RoutingForwarder: ROUTE_UNKNOWN');
  });
});
