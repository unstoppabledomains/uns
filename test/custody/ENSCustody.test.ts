import { ethers } from 'hardhat';
import { expect } from 'chai';
import { ContractTransactionResponse, EventLog, namehash } from 'ethers';
import { sha3Raw as sha3 } from 'web3-utils';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
import {
  BaseRegistrarImplementation__factory,
  DummyOracle__factory,
  ENSCustody__factory,
  ENSRegistry__factory,
  ETHRegistrarController__factory,
  NameWrapper__factory,
  PublicResolver__factory,
  ReverseRegistrar__factory,
  StablePriceOracle__factory,
  ERC1155Mock__factory,
  ETHRegistrarController,
  ENSRegistry,
  PublicResolver,
  BaseRegistrarImplementation,
  StablePriceOracle,
  ReverseRegistrar,
  NameWrapper,
  ENSCustody,
  ERC1155Mock,
  ERC721Mock__factory,
} from '../../types';
import { BUFFERED_REGISTRATION_COST, DAY, REGISTRATION_TIME, ZERO_ADDRESS, ZERO_WORD } from '../helpers/constants';
import { makeInterfaceId } from '../helpers/makeInterfaceId';
import { getLatestBlockTimestamp, increaseTimeBy } from '../helpers/utils';
import { deployProxy } from '../../src/helpers';

describe('ENSCustody', function () {
  let provider: HardhatEthersProvider;
  let result: unknown;

  let ensRegistry: ENSRegistry;
  let resolver: PublicResolver;
  let baseRegistrar: BaseRegistrarImplementation;

  let controller: ETHRegistrarController;

  let priceOracle: StablePriceOracle;
  let reverseRegistrar: ReverseRegistrar;
  let nameWrapper: NameWrapper;

  let custody: ENSCustody;
  let erc1155: ERC1155Mock;

  const secret = '0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF';

  let signers: SignerWithAddress[];
  let owner: SignerWithAddress, registrant: SignerWithAddress, minter: SignerWithAddress, newOwner: SignerWithAddress;
  let ownerAddress: string, registrantAddress: string, newOwnerAddress: string;

  async function registerName (name: string, txOptions = { value: BUFFERED_REGISTRATION_COST }) {
    const commitment = await controller.makeCommitment(
      name,
      registrantAddress,
      REGISTRATION_TIME,
      secret,
      ZERO_ADDRESS,
      [],
      false,
      0,
    );
    let tx = await controller.commit(commitment);
    const timestamp = await getLatestBlockTimestamp();
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await increaseTimeBy(await controller.minCommitmentAge());

    tx = await controller.register(
      name,
      registrantAddress,
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

  async function registerAndParkName (
    name: string,
    minter: SignerWithAddress,
    resolver = ZERO_ADDRESS,
    selfCustody = false,
    callData: string[] = [],
    txOptions = {},
  ) {
    // make commitment
    const commitment = await custody.makeCommitment(
      name,
      registrantAddress,
      REGISTRATION_TIME,
      secret,
      resolver,
      callData,
      false,
      0,
      selfCustody,
    );
    const commitTx = await custody.connect(minter).commit(commitment);
    const timestamp = await getLatestBlockTimestamp();
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await increaseTimeBy(await controller.minCommitmentAge());

    // register
    const registerTx = await custody
      .connect(minter)
      .register(
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret,
        resolver,
        callData,
        false,
        0,
        selfCustody,
        txOptions,
      );
    return [commitTx, registerTx];
  }

  async function registerAndUnwrapName (name: string) {
    await registerName(name);

    await assertOwnership(name, registrantAddress, true);

    const labelHash = sha3(name);

    const unwrapTx = await nameWrapper
      .connect(registrant)
      .unwrapETH2LD(labelHash, await registrant.getAddress(), await registrant.getAddress());
    await unwrapTx.wait();

    return unwrapTx;
  }

  async function topupCustody (name: string, registrationTime = REGISTRATION_TIME) {
    const [base, premium] = await controller.rentPrice(name, registrationTime);
    const price = base + premium;
    await owner.sendTransaction({ to: await custody.getAddress(), value: price });
    return price;
  }

  async function assertGasSpent (address: string, prevBalance: bigint, txs: ContractTransactionResponse[]) {
    let spent = BigInt(0);

    for (const tx of txs) {
      const receipt = await provider.getTransactionReceipt(tx.hash);
      const gasFee = receipt!.gasUsed * tx.gasPrice;
      spent = spent + gasFee;
    }

    expect(await provider.getBalance(address)).to.equal(prevBalance - spent);
  }

  async function assertOwnership (name: string, owner: string, selfCustody = false) {
    const tokenId = sha3(name);
    const node = namehash(`${name}.eth`);

    // if 2LD
    if (name.split('.').length === 1) {
      expect(await controller.available(name)).to.equal(false);
      expect(await baseRegistrar.ownerOf(tokenId)).to.equal(await nameWrapper.getAddress());
    }

    expect(await ensRegistry.owner(node)).to.equal(await nameWrapper.getAddress());

    if (selfCustody) {
      expect(await nameWrapper.ownerOf(node)).to.equal(owner);
    } else {
      expect(await nameWrapper.ownerOf(node)).to.equal(await custody.getAddress());
      expect(await custody.ownerOf(node)).to.equal(owner);
    }
  }

  async function assertWrapped (name: string, isWrapped = true) {
    const nameHash = namehash(`${name}.eth`);

    expect(await nameWrapper['isWrapped(bytes32)'](nameHash)).to.be.eq(isWrapped);
  }

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [owner, registrant, minter, newOwner] = signers;

    ownerAddress = await owner.getAddress();
    registrantAddress = await registrant.getAddress();
    newOwnerAddress = await newOwner.getAddress();

    ensRegistry = await new ENSRegistry__factory().connect(owner).deploy();
    baseRegistrar = await new BaseRegistrarImplementation__factory()
      .connect(owner)
      .deploy(await ensRegistry.getAddress(), namehash('eth'));
    reverseRegistrar = await new ReverseRegistrar__factory().connect(owner).deploy(await ensRegistry.getAddress());

    await ensRegistry.setSubnodeOwner(ZERO_WORD, sha3('reverse'), ownerAddress);
    await ensRegistry.setSubnodeOwner(namehash('reverse'), sha3('addr'), await reverseRegistrar.getAddress());

    nameWrapper = await new NameWrapper__factory()
      .connect(owner)
      .deploy(await ensRegistry.getAddress(), await baseRegistrar.getAddress(), ownerAddress);

    await ensRegistry.setSubnodeOwner(ZERO_WORD, sha3('eth'), await baseRegistrar.getAddress());

    const dummyOracle = await new DummyOracle__factory().connect(owner).deploy('100000000');
    priceOracle = await new StablePriceOracle__factory()
      .connect(owner)
      .deploy(await dummyOracle.getAddress(), [0, 0, 4, 2, 1]);
    controller = await new ETHRegistrarController__factory()
      .connect(owner)
      .deploy(
        await baseRegistrar.getAddress(),
        await priceOracle.getAddress(),
        600,
        86400,
        await reverseRegistrar.getAddress(),
        await nameWrapper.getAddress(),
        await ensRegistry.getAddress(),
      );
    await nameWrapper.setController(await controller.getAddress(), true);
    await baseRegistrar.addController(await nameWrapper.getAddress());
    await reverseRegistrar.setController(await controller.getAddress(), true);

    resolver = await new PublicResolver__factory()
      .connect(owner)
      .deploy(
        await ensRegistry.getAddress(),
        await nameWrapper.getAddress(),
        await controller.getAddress(),
        await reverseRegistrar.getAddress(),
      );

    custody = (await deployProxy(new ENSCustody__factory().connect(owner), [
      await controller.getAddress(),
      await nameWrapper.getAddress(),
      await baseRegistrar.getAddress(),
    ])) as ENSCustody;
    await custody.addMinter(await minter.getAddress());

    erc1155 = await new ERC1155Mock__factory().connect(owner).deploy('');
  });

  beforeEach(async () => {
    result = await provider.send('evm_snapshot', []);
  });
  afterEach(async () => {
    await provider.send('evm_revert', [result]);
  });

  it('should register name', async () => {
    const name = 'newname';
    const tokenId = sha3(name);
    const node = namehash(`${name}.eth`);

    await registerName(name);

    expect(await controller.available(name)).to.equal(false);
    expect(await ensRegistry.owner(node)).to.equal(await nameWrapper.getAddress());
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(await nameWrapper.getAddress());
    expect(await nameWrapper.ownerOf(node)).to.equal(registrantAddress);
  });

  it('should return correct rent price', async () => {
    const name = 'ts-pa92';
    const [base, premium] = await controller.rentPrice(name, REGISTRATION_TIME);
    const price = base + premium;

    expect(await custody.rentPrice(name, REGISTRATION_TIME)).to.equal(price);
  });

  describe('wrapped ERC1155 parking', async () => {
    it('should receive and park a ERC1155 ENS domain', async () => {
      const name = 'ts-ww12';
      const node = namehash(`${name}.eth`);

      await registerName(name);

      await expect(
        nameWrapper
          .connect(registrant)
          .safeTransferFrom(
            registrantAddress,
            await custody.getAddress(),
            node,
            1,
            new ethers.AbiCoder().encode(['address'], [registrantAddress]),
          ),
      ).to.emit(custody, 'Parked');

      await assertOwnership(name, registrantAddress, false);
    });

    it('should receive and park a ERC1155 ENS domain to data specified owner', async () => {
      const name = 'ts-ww123';
      const node = namehash(`${name}.eth`);

      await registerName(name);

      await nameWrapper
        .connect(registrant)
        .safeTransferFrom(
          registrantAddress,
          await custody.getAddress(),
          node,
          1,
          new ethers.AbiCoder().encode(['address'], [newOwnerAddress]),
        );

      await assertOwnership(name, newOwnerAddress, false);
    });

    it('should not allow to park a ERC1155 ENS domain if no data provided', async () => {
      const name = 'ts-ww123-no-data';
      const node = namehash(`${name}.eth`);

      await registerName(name);

      await expect(
        nameWrapper.connect(registrant).safeTransferFrom(registrantAddress, await custody.getAddress(), node, 1, '0x'),
      ).to.be.reverted;
    });

    it('should not allow to park a ERC1155 ENS domain if owner is zero address', async () => {
      const name = 'ts-ww123-zero-owner';
      const node = namehash(`${name}.eth`);

      await registerName(name);

      await expect(
        nameWrapper
          .connect(registrant)
          .safeTransferFrom(
            registrantAddress,
            await custody.getAddress(),
            node,
            1,
            new ethers.AbiCoder().encode(['address'], [ZERO_ADDRESS]),
          ),
      ).to.be.revertedWith('ERC1155: transfer to non ERC1155Receiver implementer');
    });

    it('should allow ERC1155 tokens only from ENS wrapper', async () => {
      const erc1155TokenId1 = 1;

      await erc1155.mint(owner.address, erc1155TokenId1, 1, '0x');

      await expect(
        erc1155.safeTransferFrom(
          owner.address,
          await custody.getAddress(),
          erc1155TokenId1,
          1,
          new ethers.AbiCoder().encode(['address'], [ownerAddress]),
        ),
      ).to.be.revertedWith('ERC1155: transfer to non ERC1155Receiver implementer');
    });

    it('should batch receive ERC1155 tokens only from ENS wrapper', async () => {
      const name1 = 'ts-bb12';
      const node1 = namehash(`${name1}.eth`);
      const name2 = 'ts-bb21';
      const node2 = namehash(`${name2}.eth`);

      await registerName(name1);
      await registerName(name2);

      await expect(
        nameWrapper
          .connect(registrant)
          .safeBatchTransferFrom(
            registrantAddress,
            await custody.getAddress(),
            [node1, node2],
            [1, 1],
            new ethers.AbiCoder().encode(['address'], [registrantAddress]),
          ),
      ).to.emit(custody, 'Parked');

      await assertOwnership(name1, registrantAddress);
      await assertOwnership(name2, registrantAddress);
    });

    it('should not allow batch receiving of ERC1155 if owner is zero address', async () => {
      const name1 = 'ts-bb12-zero';
      const node1 = namehash(`${name1}.eth`);
      const name2 = 'ts-bb21-zero';
      const node2 = namehash(`${name2}.eth`);

      await registerName(name1);
      await registerName(name2);

      await expect(
        nameWrapper
          .connect(registrant)
          .safeBatchTransferFrom(
            registrantAddress,
            await custody.getAddress(),
            [node1, node2],
            [1, 1],
            new ethers.AbiCoder().encode(['address'], [ZERO_ADDRESS]),
          ),
      ).to.be.revertedWith('ERC1155: transfer to non ERC1155Receiver implementer');
    });

    it('should allow ERC1155 tokens only from ENS wrapper for batch transfers', async () => {
      const erc1155TokenId1 = 1;
      const erc1155TokenId2 = 2;

      await erc1155.mint(owner.address, erc1155TokenId1, 1, '0x');
      await erc1155.mint(owner.address, erc1155TokenId2, 1, '0x');

      await expect(
        erc1155.safeBatchTransferFrom(
          owner.address,
          await custody.getAddress(),
          [erc1155TokenId1, erc1155TokenId2],
          [1, 1],
          new ethers.AbiCoder().encode(['address'], [registrantAddress]),
        ),
      ).to.be.revertedWith('ERC1155: transfer to non ERC1155Receiver implementer');
    });

    it('should allow parking a ERC1155 ENS subdomain', async () => {
      const name = 'ts-bb12-sub-test';
      const subName = `sub.${name}`;

      const node = namehash(`${name}.eth`);
      const subNode = namehash(`${subName}.eth`);

      const timestamp = await getLatestBlockTimestamp();
      await registerName(name);

      const expiry = BigInt(timestamp) + (await controller.minCommitmentAge());
      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);
      await assertOwnership(subName, registrantAddress, true);

      await expect(
        nameWrapper
          .connect(registrant)
          .safeTransferFrom(
            registrantAddress,
            await custody.getAddress(),
            subNode,
            1,
            new ethers.AbiCoder().encode(['address'], [registrantAddress]),
          ),
      ).to.emit(custody, 'Parked');

      await assertOwnership(subName, registrantAddress, false);
    });

    it('should allow parking a ERC1155 ENS subdomain with batch transfer', async () => {
      const name = 'ts-bb42-sub-test2';
      const subName = `sub.${name}`;

      const node = namehash(`${name}.eth`);
      const subNode = namehash(`${subName}.eth`);

      const timestamp = await getLatestBlockTimestamp();
      await registerName(name);

      const expiry = BigInt(timestamp) + (await controller.minCommitmentAge());
      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);
      await assertOwnership(subName, registrantAddress, true);

      await expect(
        nameWrapper
          .connect(registrant)
          .safeBatchTransferFrom(
            registrantAddress,
            await custody.getAddress(),
            [subNode],
            [1],
            new ethers.AbiCoder().encode(['address'], [newOwnerAddress]),
          ),
      ).to.emit(custody, 'Parked');

      await assertOwnership(subName, newOwnerAddress, false);
    });
  });

  describe('unwrapped ERC721 parking', async () => {
    it('should wrap and park an unwrapped ERC721 ENS domain', async () => {
      const name = 'auto-wrap-parking-test1';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.AbiCoder();

      const wrapTx = await baseRegistrar
        .connect(registrant)
        ['safeTransferFrom(address,address,uint256,bytes)'](
          registrant.address,
          await custody.getAddress(),
          labelHash,
          abiCoder.encode(['address', 'address', 'string'], [registrantAddress, await resolver.getAddress(), name]),
        );
      await wrapTx.wait();

      await assertWrapped(name, true);
      await assertOwnership(name, registrantAddress);
    });

    it('should wrap and park an unwrapped ERC721 ENS domain to specified owner address', async () => {
      const name = 'auto-wrap-parking-test-data';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.AbiCoder();

      const wrapTx = await baseRegistrar
        .connect(registrant)
        ['safeTransferFrom(address,address,uint256,bytes)'](
          registrant.address,
          await custody.getAddress(),
          labelHash,
          abiCoder.encode(['address', 'address', 'string'], [newOwnerAddress, await resolver.getAddress(), name]),
        );
      await wrapTx.wait();

      await assertWrapped(name, true);
      await assertOwnership(name, newOwnerAddress);
    });

    it('should emit Parked event when parking an unwrapped ERC721 ENS domain', async () => {
      const name = 'auto-wrap-parking-test-event';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.AbiCoder();

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            registrant.address,
            await custody.getAddress(),
            labelHash,
            abiCoder.encode(['address', 'address', 'string'], [registrantAddress, await resolver.getAddress(), name]),
          ),
      ).to.emit(custody, 'Parked');

      await assertWrapped(name, true);
      await assertOwnership(name, registrantAddress);
    });

    it('should reject if labelHash does\'t match submitted name', async () => {
      const name = 'auto-wrap-parking-test2';
      const invalidName = 'auto-wrap-parking-test2-invalid';

      const labelHash = sha3(name);
      const invalidLabelHash = sha3(invalidName);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.AbiCoder();
      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            registrant.address,
            await custody.getAddress(),
            labelHash,
            abiCoder.encode(
              ['address', 'address', 'string'],
              [newOwnerAddress, await resolver.getAddress(), invalidName],
            ),
          ),
      )
        .to.be.revertedWithCustomError(nameWrapper, 'LabelMismatch')
        .withArgs(invalidLabelHash, labelHash);
    });

    it('should reject if no data is passed', async () => {
      const name = 'auto-wrap-parking-test3';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256)'](registrant.address, await custody.getAddress(), labelHash),
      ).to.be.reverted;
    });

    it('should revert if no owner address is specified in data', async () => {
      const name = 'auto-wrap-parking-test-data';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.AbiCoder();

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            registrant.address,
            await custody.getAddress(),
            labelHash,
            abiCoder.encode(['string', 'address'], [name, await resolver.getAddress()]),
          ),
      ).to.be.reverted;
    });

    it('should revert if no owner address is specified in data and it is in reverse order', async () => {
      const name = 'auto-wrap-parking-test-data-reversed';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.AbiCoder();

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            registrant.address,
            await custody.getAddress(),
            labelHash,
            abiCoder.encode(['string', 'address'], [name, await resolver.getAddress()]),
          ),
      ).to.be.reverted;
    });

    it('should revert if owner address is zero address', async () => {
      const name = 'auto-wrap-parking-test-zero-data';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.AbiCoder();

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            registrant.address,
            await custody.getAddress(),
            labelHash,
            abiCoder.encode(['address', 'address', 'string'], [ZERO_ADDRESS, await resolver.getAddress(), name]),
          ),
      ).to.be.revertedWithCustomError(custody, 'InvalidOwner');
    });

    it('should reject transferring if called not from regisrar', async () => {
      const erc721Mock = await new ERC721Mock__factory().connect(owner).deploy();

      await expect(erc721Mock.mint(await custody.getAddress(), 1)).to.be.revertedWithCustomError(
        custody,
        'OperationProhibited',
      );
    });

    it('unwrapped subdomains should not be a ERC721 token', async () => {
      const name = 'awesome-parent42';

      await registerAndUnwrapName(name);

      await ensRegistry.connect(registrant).setSubnodeOwner(namehash(`${name}.eth`), sha3('sub'), registrantAddress);

      expect(await ensRegistry.owner(namehash(`sub.${name}.eth`))).to.equal(registrantAddress);

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256)'](
            registrant.address,
            await custody.getAddress(),
            sha3(`sub.${name}`),
          ),
      ).to.be.reverted;
    });
  });

  describe('register', () => {
    it('should register and park name', async () => {
      const name = 'ts-ld91';
      const price = await topupCustody(name);
      const custodyBalance = await provider.getBalance(await custody.getAddress());
      const minterBalance = await provider.getBalance(minter.address);

      const txs = await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await assertOwnership(name, registrantAddress);
      expect(await provider.getBalance(await custody.getAddress())).to.equal(custodyBalance - price);
      await assertGasSpent(minter.address, minterBalance, txs);
    });

    it('should register and emit just one Parked event', async () => {
      const name = 'ts-ld92';
      await topupCustody(name);

      const [, registerTx] = await registerAndParkName(name, minter, ZERO_ADDRESS, false);
      await assertOwnership(name, registrantAddress);

      const receipt = await registerTx.wait();

      const hasParkedEvents = !!receipt?.logs.filter((log) =>
        log instanceof EventLog ? log.eventName === 'Parked' : false,
      ).length;
      expect(hasParkedEvents).to.be.true;
    });

    it('should revert when custody has not enough balance', async () => {
      const name = 'ts-tw75';

      await expect(registerAndParkName(name, minter, ZERO_ADDRESS, false)).to.be.revertedWithCustomError(
        custody,
        'CustodyNotEnoughBalance',
      );
    });

    it('should register and park name with resolver', async () => {
      const name = 'ts-tw14';
      const price = await topupCustody(name);

      const balance = await provider.getBalance(await custody.getAddress());
      await registerAndParkName(name, minter, await resolver.getAddress(), false);

      await assertOwnership(name, registrantAddress);
      expect(await provider.getBalance(await custody.getAddress())).to.equal(balance - price);
    });

    it('should register and park name with resolver and initial records', async () => {
      const name = 'ts-ll84';
      const node = namehash(`${name}.eth`);
      const callData = [resolver.interface.encodeFunctionData('setAddr(bytes32,address)', [node, registrantAddress])];
      await topupCustody(name);

      await registerAndParkName(name, minter, await resolver.getAddress(), false, callData);

      await assertOwnership(name, registrantAddress);
      expect(await resolver['addr(bytes32)'](node)).to.equal(registrantAddress);
    });

    it('should transfer parked domain', async () => {
      const name = 'ts-we02';
      const node = namehash(`${name}.eth`);
      await topupCustody(name);

      await registerAndParkName(name, minter, ZERO_ADDRESS, false);
      await assertOwnership(name, registrantAddress);

      await custody.connect(registrant).safeTransfer(registrantAddress, node);

      await assertOwnership(name, registrantAddress, true);
    });

    it('should allow transfer parked domain by owner only', async () => {
      const name = 'ts-wt52';
      const node = namehash(`${name}.eth`);
      await topupCustody(name);

      await registerAndParkName(name, minter, ZERO_ADDRESS, false);
      await assertOwnership(name, registrantAddress);

      await expect(custody.safeTransfer(registrantAddress, node)).to.be.revertedWithCustomError(
        custody,
        'Unauthorised',
      );
    });

    it('should revert registration by non-minter', async () => {
      const name = 'ts-nb22';
      await topupCustody(name);

      await expect(registerAndParkName(name, owner, ZERO_ADDRESS, false)).to.be.revertedWith(
        'MinterRole: CALLER_IS_NOT_MINTER',
      );
    });
  });

  describe('renew', () => {
    it('should renew parked name', async () => {
      const name = 'ts-na91';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);
      const price = await topupCustody(name, REGISTRATION_TIME);
      const custodyBalance = await provider.getBalance(await custody.getAddress());
      const minterBalance = await provider.getBalance(minter.address);

      const tx = await custody.connect(minter).renew(name, REGISTRATION_TIME);

      await assertOwnership(name, registrantAddress);
      expect(await provider.getBalance(await custody.getAddress())).to.equal(custodyBalance - price);
      await assertGasSpent(minter.address, minterBalance, [tx]);
    });

    it('should renew non-parked name paid by custody contract', async () => {
      const name = 'tx-nn14';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, true);
      const price = await topupCustody(name, REGISTRATION_TIME);

      const custodyBalance = await provider.getBalance(await custody.getAddress());
      const minterBalance = await provider.getBalance(minter.address);
      const tx = await custody.connect(minter).renew(name, REGISTRATION_TIME);
      await assertOwnership(name, registrantAddress, true);
      expect(await provider.getBalance(await custody.getAddress())).to.equal(custodyBalance - price);
      await assertGasSpent(minter.address, minterBalance, [tx]);
    });

    it('should emit NameRenewed event when parked name is renewed', async () => {
      const name = 'tx-s62';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);
      await topupCustody(name, REGISTRATION_TIME);
      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.emit(controller, 'NameRenewed');
    });

    it('should emit NameRenewed event when non-parked name is renewed', async () => {
      const name = 'ttmf-s12';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, true);
      await topupCustody(name, REGISTRATION_TIME);
      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.emit(controller, 'NameRenewed');
    });

    it('should revert renewing when custody has not enough balance', async () => {
      const name = 'ts-qv45';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.be.revertedWithCustomError(
        custody,
        'CustodyNotEnoughBalance',
      );
    });

    it('should revert renewing by non-minter', async () => {
      const name = 'ts-nb22';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await expect(custody.renew(name, REGISTRATION_TIME)).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
    });

    it('should revert renewing of expired domain', async () => {
      const name = 'ts-np12';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      const gracePeriod = 90 * DAY;
      await increaseTimeBy(REGISTRATION_TIME + gracePeriod + 1);

      await topupCustody(name);
      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.be.revertedWithoutReason();
    });

    it('should revert renewing if domain does not exist', async () => {
      const name = 'dm-not-exist-1';
      await topupCustody(name, REGISTRATION_TIME);
      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.be.revertedWithoutReason();
      expect(await controller.available(name)).to.equal(true);
    });

    it('should renew non-parked ERC721 paid by custody contract', async () => {
      const name = 'tx-nn721';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, true);
      const price = await topupCustody(name, REGISTRATION_TIME);

      const tokenId = sha3(name);
      await nameWrapper.connect(registrant).unwrapETH2LD(tokenId, registrantAddress, registrantAddress);

      const custodyBalance = await provider.getBalance(await custody.getAddress());
      const minterBalance = await provider.getBalance(minter.address);
      const tx = await custody.connect(minter).renew(name, REGISTRATION_TIME);
      expect(await ensRegistry.owner(namehash(`${name}.eth`))).to.equal(registrantAddress);
      expect(await provider.getBalance(await custody.getAddress())).to.equal(custodyBalance - price);
      await assertGasSpent(minter.address, minterBalance, [tx]);
    });
  });

  describe('ownerOf', () => {
    it('returns the owner of parked domain', async () => {
      const name = 'tb-45g';
      const node = namehash(`${name}.eth`);

      await topupCustody(name);

      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      expect(await custody.ownerOf(node)).to.equal(registrantAddress);
    });

    it('reverts with InvalidToken error if token not known', async () => {
      const node = namehash('not-existent.eth');

      await expect(custody.ownerOf(node)).to.be.revertedWithCustomError(custody, 'InvalidToken');
    });

    it('reverts with UnknownToken if subdomain was externally claimed from custody', async () => {
      const name = 'ts-bb12-sub-owner-test';
      const subName = `sub.${name}`;

      const node = namehash(`${name}.eth`);
      const subNode = namehash(`${subName}.eth`);

      const timestamp = await getLatestBlockTimestamp();
      await registerName(name);

      const expiry = BigInt(timestamp) + (await controller.minCommitmentAge());
      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);
      await assertOwnership(subName, registrantAddress, true);

      await expect(
        nameWrapper
          .connect(registrant)
          .safeTransferFrom(
            registrantAddress,
            await custody.getAddress(),
            subNode,
            1,
            new ethers.AbiCoder().encode(['address'], [registrantAddress]),
          ),
      ).to.emit(custody, 'Parked');
      await assertOwnership(subName, registrantAddress, false);

      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);

      expect(await nameWrapper.ownerOf(subNode)).to.equal(registrantAddress);

      await expect(custody.ownerOf(subNode)).to.be.revertedWithCustomError(custody, 'UnknownToken');
    });
  });

  describe('setBaseRegistrar', async () => {
    it('sets the registrar only if owner is calling', async () => {
      await custody.connect(owner).setBaseRegistrar(await baseRegistrar.getAddress());

      await expect(custody.connect(registrant).setBaseRegistrar(ZERO_ADDRESS)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  describe('safeTransfer', async () => {
    it('should transfer parked domain', async () => {
      const name = 'claim-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await custody.connect(registrant).safeTransfer(newOwnerAddress, tokenId);

      await expect(custody.ownerOf(tokenId)).to.be.revertedWithCustomError(custody, 'InvalidToken');

      expect(await nameWrapper.ownerOf(tokenId)).to.be.equal(newOwnerAddress);
    });

    it('should reject if token is not registered', async () => {
      const tokenId = namehash('not-registered.eth');

      await expect(custody.connect(registrant).safeTransfer(newOwnerAddress, tokenId)).to.be.revertedWithCustomError(
        custody,
        'InvalidToken',
      );
    });

    it('should reject if token is expired', async () => {
      const name = 'claim-expired-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      const gracePeriod = 90 * DAY;
      await increaseTimeBy(REGISTRATION_TIME + gracePeriod + 1);

      await expect(custody.connect(registrant).safeTransfer(newOwnerAddress, tokenId)).to.be.revertedWithCustomError(
        custody,
        'UnknownToken',
      );
    });

    it('should reject if sender is not owner', async () => {
      const name = 'claim-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await expect(custody.connect(minter).safeTransfer(newOwnerAddress, tokenId)).to.be.revertedWithCustomError(
        custody,
        'Unauthorised',
      );
    });
  });

  describe('internalTransfer', async () => {
    it('should interally transfer parked domain', async () => {
      const name = 'internal-transfer-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await expect(custody.connect(registrant).internalTransfer(newOwnerAddress, tokenId))
        .to.emit(custody, 'Parked')
        .withArgs(tokenId, newOwnerAddress);

      expect(await custody.ownerOf(tokenId)).to.be.equal(newOwnerAddress);
      expect(await nameWrapper.ownerOf(tokenId)).to.be.equal(await custody.getAddress());
    });

    it('should reject if token is not registered', async () => {
      const tokenId = namehash('not-registered.eth');

      await expect(
        custody.connect(registrant).internalTransfer(newOwnerAddress, tokenId),
      ).to.be.revertedWithCustomError(custody, 'InvalidToken');
    });

    it('should reject if token is expired', async () => {
      const name = 'internal-transfer-expired-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      const gracePeriod = 90 * DAY;
      await increaseTimeBy(REGISTRATION_TIME + gracePeriod + 1);

      await expect(
        custody.connect(registrant).internalTransfer(newOwnerAddress, tokenId),
      ).to.be.revertedWithCustomError(custody, 'UnknownToken');
    });

    it('should reject if sender is not owner', async () => {
      const name = 'internal-transfer-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await expect(custody.connect(minter).internalTransfer(newOwnerAddress, tokenId)).to.be.revertedWithCustomError(
        custody,
        'Unauthorised',
      );
    });
  });

  describe('multicall', async () => {
    it('should execute multiple transactions', async () => {
      const name = 'multicall-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name, REGISTRATION_TIME * 2);

      const commitment = await custody.makeCommitment(
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret,
        resolver,
        [],
        false,
        0,
        false,
      );
      await custody.connect(minter).commit(commitment);
      await increaseTimeBy(await controller.minCommitmentAge());

      const timestamp = await getLatestBlockTimestamp();

      const registerTxData = custody.interface.encodeFunctionData('register', [
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret as string,
        await resolver.getAddress(),
        [],
        false,
        0,
        false,
      ]);
      const renewTxData = custody.interface.encodeFunctionData('renew', [name, REGISTRATION_TIME]);

      await custody.connect(minter).multicall([registerTxData, renewTxData]);

      expect(await nameWrapper.ownerOf(tokenId)).to.be.equal(await custody.getAddress());
      expect(await custody.ownerOf(tokenId)).to.be.equal(registrantAddress);

      const expiry = await baseRegistrar.nameExpires(sha3(name));

      expect(expiry).to.be.greaterThanOrEqual(timestamp + REGISTRATION_TIME * 2);
    });

    it('revert multicall tx when one of the internal tx reverts', async () => {
      const name = 'multicall-revert-test';
      const tokenId = namehash(`${name}.eth`);

      await topupCustody(name);

      const commitment = await custody.makeCommitment(
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret,
        resolver,
        [],
        false,
        0,
        false,
      );
      await custody.connect(minter).commit(commitment);
      await increaseTimeBy(await controller.minCommitmentAge());

      const registerTxData = custody.interface.encodeFunctionData('register', [
        name,
        registrantAddress,
        REGISTRATION_TIME,
        secret as string,
        await resolver.getAddress(),
        [],
        false,
        0,
        false,
      ]);
      const renewTxData = custody.interface.encodeFunctionData('safeTransfer', [registrantAddress, tokenId]);

      await expect(custody.connect(minter).multicall([registerTxData, renewTxData])).to.be.revertedWithCustomError(
        custody,
        'Unauthorised',
      );
    });
  });

  describe('ERC165', function () {
    const INTERFACES = {
      ERC165: ['supportsInterface(bytes4)'],
      ERC721Receiver: ['onERC721Received(address,address,uint256,bytes)'],
      ERC1155Receiver: [
        'onERC1155Received(address,address,uint256,uint256,bytes)',
        'onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)',
      ],
    };

    const INTERFACE_IDS = {};
    const FN_SIGNATURES = {};
    for (const k of Object.getOwnPropertyNames(INTERFACES)) {
      INTERFACE_IDS[k] = makeInterfaceId(INTERFACES[k]);
      for (const fnName of INTERFACES[k]) {
        // the interface id of a single function is equivalent to its function signature
        FN_SIGNATURES[fnName] = makeInterfaceId([fnName]);
      }
    }

    it('all interfaces are reported as supported', async function () {
      for (const k of ['ERC165', 'ERC721Receiver', 'ERC1155Receiver']) {
        const interfaceId = INTERFACE_IDS[k] ?? k;
        expect(await custody.supportsInterface(interfaceId)).to.equal(true, `does not support ${k}`);
      }
    });

    it('all interface functions are in ABI', async function () {
      for (const k of ['ERC165', 'ERC721Receiver', 'ERC1155Receiver']) {
        // skip interfaces for which we don't have a function list
        if (INTERFACES[k] === undefined) continue;
        for (const fnName of INTERFACES[k]) {
          expect(custody.interface.getFunction(fnName)).to.not.be.null;
        }
      }
    });
  });
});
