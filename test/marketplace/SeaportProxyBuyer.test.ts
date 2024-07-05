import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { Seaport as seaportjs } from '@opensea/seaport-js';
import { getAdvancedOrderNumeratorDenominator } from '@opensea/seaport-js/lib/utils/fulfill';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { CreateOrderInput } from '@opensea/seaport-js/lib/types';
import { mintRandomDomain } from '../helpers/registry';
import { UNSRegistry } from '../../types/contracts';
import { UNSRegistry__factory } from '../../types/factories/contracts';
import { ERC20Mock__factory } from '../../types/factories/contracts/mocks';
import { SeaportProxyBuyer__factory } from '../../types/factories/contracts/marketplace';
import { Seaport__factory as SeaportContract__factory } from '../../types/factories/seaport-core/src';
import { ConduitController__factory } from '../../types/factories/seaport-core/src/conduit';
import { SeaportProxyBuyer } from '../../types/contracts/marketplace';
import { Seaport as SeaportContract } from '../../types/seaport-core/src';
import { ConduitController } from '../../types/seaport-core/src/conduit';
import { ERC20Mock } from '../../types/contracts/mocks/ERC20Mock';
import { TLD, ZERO_ADDRESS } from '../helpers/constants';
import { deployProxy } from '../../src/helpers';
import { OrderStruct } from '../../types/seaport-core/src/Seaport';
import { ExecuteFunc, buildExecuteFunc } from '../helpers/metatx';

describe('SeaportProxyBuyer', async () => {
  let unsRegistry: UNSRegistry,
    seaportProxyBuyer: SeaportProxyBuyer,
    seaportContract: SeaportContract,
    conduitController: ConduitController,
    usdcMock: ERC20Mock,
    seaportProxyBuyerFactory: SeaportProxyBuyer__factory;

  let signers: SignerWithAddress[],
    coinbase: SignerWithAddress,
    seller: SignerWithAddress,
    buyer: SignerWithAddress,
    reader: SignerWithAddress,
    feesRecipient: SignerWithAddress;

  let tokenIdToSell: bigint;
  let seaportSdk: seaportjs;

  let proxyBuyerAddress: string;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, seller, buyer, reader, feesRecipient] = signers;

    unsRegistry = await new UNSRegistry__factory(coinbase).deploy();
    await unsRegistry.initialize(coinbase.address, ZERO_ADDRESS, ZERO_ADDRESS, ZERO_ADDRESS);
    await unsRegistry.mintTLD(TLD.CRYPTO, 'crypto');
    await unsRegistry.setTokenURIPrefix('/');
    await unsRegistry.addProxyReader(reader.address);

    conduitController = await new ConduitController__factory(coinbase).deploy();
    seaportContract = await new SeaportContract__factory(coinbase).deploy(await conduitController.getAddress());
    usdcMock = await new ERC20Mock__factory(coinbase).deploy();

    seaportProxyBuyerFactory = new SeaportProxyBuyer__factory(coinbase);
    seaportProxyBuyer = (await deployProxy<SeaportProxyBuyer>(seaportProxyBuyerFactory, [
      await seaportContract.getAddress(),
      await usdcMock.getAddress(),
    ], { initializer: false })) as SeaportProxyBuyer;
    await seaportProxyBuyer.initialize(
      await seaportContract.getAddress(),
    );
    await seaportProxyBuyer.connect(coinbase).approve(await usdcMock.getAddress());
    proxyBuyerAddress = await seaportProxyBuyer.getAddress();
    await seaportProxyBuyer.addMinter(coinbase.address);
    seaportSdk = new seaportjs(seller, {
      overrides: {
        contractAddress: await seaportContract.getAddress(),
      },
    });
  });

  beforeEach(async () => {
    await usdcMock.mint(await seaportProxyBuyer.getAddress(), ethers.parseUnits('250000', 6));
    await unsRegistry.connect(seller).setApprovalForAll(await seaportContract.getAddress(), true);
    tokenIdToSell = await mintRandomDomain({ unsRegistry, owner: seller.address, tld: 'crypto' });
  });

  const generateOrderInputData = async (
    tokenIdentifier: bigint,
    priceToSell: bigint,
    recipientFeesBasisPoints: bigint,
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
      fees: [
        {
          recipient: feesRecipient.address,
          basisPoints: Number(recipientFeesBasisPoints),
        },
      ],
    };
  };

  const createOrder = async (priceToSell: bigint, recipientFeesBasisPoints: bigint, zone?: string) => {
    const order = await seaportSdk.createOrder(
      await generateOrderInputData(tokenIdToSell, priceToSell, recipientFeesBasisPoints, zone),
      seller.address,
    );
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

  const createBulkOrders = async (
    priceToSell: bigint,
    recipientFeesBasisPoints: bigint,
    zone?: string,
    domainsAmount = 10,
  ) => {
    const mintingPromises = Array.from({ length: domainsAmount }, async () => {
      return await mintRandomDomain({ unsRegistry, owner: seller.address, tld: 'x' });
    });
    const mintedTokenIds = await Promise.all(mintingPromises);
    const orderInputDataPromises = mintedTokenIds.map(async (tokenId) => {
      return await generateOrderInputData(tokenId, priceToSell, recipientFeesBasisPoints, zone);
    });
    const orderInputData = await Promise.all(orderInputDataPromises);
    const bulkOrder = await seaportSdk.createBulkOrders(orderInputData, seller.address);
    const seaportBulkOrderData = await bulkOrder.executeAllActions();
    const bulksFullfillOrdersData:
      {fulfillOrderData: OrderStruct, numerator: bigint, denominator: bigint, hash: bigint, tokenId: string}[] =
        seaportBulkOrderData.map((orderData) => {
          const fulfillOrderData: OrderStruct = {
            ...orderData,
            parameters: {
              ...orderData.parameters,
              consideration: orderData.parameters.consideration,
              totalOriginalConsiderationItems: orderData.parameters.consideration.length,
            },
          };
          const { numerator, denominator } = getAdvancedOrderNumeratorDenominator(orderData);
          const hash = ethers.toBigInt(seaportSdk.getOrderHash(orderData.parameters));
          return {
            fulfillOrderData,
            numerator,
            denominator,
            hash,
            tokenId: orderData.parameters.offer[0].identifierOrCriteria,
          };
        });

    return bulksFullfillOrdersData;
  };

  describe('Regular transactions', async () => {
    it('should execute single order from batch orders via Proxy', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const feesAmount = priceToSell * recipientFeesBasisPoints / BigInt(10000);
      const orders = await createBulkOrders(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);
      const { fulfillOrderData, numerator, denominator, tokenId } = orders[0];

      const initialProxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const initialSellerBalance = await usdcMock.balanceOf(seller.address);
      const initialFeesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      await (await seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
      )).wait();

      const sellerBalance = await usdcMock.balanceOf(seller.address);
      const proxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const domainOwner = await unsRegistry.ownerOf(tokenId);
      const feesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(sellerBalance).to.be.eq(initialSellerBalance + priceToSell - feesAmount);
      expect(feesRecipientBalance).to.be.eq(initialFeesRecipientBalance + feesAmount);
      expect(proxyBalance).to.be.eq(initialProxyBalance - priceToSell);
      expect(domainOwner).to.be.eq(buyer.address);
    });

    it('should execute multiple orders from batch orders via Proxy', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const feesAmount = priceToSell * recipientFeesBasisPoints / BigInt(10000);
      const orders = await createBulkOrders(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress, 3);
      const initialProxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const initialSellerBalance = await usdcMock.balanceOf(seller.address);
      const initialFeesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(orders.length).to.be.eq(3);
      for (const order of orders) {
        const { fulfillOrderData, numerator, denominator, tokenId } = order;
        await (await seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
          { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
        )).wait();
        const domainOwner = await unsRegistry.ownerOf(tokenId);
        expect(domainOwner).to.be.eq(buyer.address);
      }

      const sellerBalance = await usdcMock.balanceOf(seller.address);
      const proxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const feesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(sellerBalance).to.be.eq(initialSellerBalance + priceToSell * BigInt(3) - feesAmount * BigInt(3));
      expect(feesRecipientBalance).to.be.eq(initialFeesRecipientBalance + feesAmount * BigInt(3));
      expect(proxyBalance).to.be.eq(initialProxyBalance - priceToSell * BigInt(3));
    });

    // todo add test for multiple orders

    it('should execute Seaport order via Proxy', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const feesAmount = priceToSell * recipientFeesBasisPoints / BigInt(10000);
      const { fulfillOrderData, numerator, denominator } =
        await createOrder(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);

      const initialProxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const initialSellerBalance = await usdcMock.balanceOf(seller.address);
      const initialFeesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      await (await seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
      )).wait();

      const sellerBalance = await usdcMock.balanceOf(seller.address);
      const proxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const domainOwner = await unsRegistry.ownerOf(tokenIdToSell);
      const feesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(sellerBalance).to.be.eq(initialSellerBalance + priceToSell - feesAmount);
      expect(feesRecipientBalance).to.be.eq(initialFeesRecipientBalance + feesAmount);
      expect(proxyBalance).to.be.eq(initialProxyBalance - priceToSell);
      expect(domainOwner).to.be.eq(buyer.address);
    });

    it('should not execute Seaport order from non-minter', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator } =
        await createOrder(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);

      await expect(seaportProxyBuyer.connect(buyer).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
      )).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
    });

    it('should withdraw USDC from Proxy', async () => {
      const amountToWithdraw = BigInt(ethers.parseUnits('100', 6));
      const initialProxyBalance = await usdcMock.balanceOf(await seaportProxyBuyer.getAddress());
      const initialRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      await seaportProxyBuyer.connect(coinbase)
        .withdraw(await usdcMock.getAddress(), feesRecipient.address, amountToWithdraw);

      const recipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      const proxyBalance = await usdcMock.balanceOf(await seaportProxyBuyer.getAddress());
      expect(recipientBalance).to.be.eq(initialRecipientBalance + amountToWithdraw);
      expect(proxyBalance).to.be.eq(initialProxyBalance - amountToWithdraw);
    });

    it('should not withdraw USDC from Proxy by non-owner', async () => {
      const amountToWithdraw = BigInt(ethers.parseUnits('100', 6));
      await expect(
        seaportProxyBuyer.connect(buyer)
          .withdraw(await usdcMock.getAddress(), feesRecipient.address, amountToWithdraw),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should not execute Seaport order with zero recipient address', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator } =
       await createOrder(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);

      await expect(seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, ZERO_ADDRESS,
      )).to.be.revertedWithCustomError(seaportProxyBuyer, 'RecipientIsZeroAddress');
    });

    it('should not execute Seaport order if contract is paused', async () => {
      await seaportProxyBuyer.connect(coinbase).pause();
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator } =
        await createOrder(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);

      await expect(seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
      )).to.be.revertedWith('Pausable: paused');
      await seaportProxyBuyer.connect(coinbase).unpause();
    });

    it('should unpause contract', async () => {
      await seaportProxyBuyer.connect(coinbase).pause();
      await seaportProxyBuyer.connect(coinbase).unpause();
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator } =
       await createOrder(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);

      await seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
      );
    });

    it('should not pause if paused', async () => {
      await seaportProxyBuyer.connect(coinbase).pause();
      await expect(seaportProxyBuyer.connect(coinbase).pause()).to.be.revertedWith('Pausable: paused');
      await seaportProxyBuyer.connect(coinbase).unpause();
    });

    it('should not unpause if not paused', async () => {
      await expect(seaportProxyBuyer.connect(coinbase).unpause()).to.be.revertedWith('Pausable: not paused');
    });

    it('should not pause by non-owner', async () => {
      await expect(seaportProxyBuyer.connect(buyer).pause()).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should not unpause by non-owner', async () => {
      await seaportProxyBuyer.connect(coinbase).pause();
      await expect(seaportProxyBuyer.connect(buyer).unpause()).to.be.revertedWith('Ownable: caller is not the owner');
      await seaportProxyBuyer.connect(coinbase).unpause();
    });

    it('should not process order if zone is not set', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator } =
        await createOrder(priceToSell, recipientFeesBasisPoints);

      await expect(seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
      )).to.be.revertedWithCustomError(seaportProxyBuyer, 'InvalidZone');
    });

    it('should not process order if zone is invalid', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator } =
        await createOrder(priceToSell, recipientFeesBasisPoints, ZERO_ADDRESS);

      await expect(seaportProxyBuyer.connect(coinbase).fulfillAdvancedOrder(
        { ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address,
      )).to.be.revertedWithCustomError(seaportProxyBuyer, 'InvalidZone');
    });

    it('should approve ERC20 spending to Seaport contract', async () => {
      const erc20Mock = await new ERC20Mock__factory(coinbase).deploy();
      const initialAllowaneAmount =
        await erc20Mock.allowance(proxyBuyerAddress, await seaportContract.getAddress());
      expect(initialAllowaneAmount).to.be.eq(0);
      await seaportProxyBuyer.connect(coinbase).approve(await erc20Mock.getAddress());
      const allowanceAmount =
        await erc20Mock.allowance(proxyBuyerAddress, await seaportContract.getAddress());
      expect(allowanceAmount).to.be.eq(ethers.MaxUint256);
    });

    it('should not approve ERC20 spending to Seaport contract by non-owner', async () => {
      const erc20Mock = await new ERC20Mock__factory(coinbase).deploy();
      await expect(seaportProxyBuyer.connect(buyer).approve(await erc20Mock.getAddress()))
        .to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Meta transactions', async () => {
    let buildExecuteParams: ExecuteFunc;

    before(async () => {
      buildExecuteParams = buildExecuteFunc(
        seaportProxyBuyer.interface,
        await seaportProxyBuyer.getAddress(),
        seaportProxyBuyer,
      );
    });

    it('should execute multiple orders from batch orders via Proxy', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const feesAmount = priceToSell * recipientFeesBasisPoints / BigInt(10000);
      const orders = await createBulkOrders(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress, 3);
      const initialProxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const initialSellerBalance = await usdcMock.balanceOf(seller.address);
      const initialFeesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(orders.length).to.be.eq(3);
      for (const order of orders) {
        const { fulfillOrderData, numerator, denominator, tokenId } = order;
        const { req, signature } = await buildExecuteParams(
          'fulfillAdvancedOrder',
          [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
          coinbase,
          order.hash,
        );
        await (await seaportProxyBuyer.connect(seller).execute(req, signature)).wait();
        const domainOwner = await unsRegistry.ownerOf(tokenId);
        expect(domainOwner).to.be.eq(buyer.address);
      }

      const sellerBalance = await usdcMock.balanceOf(seller.address);
      const proxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const feesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(sellerBalance).to.be.eq(initialSellerBalance + priceToSell * BigInt(3) - feesAmount * BigInt(3));
      expect(feesRecipientBalance).to.be.eq(initialFeesRecipientBalance + feesAmount * BigInt(3));
      expect(proxyBalance).to.be.eq(initialProxyBalance - priceToSell * BigInt(3));
    });

    it('should execute single order from batch orders via Proxy', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50); // 0.5%
      const feesAmount = priceToSell * recipientFeesBasisPoints / BigInt(10000);
      const orders = await createBulkOrders(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);
      const { fulfillOrderData, numerator, denominator, hash, tokenId } = orders[0];

      const initialProxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const initialSellerBalance = await usdcMock.balanceOf(seller.address);
      const initialFeesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      const { req, signature } = await buildExecuteParams(
        'fulfillAdvancedOrder',
        [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
        coinbase,
        hash,
      );
      await (await seaportProxyBuyer.connect(seller).execute(req, signature)).wait();

      const sellerBalance = await usdcMock.balanceOf(seller.address);
      const proxyBalance = await usdcMock.balanceOf(proxyBuyerAddress);
      const domainOwner = await unsRegistry.ownerOf(tokenId);
      const feesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(sellerBalance).to.be.eq(initialSellerBalance + priceToSell - feesAmount);
      expect(feesRecipientBalance).to.be.eq(initialFeesRecipientBalance + feesAmount);
      expect(proxyBalance).to.be.eq(initialProxyBalance - priceToSell);
      expect(domainOwner).to.be.eq(buyer.address);
    });

    it('should execute Seaport order via Proxy', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const feesAmount = priceToSell * recipientFeesBasisPoints / BigInt(10000);
      const { fulfillOrderData, numerator, denominator, hash } =
        await createOrder(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);

      const initialProxyBalance = await usdcMock.balanceOf(await seaportProxyBuyer.getAddress());
      const initialSellerBalance = await usdcMock.balanceOf(seller.address);
      const initialFeesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      const { req, signature } = await buildExecuteParams(
        'fulfillAdvancedOrder',
        [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
        coinbase,
        hash,
      );
      await (await seaportProxyBuyer.connect(seller).execute(req, signature)).wait();

      const sellerBalance = await usdcMock.balanceOf(seller.address);
      const proxyBalance = await usdcMock.balanceOf(await seaportProxyBuyer.getAddress());
      const domainOwner = await unsRegistry.ownerOf(tokenIdToSell);
      const feesRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);

      expect(sellerBalance).to.be.eq(initialSellerBalance + priceToSell - feesAmount);
      expect(feesRecipientBalance).to.be.eq(initialFeesRecipientBalance + feesAmount);
      expect(proxyBalance).to.be.eq(initialProxyBalance - priceToSell);
      expect(domainOwner).to.be.eq(buyer.address);
    });

    it('should not execute Seaport order from non-minter', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator, hash } =
        await createOrder(priceToSell, recipientFeesBasisPoints, proxyBuyerAddress);

      const { req, signature } = await buildExecuteParams(
        'fulfillAdvancedOrder',
        [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
        buyer,
        hash,
      );
      await expect(
        seaportProxyBuyer.connect(coinbase).execute(req, signature),
      ).to.be.revertedWith('MinterRole: CALLER_IS_NOT_MINTER');
    });

    it('should withdraw USDC from Proxy', async () => {
      const amountToWithdraw = BigInt(ethers.parseUnits('100', 6));
      const initialProxyBalance = await usdcMock.balanceOf(await seaportProxyBuyer.getAddress());
      const initialRecipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      const { req, signature } = await buildExecuteParams(
        'withdraw',
        [await usdcMock.getAddress(), feesRecipient.address, amountToWithdraw],
        coinbase,
        0,
      );
      await seaportProxyBuyer.connect(coinbase).execute(req, signature);

      const recipientBalance = await usdcMock.balanceOf(feesRecipient.address);
      const proxyBalance = await usdcMock.balanceOf(await seaportProxyBuyer.getAddress());
      expect(recipientBalance).to.be.eq(initialRecipientBalance + amountToWithdraw);
      expect(proxyBalance).to.be.eq(initialProxyBalance - amountToWithdraw);
    });

    it('should not withdraw USDC from Proxy by non-owner', async () => {
      const amountToWithdraw = BigInt(ethers.parseUnits('100', 6));
      const { req, signature } = await buildExecuteParams(
        'withdraw',
        [await usdcMock.getAddress(), feesRecipient.address, amountToWithdraw],
        buyer,
        0,
      );
      await expect(
        seaportProxyBuyer.connect(coinbase).execute(req, signature),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should not process order if zone is not set', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator, hash } =
        await createOrder(priceToSell, recipientFeesBasisPoints);

      const { req, signature } = await buildExecuteParams(
        'fulfillAdvancedOrder',
        [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
        coinbase,
        hash,
      );
      await expect(
        seaportProxyBuyer.connect(coinbase).execute(req, signature),
      ).to.be.revertedWithCustomError(seaportProxyBuyer, 'InvalidZone');
    });

    it('should not process order if zone is invalid', async () => {
      const priceToSell = BigInt(ethers.parseUnits('100', 6));
      const recipientFeesBasisPoints = BigInt(50);
      const { fulfillOrderData, numerator, denominator, hash } =
        await createOrder(priceToSell, recipientFeesBasisPoints, ZERO_ADDRESS);

      const { req, signature } = await buildExecuteParams(
        'fulfillAdvancedOrder',
        [{ ...fulfillOrderData, numerator, denominator, extraData: '0x' }, [], ethers.ZeroHash, buyer.address],
        coinbase,
        hash,
      );
      await expect(
        seaportProxyBuyer.connect(coinbase).execute(req, signature),
      ).to.be.revertedWithCustomError(seaportProxyBuyer, 'InvalidZone');
    });

    it('should not approve ERC20 spending to Seaport contract by non-owner', async () => {
      const erc20Mock = await new ERC20Mock__factory(coinbase).deploy();
      const { req, signature } = await buildExecuteParams(
        'approve',
        [await erc20Mock.getAddress()],
        buyer,
        0,
      );
      await expect(
        seaportProxyBuyer.connect(coinbase).execute(req, signature),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('should approve ERC20 spending to Seaport contract', async () => {
      const erc20Mock = await new ERC20Mock__factory(coinbase).deploy();
      const initialAllowaneAmount =
        await erc20Mock.allowance(proxyBuyerAddress, await seaportContract.getAddress());
      expect(initialAllowaneAmount).to.be.eq(0);
      const { req, signature } = await buildExecuteParams(
        'approve',
        [await erc20Mock.getAddress()],
        coinbase,
        0,
      );
      await seaportProxyBuyer.connect(coinbase).execute(req, signature);
      const allowanceAmount =
        await erc20Mock.allowance(proxyBuyerAddress, await seaportContract.getAddress());
      expect(allowanceAmount).to.be.eq(ethers.MaxUint256);
    });
  });
});
