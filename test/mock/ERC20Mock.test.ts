import { ethers } from 'hardhat';
import { Signature } from 'ethers';
import { expect } from 'chai';
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers';
import { ERC20Mock } from '../../types/contracts/mocks/ERC20Mock';
import { deployProxy } from '../../src/helpers';

describe('ERC20Mock', async () => {
  let signers: SignerWithAddress[], owner: SignerWithAddress, user: SignerWithAddress, delegate: SignerWithAddress;

  let erc20Mock: ERC20Mock;

  before('', async () => {
    signers = await ethers.getSigners();
    [owner, user, delegate] = signers;

    erc20Mock = (await deployProxy<ERC20Mock>(await ethers.getContractFactory('ERC20Mock'), [], {
      initializer: false,
    })) as ERC20Mock;
    await erc20Mock.initialize();
  });

  describe('ERC20Permit', async () => {
    it('should allow user to approve via permit and transfer tokens', async () => {
      const value = 50;

      await erc20Mock.mint(owner, value);

      const nonce = await erc20Mock.nonces(owner.address);
      const deadline = ethers.MaxUint256;

      const domain = {
        name: await erc20Mock.name(),
        version: '1',
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: await erc20Mock.getAddress(),
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

      await erc20Mock.permit(owner.address, user.address, value, deadline, v, r, s);

      const allowance = await erc20Mock.allowance(owner.address, user.address);
      expect(allowance).to.equal(value);

      await erc20Mock.connect(user).transferFrom(owner.address, delegate.address, value);

      const ownerBalance = await erc20Mock.balanceOf(owner.address);
      const delegateBalance = await erc20Mock.balanceOf(delegate.address);

      expect(ownerBalance).to.equal(0);
      expect(delegateBalance).to.equal(value);
    });
  });
});
