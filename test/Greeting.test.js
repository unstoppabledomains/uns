const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Greeting', () => {
  let address, anotherAddress;
  let greetingContractFactory, greetingContract;

  const name = 'Nick';

  before(async () => {
    [address, anotherAddress] = await ethers.getSigners();
    greetingContractFactory = await ethers.getContractFactory('Greeting');

    greetingContract = await greetingContractFactory.deploy();

    await greetingContract.connect(anotherAddress).rememberName(name);
  });

  it('should greet with address when address is not known', async () => {
    expect(await greetingContract.connect(address).greet()).to.be.equal(`Hello, ${address.address.toLowerCase()}`);
  });

  it('should greet with name when name is known for an address', async () => {
    expect(await greetingContract.connect(anotherAddress).greet()).to.be.equal(`Hello, ${name}`);
  });
});
