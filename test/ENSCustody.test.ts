import { ethers } from 'hardhat';
import { expect } from 'chai';
import { namehash } from 'ethers/lib/utils';
import { sha3 } from 'web3-utils';
import {
  BaseRegistrarImplementation__factory,
  DummyOracle__factory,
  ENSRegistry__factory,
  ETHRegistrarController__factory,
  NameWrapper__factory,
  PublicResolver__factory,
  ReverseRegistrar__factory,
  StablePriceOracle__factory,
} from '../types';
import { BUFFERED_REGISTRATION_COST, REGISTRATION_TIME, ZERO_ADDRESS, ZERO_WORD } from './helpers/constants';

const provider = ethers.provider;

describe('ENSCustody', function () {
  let ens;
  let resolver;
  let baseRegistrar;
  let controller;
  let priceOracle;
  let reverseRegistrar;
  let nameWrapper;

  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

  let signers, owner, ownerAccount, registrantAccount, accounts;
  let result;

  async function registerName (name, txOptions = { value: BUFFERED_REGISTRATION_COST }) {
    const commitment = await controller.makeCommitment(
      name,
      registrantAccount,
      REGISTRATION_TIME,
      secret,
      ZERO_ADDRESS,
      [],
      false,
      0,
    );
    let tx = await controller.commit(commitment);
    expect(await controller.commitments(commitment)).to.equal((await provider.getBlock(tx.blockNumber)).timestamp);

    await provider.send('evm_increaseTime', [(await controller.minCommitmentAge()).toNumber()]);

    tx = await controller.register(
      name,
      registrantAccount,
      REGISTRATION_TIME,
      secret,
      ZERO_ADDRESS,
      [],
      false,
      0,
      txOptions,
    );

    return tx;
  }

  before(async () => {
    signers = await ethers.getSigners();
    owner = await signers[0];
    ownerAccount = await signers[0].getAddress();
    registrantAccount = await signers[1].getAddress();
    accounts = [ownerAccount, registrantAccount, signers[2].getAddress()];

    ens = await new ENSRegistry__factory(owner).deploy();
    baseRegistrar = await new BaseRegistrarImplementation__factory(owner).deploy(ens.address, namehash('eth'));
    reverseRegistrar = await new ReverseRegistrar__factory(owner).deploy(ens.address);

    await ens.setSubnodeOwner(ZERO_WORD, sha3('reverse'), accounts[0]);
    await ens.setSubnodeOwner(namehash('reverse'), sha3('addr'), reverseRegistrar.address);

    nameWrapper = await new NameWrapper__factory(owner).deploy(ens.address, baseRegistrar.address, ownerAccount);

    await ens.setSubnodeOwner(ZERO_WORD, sha3('eth'), baseRegistrar.address);

    const dummyOracle = await new DummyOracle__factory(owner).deploy('100000000');
    priceOracle = await new StablePriceOracle__factory(owner).deploy(dummyOracle.address, [0, 0, 4, 2, 1]);
    controller = await new ETHRegistrarController__factory(owner).deploy(
      baseRegistrar.address,
      priceOracle.address,
      600,
      86400,
      reverseRegistrar.address,
      nameWrapper.address,
      ens.address,
    );
    await nameWrapper.setController(controller.address, true);
    await baseRegistrar.addController(nameWrapper.address);
    await reverseRegistrar.setController(controller.address, true);

    resolver = await new PublicResolver__factory(owner).deploy(
      ens.address,
      nameWrapper.address,
      controller.address,
      reverseRegistrar.address,
    );
  });

  beforeEach(async () => {
    result = await ethers.provider.send('evm_snapshot', []);
  });
  afterEach(async () => {
    await ethers.provider.send('evm_revert', [result]);
  });

  it('should register name', async () => {
    const name = 'newname';
    const tx = await registerName(name);
    console.log(tx);
    expect(await controller.available(name)).to.equal(false);
  });
});
