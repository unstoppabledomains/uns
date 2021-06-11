const { utils } = ethers;

describe.only('Namehash', () => {
  let Namehash, namehash;

  before(async () => {
    Namehash = await ethers.getContractFactory('contracts/Namehash.sol:Namehash');
    namehash = await Namehash.deploy();
  })

  it('test1', async () => {
    expect(await namehash.computeNamehash('crypto'))
      .to.be.equal('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
  });

  it('test2', async () => {
    expect(await namehash.computeNamehash('brad.crypto'))
      .to.be.equal('0x756e4e998dbffd803c21d23b06cd855cdc7a4b57706c95964a37e24b47c10fc9');
  });
})
