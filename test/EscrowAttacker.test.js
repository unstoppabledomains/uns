const { ethers, waffle } = require('hardhat');
const { expect } = require('chai');

describe('EscrowAttacker', function () {
  let attacker, userWithFunds;

  let escrowContract;
  let attackerContract;

  before(async () => {
    [attacker, userWithFunds] = await ethers.getSigners();

    const GringottsEscrow = await ethers.getContractFactory('GringottsEscrow');
    const EscrowAttacker = await ethers.getContractFactory('EscrowAttacker');

    escrowContract = await GringottsEscrow.deploy();
    attackerContract = await EscrowAttacker.deploy(escrowContract.address, attacker.address);
  });

  it('could be hacked', async () => {
    // Put some money into escrow
    await escrowContract.connect(userWithFunds)
      .deposit(
        ethers.utils.solidityKeccak256(['string', 'address'], ['password', escrowContract.address.toLowerCase()]),
        +new Date() + 3600,
        { value: ethers.utils.parseEther('50') },
      );

    // Deposit 1 ether via attacker
    await escrowContract.connect(attacker).deposit(
      ethers.utils.solidityKeccak256(['string', 'address'], ['other-password', escrowContract.address.toLowerCase()]),
      +new Date() + 3600,
      { value: ethers.utils.parseEther('1') },
    );

    // Ensure that escrow has funds on it
    expect(
      ethers.utils.formatEther(
        await waffle.provider.getBalance(escrowContract.address),
      ),
    ).to.equal('51.0');

    // Attack (not works anymore)
    await expect(attackerContract.connect(attacker).withdrawAll(
      'other-password',
    )).to.be.revertedWith('ReentrancyGuard: reentrant call');
  });
});
