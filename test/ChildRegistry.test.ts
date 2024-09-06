import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { AbiCoder, keccak256 } from 'ethers';
import { MintingManager, UNSRegistry } from '../types/contracts';
import { RootChainManager } from '../types/contracts/@maticnetwork/pos-portal/RootChainManager.sol';
import { MintableERC721Predicate } from '../types/contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol';
import { DummyStateSender } from '../types/contracts/@maticnetwork/pos-portal/DummyStateSender.sol';
import { MintingManager__factory, UNSRegistry__factory } from '../types/factories/contracts';
import { DummyStateSender__factory } from '../types/factories/contracts/@maticnetwork/pos-portal/DummyStateSender.sol';
import { MintableERC721Predicate__factory } from '../types/factories/contracts/@maticnetwork/pos-portal/MintableERC721Predicate.sol';
import { RootChainManager__factory } from '../types/factories/contracts/@maticnetwork/pos-portal/RootChainManager.sol';
import { ZERO_ADDRESS } from './helpers/constants';

describe('ChildRegistry', () => {
  let l1UnsRegistry: UNSRegistry,
    l2UnsRegistry: UNSRegistry,
    mintingManager: MintingManager,
    rootChainManager: RootChainManager,
    predicate: MintableERC721Predicate,
    stateSender: DummyStateSender;

  let registryOwner: SignerWithAddress,
    rcmOwner: SignerWithAddress,
    predicateOwner: SignerWithAddress,
    owner: SignerWithAddress;

  const abiCoder = new AbiCoder();

  before(async () => {
    [registryOwner, rcmOwner, predicateOwner, owner] = await ethers.getSigners();

    l1UnsRegistry = (await new UNSRegistry__factory(registryOwner).deploy()).connect(registryOwner);

    mintingManager = await new MintingManager__factory(registryOwner).deploy();

    l2UnsRegistry = (await new UNSRegistry__factory(registryOwner).deploy()).connect(registryOwner);

    // deploy state sender
    stateSender = await new DummyStateSender__factory(registryOwner).deploy();

    // deploy and init predicate
    predicate = (await new MintableERC721Predicate__factory(registryOwner).deploy()).connect(predicateOwner);
    await predicate.initialize(predicateOwner.address);

    // deploy and setup root chain manager
    rootChainManager = (await new RootChainManager__factory(registryOwner).deploy()).connect(rcmOwner);
    await rootChainManager.initialize(rcmOwner.address);
    await rootChainManager.setStateSender(await stateSender.getAddress());
    await rootChainManager.registerPredicate(
      keccak256(await l1UnsRegistry.getAddress()),
      await predicate.getAddress(),
    );
    await rootChainManager.mapToken(
      await l1UnsRegistry.getAddress(),
      await l2UnsRegistry.getAddress(),
      keccak256(await l1UnsRegistry.getAddress()),
    );
    await predicate.grantRole(await predicate.MANAGER_ROLE(), await rootChainManager.getAddress());

    // post-configuration
    await l1UnsRegistry.initialize(
      await mintingManager.getAddress(),
      ZERO_ADDRESS,
      await rootChainManager.getAddress(),
      ZERO_ADDRESS,
    );

    await l2UnsRegistry.initialize(
      await mintingManager.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      await registryOwner.getAddress(),
    );

    await mintingManager.initialize(
      await l2UnsRegistry.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.addMinter(registryOwner.address);
  });

  describe('Management of childChainManager', async () => {
    let tempL2UnsRegistry: UNSRegistry;

    beforeEach(async () => {
      tempL2UnsRegistry = (await new UNSRegistry__factory(registryOwner).deploy()).connect(registryOwner);
      await tempL2UnsRegistry.initialize(registryOwner.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    });

    it('should revert when childChainManager is empty', async () => {
      const tokenId = await tempL2UnsRegistry.namehash(['l2-te1', 'crypto']);

      await expect(
        tempL2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256'], [tokenId])),
      ).to.be.revertedWith('Registry: INSUFFICIENT_PERMISSIONS');
    });
  });

  describe('Deposit', () => {
    it('should deposit one token', async () => {
      const tokenId = await l2UnsRegistry.namehash(['l2-aq1', 'crypto']);

      await expect(l2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256'], [tokenId])))
        .to.emit(l2UnsRegistry, 'Transfer')
        .withArgs(ZERO_ADDRESS, owner.address, tokenId);
      expect(await l2UnsRegistry.ownerOf(tokenId)).to.be.equal(owner.address);
    });

    it('should deposit multiple tokens', async () => {
      const tokenId1 = await l2UnsRegistry.namehash(['l2-eq1', 'crypto']);
      const tokenId2 = await l2UnsRegistry.namehash(['l2-eq2', 'crypto']);

      await expect(l2UnsRegistry.deposit(owner.address, abiCoder.encode(['uint256[]'], [[tokenId1, tokenId2]])))
        .to.emit(l2UnsRegistry, 'Transfer')
        .withArgs(ZERO_ADDRESS, owner.address, tokenId1);
      expect(await l2UnsRegistry.ownerOf(tokenId1)).to.be.equal(owner.address);
      expect(await l2UnsRegistry.ownerOf(tokenId2)).to.be.equal(owner.address);
    });
  });
});
