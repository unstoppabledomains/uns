import { ethers } from 'hardhat';
import { Signature } from 'ethers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { USDC } from '../../types/contracts/mocks/USDC';
import { deployProxy } from '../../src/helpers';

describe('USDC', async () => {
  let signers: SignerWithAddress[], owner: SignerWithAddress, user: SignerWithAddress, delegate: SignerWithAddress;

  let usdcMock: USDC;

  before('', async () => {
    signers = await ethers.getSigners();
    [owner, user, delegate] = signers;

    usdcMock = (await deployProxy<USDC>(await ethers.getContractFactory('USDC'), [], {
      initializer: false,
    })) as USDC;
    await usdcMock.initialize();
  });

  describe('ERC20Permit', async () => {
    it('should allow user to approve via permit and transfer tokens', async () => {
      const value = 50;

      await usdcMock.mint(owner, value);

      const nonce = await usdcMock.nonces(owner.address);
      const deadline = ethers.MaxUint256;

      const domain = {
        name: await usdcMock.name(),
        version: '1',
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: await usdcMock.getAddress(),
      };

      const types = {
        Permit: [
          { name: 'owner', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      };

      const permitData = {
        owner: owner.address,
        spender: user.address,
        value: value,
        nonce: nonce,
        deadline: deadline,
      };

      const signature = await owner.signTypedData(domain, types, permitData);
      const { v, r, s } = Signature.from(signature);

      await usdcMock.permit(owner.address, user.address, value, deadline, v, r, s);

      const allowance = await usdcMock.allowance(owner.address, user.address);
      expect(allowance).to.equal(value);

      await usdcMock.connect(user).transferFrom(owner.address, delegate.address, value);

      const ownerBalance = await usdcMock.balanceOf(owner.address);
      const delegateBalance = await usdcMock.balanceOf(delegate.address);

      expect(ownerBalance).to.equal(0);
      expect(delegateBalance).to.equal(value);
    });
  });
});
