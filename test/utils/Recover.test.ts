import { ethers } from 'hardhat';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ERC20Mock, ERC20Mock__factory, Recover, Recover__factory } from '../../types';

describe('Recover', () => {
  let usdcMock: ERC20Mock, recover: Recover;

  let signers: SignerWithAddress[], coinbase: SignerWithAddress, nonOwner: SignerWithAddress;

  before(async () => {
    signers = await ethers.getSigners();
    [coinbase, nonOwner] = signers;
  });

  beforeEach(async () => {
    usdcMock = await new ERC20Mock__factory(coinbase).deploy();
    recover = await new Recover__factory(coinbase).deploy();
  });

  it('should recover ERC20 tokens', async () => {
    const amount = 1000;
    await usdcMock.mint(await recover.getAddress(), amount);
    await recover.recoverERC20(await usdcMock.getAddress());
    expect(await usdcMock.balanceOf(await coinbase.getAddress())).to.eq(amount);
    expect(await usdcMock.balanceOf(await recover.getAddress())).to.eq(0);
  });

  it('should not recover ERC20 tokens if not owner', async () => {
    await expect(recover.connect(nonOwner).recoverERC20(await usdcMock.getAddress())).to.be.revertedWith(
      'Ownable: caller is not the owner',
    );
  });
});
