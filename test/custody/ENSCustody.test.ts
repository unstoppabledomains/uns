import { ethers, upgrades } from 'hardhat';
import { expect } from 'chai';
import { namehash } from 'ethers/lib/utils';
import { sha3Raw as sha3 } from 'web3-utils';
import { BigNumber, ContractTransaction } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
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

describe('ENSCustody', function () {
  let provider;
  let result;

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
    const { timestamp } = await provider.getBlock(tx.blockNumber);
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await provider.send('evm_increaseTime', [(await controller.minCommitmentAge()).toNumber()]);

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
    const { timestamp } = await provider.getBlock(commitTx.blockNumber);
    expect(await controller.commitments(commitment)).to.equal(timestamp);

    await provider.send('evm_increaseTime', [(await controller.minCommitmentAge()).toNumber()]);

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
    const price = base.add(premium);
    await owner.sendTransaction({ to: custody.address, value: price });
    return price;
  }

  async function assertGasSpent (address: string, prevBalance: BigNumber, txs: ContractTransaction[]) {
    let spent = BigNumber.from(0);
    for (const tx of txs) {
      const receipt = await provider.getTransactionReceipt(tx.hash);
      const gasFee = receipt.gasUsed.mul(tx.gasPrice);
      spent = spent.add(gasFee);
    }
    expect(await provider.getBalance(address)).to.equal(prevBalance.sub(spent));
  }

  async function assertOwnership (name: string, owner: string, selfCustody = false) {
    const tokenId = sha3(name);
    const node = namehash(`${name}.eth`);

    // if 2LD
    if (name.split('.').length === 1) {
      expect(await controller.available(name)).to.equal(false);
      expect(await baseRegistrar.ownerOf(tokenId)).to.equal(nameWrapper.address);
    }

    expect(await ensRegistry.owner(node)).to.equal(nameWrapper.address);

    if (selfCustody) {
      expect(await nameWrapper.ownerOf(node)).to.equal(owner);
    } else {
      expect(await nameWrapper.ownerOf(node)).to.equal(custody.address);
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

    ensRegistry = await new ENSRegistry__factory(owner).deploy();
    baseRegistrar = await new BaseRegistrarImplementation__factory(owner).deploy(ensRegistry.address, namehash('eth'));
    reverseRegistrar = await new ReverseRegistrar__factory(owner).deploy(ensRegistry.address);

    await ensRegistry.setSubnodeOwner(ZERO_WORD, sha3('reverse'), ownerAddress);
    await ensRegistry.setSubnodeOwner(namehash('reverse'), sha3('addr'), reverseRegistrar.address);

    nameWrapper = await new NameWrapper__factory(owner).deploy(
      ensRegistry.address,
      baseRegistrar.address,
      ownerAddress,
    );

    await ensRegistry.setSubnodeOwner(ZERO_WORD, sha3('eth'), baseRegistrar.address);

    const dummyOracle = await new DummyOracle__factory(owner).deploy('100000000');
    priceOracle = await new StablePriceOracle__factory(owner).deploy(dummyOracle.address, [0, 0, 4, 2, 1]);
    controller = await new ETHRegistrarController__factory(owner).deploy(
      baseRegistrar.address,
      priceOracle.address,
      600,
      86400,
      reverseRegistrar.address,
      nameWrapper.address,
      ensRegistry.address,
    );
    await nameWrapper.setController(controller.address, true);
    await baseRegistrar.addController(nameWrapper.address);
    await reverseRegistrar.setController(controller.address, true);

    resolver = await new PublicResolver__factory(owner).deploy(
      ensRegistry.address,
      nameWrapper.address,
      controller.address,
      reverseRegistrar.address,
    );

    custody = (await upgrades.deployProxy(new ENSCustody__factory(owner), [
      controller.address,
      nameWrapper.address,
      baseRegistrar.address,
    ])) as ENSCustody;
    await custody.addMinter(minter.address);

    erc1155 = await new ERC1155Mock__factory(owner).deploy('');
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
    expect(await ensRegistry.owner(node)).to.equal(nameWrapper.address);
    expect(await baseRegistrar.ownerOf(tokenId)).to.equal(nameWrapper.address);
    expect(await nameWrapper.ownerOf(node)).to.equal(registrantAddress);
  });

  it('should return correct rent price', async () => {
    const name = 'ts-pa92';
    const [base, premium] = await controller.rentPrice(name, REGISTRATION_TIME);
    const price = base.add(premium);

    expect(await custody.rentPrice(name, REGISTRATION_TIME)).to.equal(price);
  });

  describe('wrapped ERC1155 parking', async () => {
    it('should receive and park a ERC1155 ENS domain', async () => {
      const name = 'ts-ww12';
      const node = namehash(`${name}.eth`);

      await registerName(name);

      await expect(
        nameWrapper.connect(registrant).safeTransferFrom(
          registrantAddress,
          custody.address,
          node,
          1,
          new ethers.utils.AbiCoder().encode(['address'], [registrantAddress]),
        ),
      ).to.emit(custody, 'Parked');

      await assertOwnership(name, registrantAddress, false);
    });

    it('should receive and park a ERC1155 ENS domain to data specified owner', async () => {
      const name = 'ts-ww123';
      const node = namehash(`${name}.eth`);

      await registerName(name);

      await nameWrapper.connect(registrant).safeTransferFrom(
        registrantAddress,
        custody.address,
        node,
        1,
        new ethers.utils.AbiCoder().encode(['address'], [newOwnerAddress]),
      );

      await assertOwnership(name, newOwnerAddress, false);
    });

    it('should not allow to park a ERC1155 ENS domain if no data provided', async () => {
      const name = 'ts-ww123-no-data';
      const node = namehash(`${name}.eth`);

      await registerName(name);

      await expect(
        nameWrapper.connect(registrant).safeTransferFrom(
          registrantAddress,
          custody.address,
          node,
          1,
          '0x',
        ),
      ).to.be.reverted;
    });

    it('should allow ERC1155 tokens only from ENS wrapper', async () => {
      const erc1155TokenId1 = 1;

      await erc1155.mint(owner.address, erc1155TokenId1, 1, '0x');

      await expect(
        erc1155.safeTransferFrom(
          owner.address,
          custody.address,
          erc1155TokenId1,
          1,
          new ethers.utils.AbiCoder().encode(['address'], [ownerAddress]),
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
            custody.address,
            [node1, node2],
            [1, 1],
            new ethers.utils.AbiCoder().encode(['address'], [registrantAddress]),
          ),
      ).to.emit(custody, 'Parked');

      await assertOwnership(name1, registrantAddress);
      await assertOwnership(name2, registrantAddress);
    });

    it('should allow ERC1155 tokens only from ENS wrapper for batch transfers', async () => {
      const erc1155TokenId1 = 1;
      const erc1155TokenId2 = 2;

      await erc1155.mint(owner.address, erc1155TokenId1, 1, '0x');
      await erc1155.mint(owner.address, erc1155TokenId2, 1, '0x');

      await expect(
        erc1155.safeBatchTransferFrom(
          owner.address,
          custody.address,
          [
            erc1155TokenId1,
            erc1155TokenId2,
          ],
          [1, 1],
          new ethers.utils.AbiCoder().encode(['address'], [registrantAddress]),
        ),
      ).to.be.revertedWith('ERC1155: transfer to non ERC1155Receiver implementer');
    });

    it('should allow parking a ERC1155 ENS subdomain', async () => {
      const name = 'ts-bb12-sub-test';
      const subName = `sub.${name}`;

      const node = namehash(`${name}.eth`);
      const subNode = namehash(`${subName}.eth`);

      const { timestamp } = await provider.getBlock('latest');
      await registerName(name);

      const expiry = timestamp + (await controller.minCommitmentAge()).toNumber();
      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);
      await assertOwnership(subName, registrantAddress, true);

      await expect(
        nameWrapper.connect(registrant).safeTransferFrom(
          registrantAddress,
          custody.address,
          subNode,
          1,
          new ethers.utils.AbiCoder().encode(['address'], [registrantAddress]),
        ),
      ).to.emit(custody, 'Parked');

      await assertOwnership(subName, registrantAddress, false);
    });

    it('should allow parking a ERC1155 ENS subdomain with batch transfer', async () => {
      const name = 'ts-bb42-sub-test2';
      const subName = `sub.${name}`;

      const node = namehash(`${name}.eth`);
      const subNode = namehash(`${subName}.eth`);

      const { timestamp } = await provider.getBlock('latest');
      await registerName(name);

      const expiry = timestamp + (await controller.minCommitmentAge()).toNumber();
      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);
      await assertOwnership(subName, registrantAddress, true);

      await expect(
        nameWrapper.connect(registrant).safeBatchTransferFrom(
          registrantAddress,
          custody.address,
          [subNode],
          [1],
          new ethers.utils.AbiCoder().encode(['address'], [newOwnerAddress]),
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

      const abiCoder = new ethers.utils.AbiCoder();

      const wrapTx = await baseRegistrar
        .connect(registrant)
        ['safeTransferFrom(address,address,uint256,bytes)'](
          registrant.address,
          custody.address,
          labelHash,
          abiCoder.encode(
            ['address', 'address', 'string'],
            [registrantAddress, resolver.address, name],
          ),
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

      const abiCoder = new ethers.utils.AbiCoder();

      const wrapTx = await baseRegistrar
        .connect(registrant)
        ['safeTransferFrom(address,address,uint256,bytes)'](
          registrant.address,
          custody.address,
          labelHash,
          abiCoder.encode(
            ['address', 'address', 'string'],
            [newOwnerAddress, resolver.address, name],
          ),
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

      const abiCoder = new ethers.utils.AbiCoder();

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            registrant.address,
            custody.address,
            labelHash,
            abiCoder.encode(
              ['address', 'address', 'string'],
              [registrantAddress, resolver.address, name],
            ),
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

      const abiCoder = new ethers.utils.AbiCoder();
      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256,bytes)'](
            registrant.address,
            custody.address,
            labelHash,
            abiCoder.encode(
              ['address', 'address', 'string'],
              [newOwnerAddress, resolver.address, invalidName],
            ),
          ),
      ).to.be.revertedWith(`LabelMismatch("${invalidLabelHash}", "${labelHash}")`);
    });

    it('should reject if no data is passed', async () => {
      const name = 'auto-wrap-parking-test3';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256)'](registrant.address, custody.address, labelHash),
      ).to.be.reverted;
    });

    it('should revert if no owner address is specified in data', async () => {
      const name = 'auto-wrap-parking-test-data';
      const labelHash = sha3(name);

      await registerAndUnwrapName(name);
      await assertWrapped(name, false);

      const abiCoder = new ethers.utils.AbiCoder();

      await expect(baseRegistrar
        .connect(registrant)
        ['safeTransferFrom(address,address,uint256,bytes)'](
          registrant.address,
          custody.address,
          labelHash,
          abiCoder.encode(
            ['address', 'string'],
            [resolver.address, name],
          ),
        ),
      ).to.be.reverted;
    });

    it('should reject transferring if called not from regisrar', async () => {
      const erc721Mock = await new ERC721Mock__factory(owner).deploy();

      await expect(erc721Mock.mint(custody.address, 1)).to.be.revertedWith('OperationProhibited()');
    });

    it('unwrapped subdomains should not be a ERC721 token', async () => {
      const name = 'awesome-parent42';

      await registerAndUnwrapName(name);

      await ensRegistry.connect(registrant).setSubnodeOwner(namehash(`${name}.eth`), sha3('sub'), registrantAddress);

      expect(await ensRegistry.owner(namehash(`sub.${name}.eth`))).to.equal(registrantAddress);

      await expect(
        baseRegistrar
          .connect(registrant)
          ['safeTransferFrom(address,address,uint256)'](registrant.address, custody.address, sha3(`sub.${name}`)),
      ).to.be.reverted;
    });
  });

  describe('register', () => {
    it('should register and park name', async () => {
      const name = 'ts-ld91';
      const price = await topupCustody(name);
      const custodyBalance = await provider.getBalance(custody.address);
      const minterBalance = await provider.getBalance(minter.address);

      const txs = await registerAndParkName(name, minter, ZERO_ADDRESS, false);

      await assertOwnership(name, registrantAddress);
      expect(await provider.getBalance(custody.address)).to.equal(custodyBalance.sub(price));
      await assertGasSpent(minter.address, minterBalance, txs);
    });

    it('should register and emit just one Parked event', async () => {
      const name = 'ts-ld92';
      await topupCustody(name);

      const [, registerTx] = await registerAndParkName(name, minter, ZERO_ADDRESS, false);
      await assertOwnership(name, registrantAddress);

      const receipt = await registerTx.wait();

      expect(receipt.events?.filter(({ event }) => event === 'Parked').length).to.be.equal(1);
    });

    it('should revert when custody has not enough balance', async () => {
      const name = 'ts-tw75';

      await expect(registerAndParkName(name, minter, ZERO_ADDRESS, false)).to.be.revertedWith(
        'CustodyNotEnoughBalance',
      );
    });

    it('should register and park name with resolver', async () => {
      const name = 'ts-tw14';
      const price = await topupCustody(name);

      const balance = await provider.getBalance(custody.address);
      await registerAndParkName(name, minter, resolver.address, false);

      await assertOwnership(name, registrantAddress);
      expect(await provider.getBalance(custody.address)).to.equal(balance.sub(price));
    });

    it('should register and park name with resolver and initial records', async () => {
      const name = 'ts-ll84';
      const node = namehash(`${name}.eth`);
      const callData = [resolver.interface.encodeFunctionData('setAddr(bytes32,address)', [node, registrantAddress])];
      await topupCustody(name);

      await registerAndParkName(name, minter, resolver.address, false, callData);

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

      await expect(custody.safeTransfer(registrantAddress, node)).to.be.revertedWith('Unauthorised');
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
      const custodyBalance = await provider.getBalance(custody.address);
      const minterBalance = await provider.getBalance(minter.address);

      const tx = await custody.connect(minter).renew(name, REGISTRATION_TIME);

      await assertOwnership(name, registrantAddress);
      expect(await provider.getBalance(custody.address)).to.equal(custodyBalance.sub(price));
      await assertGasSpent(minter.address, minterBalance, [tx]);
    });

    it('should renew non-parked name paid by custody contract', async () => {
      const name = 'tx-nn14';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, true);
      const price = await topupCustody(name, REGISTRATION_TIME);

      const custodyBalance = await provider.getBalance(custody.address);
      const minterBalance = await provider.getBalance(minter.address);
      const tx = await custody.connect(minter).renew(name, REGISTRATION_TIME);
      await assertOwnership(name, registrantAddress, true);
      expect(await provider.getBalance(custody.address)).to.equal(custodyBalance.sub(price));
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

      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.be.revertedWith(
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
      await provider.send('evm_increaseTime', [REGISTRATION_TIME + gracePeriod + 1]);

      await topupCustody(name);
      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.be.revertedWith('');
    });

    it('should revert renewing if domain does not exist', async () => {
      const name = 'dm-not-exist-1';
      await topupCustody(name, REGISTRATION_TIME);
      await expect(custody.connect(minter).renew(name, REGISTRATION_TIME)).to.be.revertedWith('');
      expect(await controller.available(name)).to.equal(true);
    });

    it('should renew non-parked ERC721 paid by custody contract', async () => {
      const name = 'tx-nn721';
      await topupCustody(name);
      await registerAndParkName(name, minter, ZERO_ADDRESS, true);
      const price = await topupCustody(name, REGISTRATION_TIME);

      const tokenId = sha3(name);
      await nameWrapper.connect(registrant).unwrapETH2LD(tokenId, registrantAddress, registrantAddress);

      const custodyBalance = await provider.getBalance(custody.address);
      const minterBalance = await provider.getBalance(minter.address);
      const tx = await custody.connect(minter).renew(name, REGISTRATION_TIME);
      expect(await ensRegistry.owner(namehash(`${name}.eth`))).to.equal(registrantAddress);
      expect(await provider.getBalance(custody.address)).to.equal(custodyBalance.sub(price));
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

      await expect(custody.ownerOf(node)).to.be.revertedWith('InvalidToken');
    });

    it('reverts with UnknownToken if subdomain was externally claimed from custody', async () => {
      const name = 'ts-bb12-sub-owner-test';
      const subName = `sub.${name}`;

      const node = namehash(`${name}.eth`);
      const subNode = namehash(`${subName}.eth`);

      const { timestamp } = await provider.getBlock('latest');
      await registerName(name);

      const expiry = timestamp + (await controller.minCommitmentAge()).toNumber();
      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);
      await assertOwnership(subName, registrantAddress, true);

      await expect(
        nameWrapper.connect(registrant).safeTransferFrom(
          registrantAddress,
          custody.address,
          subNode,
          1,
          new ethers.utils.AbiCoder().encode(['address'], [registrantAddress]),
        ),
      ).to.emit(custody, 'Parked');
      await assertOwnership(subName, registrantAddress, false);

      await nameWrapper.connect(registrant).setSubnodeOwner(node, 'sub', registrantAddress, 0, expiry);

      expect(await nameWrapper.ownerOf(subNode)).to.equal(registrantAddress);

      await expect(custody.ownerOf(subNode)).to.be.revertedWith('UnknownToken');
    });
  });

  describe('setBaseRegistrar', async () => {
    it('sets the registrar only if owner is calling', async () => {
      await custody.connect(owner).setBaseRegistrar(baseRegistrar.address);

      await expect(custody.connect(registrant).setBaseRegistrar(ZERO_ADDRESS)).to.be.revertedWith(
        'Ownable: caller is not the owner',
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
          expect(Object.keys(custody.interface.functions).filter((fn) => fn === fnName).length).to.equal(
            1,
            `did not find ${fnName}`,
          );
        }
      }
    });
  });
});
