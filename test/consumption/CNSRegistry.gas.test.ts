import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { CNSRegistryForwarder } from '../../typechain-types/contracts/metatx';
import { CNSRegistry } from '../../typechain-types/dot-crypto/contracts';
import { MintingController, SignatureController } from '../../typechain-types/dot-crypto/contracts/controllers';
import { CNSRegistryForwarder__factory } from '../../typechain-types/factories/contracts/metatx';
import { CNSRegistry__factory } from '../../typechain-types/factories/dot-crypto/contracts';
import { MintingController__factory, SignatureController__factory } from '../../typechain-types/factories/dot-crypto/contracts/controllers';
import { TLD } from '../helpers/constants';
import { sign, buildExecuteFunc, ExecuteFunc } from '../helpers/metatx';

describe('CNSRegistry (consumption)', () => {
  let forwarder: CNSRegistryForwarder, registry: CNSRegistry, mintingController: MintingController, signatureController: SignatureController;
  let signers: SignerWithAddress[], owner: SignerWithAddress, receiver: SignerWithAddress, spender: SignerWithAddress;

  let buildExecuteParams: ExecuteFunc;

  const mintDomain = async (label: string, owner: string) => {
    await mintingController.mintSLD(owner, label);
    return await registry.childIdOf(TLD.CRYPTO, label);
  };

  function percDiff (a: number, b: number) {
    return -((a - b) / a) * 100;
  }

  before(async () => {
    signers = await ethers.getSigners();
    [owner, receiver, spender] = signers;

    registry = await new CNSRegistry__factory(owner).deploy();
    mintingController = await new MintingController__factory(owner).deploy(registry.address);
    signatureController = await new SignatureController__factory(owner).deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await new CNSRegistryForwarder__factory(owner).deploy(signatureController.address);

    buildExecuteParams = buildExecuteFunc(registry.interface, signatureController.address, forwarder);
  });

  it('`transferFrom` consumption', async () => {
    const result: unknown[] = [];
    const label = 'cons-d1-';

    // Direct transfer
    const tokenId = await mintDomain(label, owner.address);
    const directTx = await registry.connect(owner).transferFrom(owner.address, receiver.address, tokenId);

    const directTxReceipt = await directTx.wait();

    // Old meta-tx
    const tokenIdFor = await mintDomain(label + 'for', owner.address);
    const dataFor = registry.interface.encodeFunctionData(
      'transferFrom',
      [owner.address, receiver.address, tokenIdFor],
    );
    const nonceFor = await signatureController.nonceOf(tokenIdFor);
    const signatureFor = await sign(dataFor, signatureController.address, nonceFor, owner);
    const forTx = await signatureController.connect(spender).transferFromFor(
      owner.address, receiver.address, tokenIdFor, signatureFor);

    const forTxReceipt = await forTx.wait();

    // Forwarder
    const tokenIdForward = await mintDomain(label + 'forward', owner.address);
    const { req, signature } = await buildExecuteParams(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenIdForward],
      owner, tokenIdForward,
    );
    const forwardTx = await forwarder.connect(spender).execute(req, signature);

    const forwardTxReceipt = await forwardTx.wait();

    result.push({
      selector: 'transferFrom(address,address,uint256)',
      directTx: directTxReceipt.gasUsed.toString(),
      forTx: forTxReceipt.gasUsed.toString(),
      diff1: percDiff(directTxReceipt.gasUsed.toNumber(), forTxReceipt.gasUsed.toNumber()).toFixed(2) + ' %',
      forwardTx: forwardTxReceipt.gasUsed.toString(),
      diff2: percDiff(forTxReceipt.gasUsed.toNumber(), forwardTxReceipt.gasUsed.toNumber()).toFixed(2) + ' %',
    });
    console.table(result);
  });
});
