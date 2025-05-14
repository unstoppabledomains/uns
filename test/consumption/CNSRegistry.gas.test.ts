import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { CNSRegistryForwarder } from '../../types/contracts/metatx';
import { CNSRegistry } from '../../types/dot-crypto/contracts';
import { MintingController, SignatureController } from '../../types/dot-crypto/contracts/controllers';
import { CNSRegistryForwarder__factory } from '../../types/factories/contracts/metatx';
import { CNSRegistry__factory } from '../../types/factories/dot-crypto/contracts';
import {
  MintingController__factory,
  SignatureController__factory,
} from '../../types/factories/dot-crypto/contracts/controllers';
import { percDiff } from '../helpers/consumption';
import { sign, buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';
import { TLD } from '../../src/tlds';

describe('CNSRegistry (consumption)', () => {
  let forwarder: CNSRegistryForwarder,
    registry: CNSRegistry,
    mintingController: MintingController,
    signatureController: SignatureController;
  let signers: SignerWithAddress[], owner: SignerWithAddress, receiver: SignerWithAddress, spender: SignerWithAddress;

  let buildExecuteParams: ExecuteFunc;

  const mintDomain = async (label: string, owner: string) => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(TLD.crypto.hash, label);
  };

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver, spender] = signers;

    registry = await new CNSRegistry__factory().connect(owner).deploy();
    mintingController = await new MintingController__factory().connect(owner).deploy(await registry.getAddress());
    signatureController = await new SignatureController__factory().connect(owner).deploy(await registry.getAddress());

    await registry.addController(await mintingController.getAddress());
    await registry.addController(await signatureController.getAddress());

    forwarder = await new CNSRegistryForwarder__factory()
      .connect(owner)
      .deploy(await signatureController.getAddress());

    buildExecuteParams = buildExecuteFunc(registry.interface, await signatureController.getAddress(), forwarder);
  });

  it('`transferFrom` consumption', async () => {
    const result: unknown[] = [];
    const label = 'cons-d1-';

    // Direct transfer
    const tokenId = await mintDomain(label, owner.address);
    const directTx = await registry.connect(owner).transferFrom(owner.address, receiver.address, tokenId);

    const directTxReceipt = (await directTx.wait())!;

    // Old meta-tx
    const tokenIdFor = await mintDomain(label + 'for', owner.address);
    const dataFor = registry.interface.encodeFunctionData('transferFrom', [
      owner.address,
      receiver.address,
      tokenIdFor,
    ]);
    const nonceFor = await signatureController.nonceOf(tokenIdFor);
    const signatureFor = await sign(dataFor, await signatureController.getAddress(), nonceFor, owner);
    const forTx = await signatureController
      .connect(spender)
      .transferFromFor(owner.address, receiver.address, tokenIdFor, signatureFor);

    const forTxReceipt = (await forTx.wait())!;

    // Forwarder
    const tokenIdForward = await mintDomain(label + 'forward', owner.address);
    const { req, signature } = await buildExecuteParams(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenIdForward],
      owner,
      tokenIdForward,
    );
    const forwardTx = await forwarder.connect(spender).execute(req, signature);

    const forwardTxReceipt = (await forwardTx.wait())!;

    result.push({
      selector: 'transferFrom(address,address,uint256)',
      directTx: directTxReceipt.gasUsed.toString(),
      forTx: forTxReceipt.gasUsed.toString(),
      diff1: percDiff(directTxReceipt.gasUsed, forTxReceipt.gasUsed) + ' %',
      forwardTx: forwardTxReceipt.gasUsed.toString(),
      diff2: percDiff(forTxReceipt.gasUsed, forwardTxReceipt.gasUsed) + ' %',
    });
    console.table(result);
  });
});
