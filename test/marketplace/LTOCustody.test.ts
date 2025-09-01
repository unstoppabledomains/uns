import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { CreateOrderAction, CreateOrderInput, SeaportContract } from '@opensea/seaport-js/lib/types';
import { expect } from 'chai';
import { Signature, Signer, TypedDataEncoder } from 'ethers';
import { ethers } from 'hardhat';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { OrderStruct } from '@opensea/seaport-js/lib/typechain-types/seaport-core/src/lib/Consideration';
import { EIP_712_ORDER_TYPE, ItemType } from '@opensea/seaport-js/lib/constants';
import { getAdvancedOrderNumeratorDenominator } from '@opensea/seaport-js/lib/utils/fulfill';
import { HardhatEthersProvider } from '@nomicfoundation/hardhat-ethers/internal/hardhat-ethers-provider';
import { ConduitController__factory } from '../../types/factories/seaport-core/src/conduit';
import { Seaport__factory as SeaportContract__factory } from '../../types/factories/seaport-core/src';
import {
  MintingManager,
  MintingManager__factory,
  LTOCustody,
  LTOCustody__factory,
  RegistrarCustody,
  RegistrarCustody__factory,
  SeaportProxyBuyer,
  SeaportProxyBuyer__factory,
  UNSRegistry,
  UNSRegistry__factory,
  ERC20Mock,
  ConduitController,
  ERC20Mock__factory,
} from '../../types';
import { deployProxy } from '../../src/helpers';
import { ZERO_ADDRESS } from '../helpers/constants';
import { getLatestBlockTimestamp } from '../helpers/utils';
import { Reverter } from '../helpers/reverter';

describe('LTOCustody', () => {
  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    registrar: SignerWithAddress,
    custodyAdmin: SignerWithAddress,
    seller: SignerWithAddress,
    buyer: SignerWithAddress,
    otherUser: SignerWithAddress;

  let seaportContract: SeaportContract,
    conduitController: ConduitController,
    usdcMock: ERC20Mock,
    seaportProxyBuyerFactory: SeaportProxyBuyer__factory,
    seaportProxyBuyer: SeaportProxyBuyer,
    seaportSdk: seaportjs,
    unsRegistry: UNSRegistry,
    mintingManager: MintingManager,
    ltoCustody: LTOCustody,
    registrarCustody: RegistrarCustody;

  let provider: HardhatEthersProvider;
  let latestBlockTimestamp: number;

  const registrarId = BigInt(42);
  let nftIdToTrade: bigint;

  const reverter: Reverter = new Reverter();

  const generateSellOrderInputData = async (
    tokenIdentifier: bigint,
    priceToSell: bigint,
    zone?: string,
  ): Promise<CreateOrderInput> => {
    return {
      zone,
      restrictedByZone: true,
      offer: [
        {
          token: await unsRegistry.getAddress(),
          itemType: ItemType.ERC721,
          identifier: tokenIdentifier.toString(),
        },
      ],
      consideration: [
        {
          token: await usdcMock.getAddress(),
          amount: priceToSell.toString(),
        },
      ],
    };
  };

  const generateBuyOrderInputData = async (
    tokenIdentifier: bigint,
    priceToSell: bigint,
    zone?: string,
  ): Promise<CreateOrderInput> => {
    return {
      zone,
      restrictedByZone: true,
      offer: [
        {
          token: await usdcMock.getAddress(),
          amount: priceToSell.toString(),
        },
      ],
      consideration: [
        {
          token: await unsRegistry.getAddress(),
          itemType: ItemType.ERC721,
          identifier: tokenIdentifier.toString(),
        },
      ],
    };
  };

  const createOrder = async (data: CreateOrderInput, customer: SignerWithAddress) => {
    seaportSdk = new seaportjs(customer as unknown as Signer, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });

    const order = await seaportSdk.createOrder(data, customer.address);
    const seaportOrderData = await order.executeAllActions();
    const fulfillOrderData: OrderStruct = {
      ...seaportOrderData,
      parameters: {
        ...seaportOrderData.parameters,
        consideration: seaportOrderData.parameters.consideration,
        totalOriginalConsiderationItems: seaportOrderData.parameters.consideration.length,
      },
    };
    const { numerator, denominator } = getAdvancedOrderNumeratorDenominator(seaportOrderData);

    const hash = ethers.toBigInt(seaportSdk.getOrderHash(seaportOrderData.parameters));
    return { fulfillOrderData, numerator, denominator, hash };
  };

  const createRegistrarCustodyOrder = async (tokenId: bigint, priceToSell: bigint, zone?: string) => {
    seaportSdk = new seaportjs(registrar as unknown as Signer, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });

    const order = await seaportSdk.createOrder(
      await generateSellOrderInputData(tokenId, priceToSell, zone),
      await registrarCustody.getAddress(),
    );
    const createOrderAction = order.actions[0] as CreateOrderAction;

    const { domain, message } = JSON.parse(await createOrderAction.getMessageToSign());
    const eip712Hash = TypedDataEncoder.hash(domain, EIP_712_ORDER_TYPE, message);

    const seaportOrderData = await order.executeAllActions();
    const fulfillOrderData: OrderStruct = {
      signature: Signature.from(seaportOrderData.signature).serialized,
      parameters: {
        ...seaportOrderData.parameters,
        consideration: seaportOrderData.parameters.consideration,
        totalOriginalConsiderationItems: seaportOrderData.parameters.consideration.length,
      },
    };
    const { numerator, denominator } = getAdvancedOrderNumeratorDenominator(seaportOrderData);

    return { fulfillOrderData, eip712Hash, numerator, denominator };
  };

  before(async () => {
    provider = ethers.provider;
    signers = await ethers.getSigners();
    [coinbase, registrar, custodyAdmin, seller, buyer, otherUser] = signers;

    unsRegistry = await new UNSRegistry__factory().connect(coinbase).deploy();
    mintingManager = await new MintingManager__factory().connect(coinbase).deploy();
    await unsRegistry.initialize(await mintingManager.getAddress(), ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);

    await mintingManager.initialize(
      await unsRegistry.getAddress(),
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    );
    await mintingManager.setTokenURIPrefix('/');
    await mintingManager.addTld('com', true);
    await mintingManager.addTld('crypto', false);

    latestBlockTimestamp = await getLatestBlockTimestamp();

    // setup seaport for initializing ltos
    conduitController = await new ConduitController__factory().connect(coinbase).deploy();
    seaportContract = await new SeaportContract__factory()
      .connect(coinbase)
      .deploy(await conduitController.getAddress());
    usdcMock = await new ERC20Mock__factory().connect(coinbase).deploy();

    seaportProxyBuyerFactory = new SeaportProxyBuyer__factory().connect(coinbase);
    seaportProxyBuyer = (await deployProxy<SeaportProxyBuyer>(
      seaportProxyBuyerFactory,
      [await seaportContract.getAddress(), await usdcMock.getAddress()],
      { initializer: false },
    )) as SeaportProxyBuyer;
    await seaportProxyBuyer.initialize(await seaportContract.getAddress());
    await seaportProxyBuyer.connect(coinbase).approve(await usdcMock.getAddress());
    await seaportProxyBuyer.addMinter(coinbase.address);

    seaportSdk = new seaportjs(registrar as unknown as Signer, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });

    await usdcMock.mint(await seaportProxyBuyer.getAddress(), ethers.parseUnits('250000', 6));

    ltoCustody = await deployProxy(new LTOCustody__factory().connect(coinbase), [
      await unsRegistry.getAddress(),
      await mintingManager.getAddress(),
      await seaportProxyBuyer.getAddress(),
    ]);

    await ltoCustody.connect(coinbase).addCustodyAdmin(custodyAdmin.address);
    await seaportProxyBuyer.addMinter(await ltoCustody.getAddress());

    // registrar custody for testing registrar custody integration
    registrarCustody = await deployProxy(new RegistrarCustody__factory().connect(coinbase), [
      await unsRegistry.getAddress(),
      await mintingManager.getAddress(),
    ]);

    await mintingManager.addMinter(registrar.address);
    await mintingManager.addMinter(await registrarCustody.getAddress());

    await registrarCustody.connect(coinbase).addAdmin(registrar.address);
    await registrarCustody.connect(coinbase).addRegistrar(registrarId, registrar.address);
    await registrarCustody.connect(coinbase).setApprovalForAll(await seaportContract.getAddress(), true);

    const labels = ['brad', 'crypto'];
    nftIdToTrade = await unsRegistry.namehash(labels);
    await mintingManager.connect(registrar).issueWithRecords(seller.address, labels, [], [], true);

    await usdcMock.mint(await seaportProxyBuyer.getAddress(), ethers.parseUnits('250000', 6));
    await usdcMock.mint(await buyer.getAddress(), ethers.parseUnits('250000', 6));

    await unsRegistry.connect(seller).setApprovalForAll(await seaportContract.getAddress(), true);
    await unsRegistry.connect(seller).setApprovalForAll(await seaportProxyBuyer.getAddress(), true);

    await reverter.snapshot();
  });

  afterEach(async () => {
    await reverter.revert();
  });

  describe('initiate lto', () => {
    describe('initiateLTOFromOrder', () => {
      it('should initiate lto from order offer', async () => {
        const priceToSell = ethers.parseUnits('100', 6);
        const { fulfillOrderData, numerator, denominator } = await createOrder(
          await generateSellOrderInputData(nftIdToTrade, priceToSell, await seaportProxyBuyer.getAddress()),
          seller,
        );
        const ltoId = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, nftIdToTrade, 0);
        await (
          await ltoCustody
            .connect(custodyAdmin)
            .initiateLTOFromOrder(
              { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
              [],
              ethers.ZeroHash,
              buyer.address,
            )
        ).wait();

        const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
        expect(domainOwner).to.be.eq(await ltoCustody.getAddress());

        const lto = await ltoCustody.ltoAssets(ltoId);
        expect(lto.seller).to.be.eq(seller.address);
        expect(lto.buyer).to.be.eq(buyer.address);
        expect(lto.tokenId).to.be.eq(nftIdToTrade);
      });

      it('should revert for buy orders', async () => {
        const priceToSell = ethers.parseUnits('100', 6);
        const { fulfillOrderData, numerator, denominator } = await createOrder(
          await generateBuyOrderInputData(nftIdToTrade, priceToSell, await seaportProxyBuyer.getAddress()),
          buyer,
        );
        await expect(
          ltoCustody
            .connect(custodyAdmin)
            .initiateLTOFromOrder(
              { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
              [],
              ethers.ZeroHash,
              seller.address,
            ),
        ).to.be.revertedWithCustomError(ltoCustody, 'InvalidOrder');
      });

      it('should revert if order is invalid', async () => {
        const invalidOrder = {
          parameters: {
            orderType: 0, // FULL_OPEN instead of FULL_RESTRICTED
            offer: [],
            consideration: [],
            offerer: seller.address,
            zone: await seaportProxyBuyer.getAddress(),
            zoneHash: ethers.ZeroHash,
            salt: ethers.ZeroHash,
            conduitKey: ethers.ZeroHash,
            counter: 0,
            startTime: 0,
            endTime: 0,
            totalOriginalConsiderationItems: 0,
          },
          signature: '0x',
          numerator: 1,
          denominator: 1,
          extraData: '0x',
        };

        await expect(
          ltoCustody.connect(custodyAdmin).initiateLTOFromOrder(invalidOrder, [], ethers.ZeroHash, buyer.address),
        ).to.be.revertedWithCustomError(ltoCustody, 'InvalidOrder');
      });

      it('should revert if called by non-custody admin', async () => {
        const priceToSell = ethers.parseUnits('100', 6);
        const { fulfillOrderData, numerator, denominator } = await createOrder(
          await generateSellOrderInputData(nftIdToTrade, priceToSell, await seaportProxyBuyer.getAddress()),
          seller,
        );
        await expect(
          ltoCustody
            .connect(otherUser)
            .initiateLTOFromOrder(
              { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
              [],
              ethers.ZeroHash,
              buyer.address,
            ),
        ).to.be.revertedWithCustomError(ltoCustody, 'Unauthorized');
      });

      it('should revert if paused', async () => {
        const priceToSell = ethers.parseUnits('100', 6);
        const { fulfillOrderData, numerator, denominator } = await createOrder(
          await generateSellOrderInputData(nftIdToTrade, priceToSell, await seaportProxyBuyer.getAddress()),
          seller,
        );
        await ltoCustody.connect(coinbase).pause();
        await expect(
          ltoCustody
            .connect(custodyAdmin)
            .initiateLTOFromOrder(
              { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
              [],
              ethers.ZeroHash,
              buyer.address,
            ),
        ).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('initiateLTO', () => {
      it('should initiate lto directly', async () => {
        const ltoId = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, nftIdToTrade, 0);
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
        await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade);

        const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
        expect(domainOwner).to.be.eq(await ltoCustody.getAddress());

        const lto = await ltoCustody.ltoAssets(ltoId);
        expect(lto.seller).to.be.eq(seller.address);
        expect(lto.buyer).to.be.eq(buyer.address);
        expect(lto.tokenId).to.be.eq(nftIdToTrade);
      });

      // shared cases, can be tested with basic initiateLTO
      it('should re-initiate new lto with the same token after cancelling another', async () => {
        // Initiate first LTO
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
        await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade);

        // Cancel first LTO
        const ltoId1 = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, nftIdToTrade, 0);
        await ltoCustody.connect(custodyAdmin).cancel(ltoId1);

        // Re-initiate with same token
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
        await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade);

        const ltoId2 = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, nftIdToTrade, 1);
        const lto = await ltoCustody.ltoAssets(ltoId2);
        expect(lto.seller).to.be.eq(seller.address);
        expect(lto.buyer).to.be.eq(buyer.address);
        expect(lto.tokenId).to.be.eq(nftIdToTrade);
      });

      it('should revert if not called by custody admin', async () => {
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);

        await expect(
          ltoCustody.connect(otherUser).initiateLTO(seller.address, buyer.address, nftIdToTrade),
        ).to.be.revertedWithCustomError(ltoCustody, 'Unauthorized');
      });

      it('should revert if seller is invalid', async () => {
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);

        await expect(
          ltoCustody.connect(custodyAdmin).initiateLTO(ethers.ZeroAddress, buyer.address, nftIdToTrade),
        ).to.be.revertedWithCustomError(ltoCustody, 'InvalidSeller');
      });

      it('should revert if buyer is invalid', async () => {
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);

        await expect(
          ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, ethers.ZeroAddress, nftIdToTrade),
        ).to.be.revertedWithCustomError(ltoCustody, 'InvalidBuyer');
      });

      it('should revert if token is already in lto', async () => {
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
        await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade);

        // Try to initiate another LTO with same token
        await expect(
          ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade),
        ).to.be.revertedWithCustomError(ltoCustody, 'TokenAlreadyInLTO');
      });

      it('should revert if called by non-custody admin', async () => {
        await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);

        await expect(
          ltoCustody.connect(otherUser).initiateLTO(seller.address, buyer.address, nftIdToTrade),
        ).to.be.revertedWithCustomError(ltoCustody, 'Unauthorized');
      });

      it('should revert if paused', async () => {
        await ltoCustody.connect(coinbase).pause();
        await expect(
          ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade),
        ).to.be.revertedWith('Pausable: paused');
      });
    });
  });

  describe('lifecycle functions', () => {
    let ltoId: bigint;
    beforeEach(async () => {
      await unsRegistry.connect(seller).setApprovalForAll(await ltoCustody.getAddress(), true);
      await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade);
      ltoId = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, nftIdToTrade, 0);
    });

    describe('complete', () => {
      it('should complete lto', async () => {
        await ltoCustody.connect(custodyAdmin).complete(ltoId);

        const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
        expect(domainOwner).to.be.eq(buyer.address);

        const lto = await ltoCustody.ltoAssets(ltoId);
        expect(lto.isFinalized).to.be.eq(true);
        const owner = await unsRegistry.ownerOf(nftIdToTrade);
        expect(owner).to.be.eq(buyer.address);
      });

      it('should revert if lto is not initiated', async () => {
        const nonExistentLtoId = BigInt(999);
        await expect(ltoCustody.connect(custodyAdmin).complete(nonExistentLtoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'LTONotInitiated',
        );
      });

      it('should revert if lto is already finalized', async () => {
        await ltoCustody.connect(custodyAdmin).complete(ltoId);
        await expect(ltoCustody.connect(custodyAdmin).complete(ltoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'LTONotInitiated',
        );
      });

      it('should revert if not called by custody admin', async () => {
        await expect(ltoCustody.connect(buyer).complete(ltoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'Unauthorized',
        );
      });

      it('should revert if paused', async () => {
        await ltoCustody.connect(coinbase).pause();
        await expect(ltoCustody.connect(custodyAdmin).complete(ltoId)).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('cancel', () => {
      it('should cancel lto', async () => {
        await ltoCustody.connect(custodyAdmin).cancel(ltoId);

        const domainOwner = await unsRegistry.ownerOf(nftIdToTrade);
        expect(domainOwner).to.be.eq(seller.address);

        const lto = await ltoCustody.ltoAssets(ltoId);
        expect(lto.isFinalized).to.be.eq(true);
        const owner = await unsRegistry.ownerOf(nftIdToTrade);
        expect(owner).to.be.eq(seller.address);
      });

      it('should clean up lto data if asset is not in custody', async () => {
        const labels = ['stoppabledev', 'com'];
        const revokableNftId = await unsRegistry.namehash(labels);
        const expiry = latestBlockTimestamp + 60 * 60 * 24;
        await mintingManager
          .connect(registrar)
          .issueExpirableWithRecords(seller.address, labels, [], [], expiry, false);

        const revokableLtoId = await ltoCustody.getLtoCustodyId(seller.address, buyer.address, revokableNftId, 0);
        await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, revokableNftId);

        await mintingManager.connect(registrar).revoke(revokableNftId);

        await ltoCustody.connect(custodyAdmin).cancel(revokableLtoId);
        const lto = await ltoCustody.ltoAssets(revokableLtoId);
        expect(lto.isFinalized).to.be.eq(true);
        expect(await unsRegistry.ownerOf(revokableNftId)).to.be.eq(await mintingManager.getAddress());
      });

      it('should revert if lto is not initiated', async () => {
        const nonExistentLtoId = BigInt(999);
        await expect(ltoCustody.connect(custodyAdmin).cancel(nonExistentLtoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'LTONotInitiated',
        );
      });

      it('should revert if lto is already finalized', async () => {
        await ltoCustody.connect(custodyAdmin).complete(ltoId);
        await expect(ltoCustody.connect(custodyAdmin).cancel(ltoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'LTONotInitiated',
        );
      });

      it('should revert if not called by custody admin', async () => {
        await expect(ltoCustody.connect(buyer).cancel(ltoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'Unauthorized',
        );
      });

      it('should revert if paused', async () => {
        await ltoCustody.connect(coinbase).pause();
        await expect(ltoCustody.connect(custodyAdmin).cancel(ltoId)).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('revokeAsset', () => {
      it('should revoke lto asset', async () => {
        await ltoCustody.connect(custodyAdmin).revokeAsset(nftIdToTrade);

        const lto = await ltoCustody.ltoAssets(ltoId);
        expect(lto.isFinalized).to.be.eq(true);
        const owner = await unsRegistry.ownerOf(nftIdToTrade);
        expect(owner).to.be.eq(await mintingManager.getAddress());
      });

      it('should revert if lto is not initiated', async () => {
        const nonExistentLtoId = BigInt(999);
        await expect(ltoCustody.connect(custodyAdmin).revokeAsset(nonExistentLtoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'LTONotInitiated',
        );
      });

      it('should revert if not called by custody admin', async () => {
        await expect(ltoCustody.connect(buyer).revokeAsset(ltoId)).to.be.revertedWithCustomError(
          ltoCustody,
          'Unauthorized',
        );
      });

      it('should revert if paused', async () => {
        await ltoCustody.connect(coinbase).pause();
        await expect(ltoCustody.connect(custodyAdmin).revokeAsset(ltoId)).to.be.revertedWith('Pausable: paused');
      });
    });

    describe('transferSeller', () => {
      it('should transfer lto seller', async () => {
        await ltoCustody.connect(custodyAdmin).transferSeller(ltoId, otherUser.address);

        const lto = await ltoCustody.ltoAssets(ltoId);
        expect(lto.seller).to.be.eq(otherUser.address);
        expect(lto.buyer).to.be.eq(buyer.address);
        expect(lto.tokenId).to.be.eq(nftIdToTrade);
      });

      it('should revert if lto is not initiated', async () => {
        const nonExistentLtoId = BigInt(999);
        await expect(
          ltoCustody.connect(custodyAdmin).transferSeller(nonExistentLtoId, otherUser.address),
        ).to.be.revertedWithCustomError(ltoCustody, 'LTONotInitiated');
      });

      it('should revert if new seller is invalid', async () => {
        await expect(
          ltoCustody.connect(custodyAdmin).transferSeller(ltoId, ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(ltoCustody, 'InvalidSeller');
      });

      it('should revert if not called by custody admin', async () => {
        await expect(ltoCustody.connect(buyer).transferSeller(ltoId, otherUser.address)).to.be.revertedWithCustomError(
          ltoCustody,
          'Unauthorized',
        );
      });

      it('should revert if paused', async () => {
        await ltoCustody.connect(coinbase).pause();
        await expect(ltoCustody.connect(custodyAdmin).transferSeller(ltoId, otherUser.address)).to.be.revertedWith(
          'Pausable: paused',
        );
      });
    });

    describe('transferBuyer', () => {
      it('should transfer lto buyer', async () => {
        await ltoCustody.connect(custodyAdmin).transferBuyer(ltoId, otherUser.address);

        const lto = await ltoCustody.ltoAssets(ltoId);
        expect(lto.seller).to.be.eq(seller.address);
        expect(lto.buyer).to.be.eq(otherUser.address);
        expect(lto.tokenId).to.be.eq(nftIdToTrade);
      });

      it('should revert if lto is not initiated', async () => {
        const nonExistentLtoId = BigInt(999);
        await expect(
          ltoCustody.connect(custodyAdmin).transferBuyer(nonExistentLtoId, otherUser.address),
        ).to.be.revertedWithCustomError(ltoCustody, 'LTONotInitiated');
      });

      it('should revert if new buyer is invalid', async () => {
        await expect(
          ltoCustody.connect(custodyAdmin).transferBuyer(ltoId, ethers.ZeroAddress),
        ).to.be.revertedWithCustomError(ltoCustody, 'InvalidBuyer');
      });

      it('should revert if not called by custody admin', async () => {
        await expect(ltoCustody.connect(buyer).transferBuyer(ltoId, otherUser.address)).to.be.revertedWithCustomError(
          ltoCustody,
          'Unauthorized',
        );
      });

      it('should revert if paused', async () => {
        await ltoCustody.connect(coinbase).pause();
        await expect(ltoCustody.connect(custodyAdmin).transferBuyer(ltoId, otherUser.address)).to.be.revertedWith(
          'Pausable: paused',
        );
      });
    });

    describe('setRecords', () => {
      it('should set many records', async () => {
        await ltoCustody.connect(buyer).setRecords(['key_1', 'key_2'], ['value_1', 'value_2'], nftIdToTrade);

        const records = await unsRegistry.getMany(['key_1', 'key_2'], nftIdToTrade);
        expect(records).to.deep.eq(['value_1', 'value_2']);
      });

      it('should revert if lto is not initiated', async () => {
        const nonExistentId = BigInt(999);
        await expect(
          ltoCustody.connect(buyer).setRecords(['key_1'], ['value_1'], nonExistentId),
        ).to.be.revertedWithCustomError(ltoCustody, 'LTONotInitiated');
      });

      it('should revert if not called by lto buyer', async () => {
        await expect(
          ltoCustody.connect(otherUser).setRecords(['key_1'], ['value_1'], nftIdToTrade),
        ).to.be.revertedWithCustomError(ltoCustody, 'Unauthorized');
      });

      it('should revert if paused', async () => {
        await ltoCustody.connect(coinbase).pause();
        await expect(ltoCustody.connect(buyer).setRecords(['key_1'], ['value_1'], nftIdToTrade)).to.be.revertedWith(
          'Pausable: paused',
        );
      });
    });
  });

  describe('integration with registrar custody', () => {
    it('should initiate lto while domain is in registrar custody', async () => {
      const labels = ['seaport-order', 'com'];
      const tokenId = await unsRegistry.namehash(labels);
      const expiry = latestBlockTimestamp + 60 * 60 * 24;

      await registrarCustody
        .connect(registrar)
        .tokenizeDomain(labels, ['key1'], ['value1'], expiry, registrarId, seller.address);
      expect(await unsRegistry.ownerOf(tokenId)).to.equal(await registrarCustody.getAddress());

      const priceToSell = ethers.parseUnits('100', 6);
      const { fulfillOrderData, numerator, denominator } = await createRegistrarCustodyOrder(
        tokenId,
        priceToSell,
        await seaportProxyBuyer.getAddress(),
      );

      const ltoId = await ltoCustody.getLtoCustodyId(await registrarCustody.getAddress(), buyer.address, tokenId, 0);
      await ltoCustody
        .connect(custodyAdmin)
        .initiateLTOFromOrder(
          { ...fulfillOrderData, numerator, denominator, extraData: '0x' },
          [],
          ethers.ZeroHash,
          buyer.address,
        );

      const domainOwner = await unsRegistry.ownerOf(tokenId);
      expect(domainOwner).to.be.eq(await ltoCustody.getAddress());

      const lto = await ltoCustody.ltoAssets(ltoId);
      expect(lto.seller).to.be.eq(await registrarCustody.getAddress());
      expect(lto.buyer).to.be.eq(buyer.address);
      expect(lto.tokenId).to.be.eq(tokenId);
    });
  });

  describe('pausable', () => {
    beforeEach(async () => {
      await unsRegistry.connect(seller).approve(await ltoCustody.getAddress(), nftIdToTrade);
      await ltoCustody.connect(custodyAdmin).initiateLTO(seller.address, buyer.address, nftIdToTrade);
      await ltoCustody.connect(coinbase).pause();
    });

    it('should pause', async () => {
      expect(await ltoCustody.paused()).to.be.eq(true);
    });

    it('should unpause', async () => {
      await ltoCustody.connect(coinbase).unpause();
      expect(await ltoCustody.paused()).to.be.eq(false);
    });

    it('should revert if pause is called by non-owner', async () => {
      await expect(ltoCustody.connect(buyer).pause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should revert if unpause is called by non-owner', async () => {
      await expect(ltoCustody.connect(buyer).unpause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should revert if pause is called when paused', async () => {
      await expect(ltoCustody.connect(coinbase).pause()).to.be.revertedWith('Pausable: paused');
    });

    it('should revert if unpause is called when not paused', async () => {
      await ltoCustody.connect(coinbase).unpause();
      await expect(ltoCustody.connect(coinbase).unpause()).to.be.revertedWith('Pausable: not paused');
    });
  });

  describe('custody admin role', () => {
    it('should allow owner to add custody admin', async () => {
      await ltoCustody.connect(coinbase).addCustodyAdmin(otherUser.address);
      expect(await ltoCustody.isCustodyAdmin(otherUser.address)).to.be.true;
    });

    it('should allow owner to remove custody admin', async () => {
      await ltoCustody.connect(coinbase).addCustodyAdmin(otherUser.address);
      await ltoCustody.connect(coinbase).removeCustodyAdmin(otherUser.address);
      expect(await ltoCustody.isCustodyAdmin(otherUser.address)).to.be.false;
    });

    it('should revert if not called by owner', async () => {
      await expect(ltoCustody.connect(buyer).addCustodyAdmin(otherUser.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
      await expect(ltoCustody.connect(buyer).removeCustodyAdmin(otherUser.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });
});
