import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import {
  MintingManager__factory,
  UNSRegistry__factory,
} from '../types/factories/contracts';
import { MintingManager, UNSRegistry } from '../types/contracts';
import { Resolver } from '../types/dot-crypto/contracts';
import { MintingController } from '../types/dot-crypto/contracts/controllers';
import { MintingController__factory } from '../types/factories/dot-crypto/contracts/controllers';
import { Resolver__factory } from '../types/factories/dot-crypto/contracts';
import { ZERO_ADDRESS } from './helpers/constants';

describe('MintingManager (proxy)', () => {
  let unsRegistry: UNSRegistry,
    resolver: Resolver,
    mintingController: MintingController,
    mintingManager: MintingManager;

  let signers: SignerWithAddress[], coinbase: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase] = signers;
  });

  beforeEach(async () => {
    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();

    mintingManager = (await upgrades.deployProxy(
      new MintingManager__factory(coinbase),
      [],
      { initializer: false },
    )) as MintingManager;
    await unsRegistry.initialize(mintingManager.address);

    await mintingManager.initialize(
      unsRegistry.address,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.addMinter(coinbase.address);
    await mintingManager.setTokenURIPrefix('/');
  });

  it('should persist state after proxy upgrade', async () => {
    mintingController = await new MintingController__factory(coinbase).deploy(
      ZERO_ADDRESS,
    );
    resolver = await new Resolver__factory(coinbase).deploy(
      ZERO_ADDRESS,
      mintingController.address,
    );
    await mintingManager.setResolver(resolver.address);

    await upgrades.upgradeProxy(
      mintingManager.address,
      new MintingManager__factory(coinbase),
    );

    expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
  });

  it('should be possible to set resolver after proxy upgrade', async () => {
    expect(await mintingManager.cnsResolver()).to.be.equal(ZERO_ADDRESS);

    await upgrades.upgradeProxy(
      mintingManager.address,
      new MintingManager__factory(coinbase),
    );

    mintingController = await new MintingController__factory(coinbase).deploy(
      ZERO_ADDRESS,
    );
    resolver = await new Resolver__factory(coinbase).deploy(
      ZERO_ADDRESS,
      mintingController.address,
    );
    await mintingManager.setResolver(resolver.address);

    expect(await mintingManager.cnsResolver()).to.be.equal(resolver.address);
  });
});
