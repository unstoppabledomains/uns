import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';
import { ethers } from 'hardhat';
import { TLD } from '../helpers/constants';
import { sign, buildExecuteFunc } from '../helpers/metatx';

describe('CNSRegistry (consumption)', () => {
  let forwarder: Contract, registry: Contract, mintingController: Contract, signatureController: Contract;
  let signers: SignerWithAddress[], owner: SignerWithAddress, receiver: SignerWithAddress, spender: SignerWithAddress;

  let buildExecuteParams;

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

    const CNSRegistryForwarder = await ethers.getContractFactory('CNSRegistryForwarder');
    const CNSRegistry = await ethers.getContractFactory('CNSRegistry');
    const MintingController = await ethers.getContractFactory('MintingController');
    const SignatureController = await ethers.getContractFactory('SignatureController');

    registry = await CNSRegistry.deploy();
    mintingController = await MintingController.deploy(registry.address);
    signatureController = await SignatureController.deploy(registry.address);

    await registry.addController(mintingController.address);
    await registry.addController(signatureController.address);

    forwarder = await CNSRegistryForwarder.deploy(signatureController.address);

    buildExecuteParams = buildExecuteFunc(registry.interface, signatureController.address, forwarder);
  });

  it('`transferFrom` consumption', async () => {
    const result: any[] = [];
    const label = 'cons-d1-';

    // Direct transfer
    const tokenId = await mintDomain(label, owner.address);
    const directTx = await registry.connect(owner).transferFrom(owner.address, receiver.address, tokenId);
    directTx.receipt = await directTx.wait();

    // Old meta-tx
    const tokenIdFor = await mintDomain(label + 'for', owner.address);
    const dataFor = registry.interface.encodeFunctionData(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenIdFor],
    );
    const nonceFor = await signatureController.nonceOf(tokenIdFor);
    const signatureFor = await sign(dataFor, signatureController.address, nonceFor, owner);
    const forTx = await signatureController.connect(spender).transferFromFor(
      owner.address, receiver.address, tokenIdFor, signatureFor);
    forTx.receipt = await forTx.wait();

    // Forwarder
    const tokenIdForward = await mintDomain(label + 'forward', owner.address);
    const { req, signature } = await buildExecuteParams(
      'transferFrom(address,address,uint256)',
      [owner.address, receiver.address, tokenIdForward],
      owner, tokenIdForward,
    );
    const forwardTx = await forwarder.connect(spender).execute(req, signature);
    forwardTx.receipt = await forwardTx.wait();

    result.push({
      selector: 'transferFrom(address,address,uint256)',
      directTx: directTx.receipt.gasUsed.toString(),
      forTx: forTx.receipt.gasUsed.toString(),
      diff1: percDiff(directTx.receipt.gasUsed, forTx.receipt.gasUsed).toFixed(2) + ' %',
      forwardTx: forwardTx.receipt.gasUsed.toString(),
      diff2: percDiff(forTx.receipt.gasUsed, forwardTx.receipt.gasUsed).toFixed(2) + ' %',
    });
    console.table(result);
  });
});
