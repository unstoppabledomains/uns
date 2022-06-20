const ens_namehash = require('eth-ens-namehash');

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

    expect(await namehash.compute('crypto'))
      .to.be.equal('0x0f4a10a4f46c288cea365fcf45cccf0e9d901b945b9829ccdb54c10dc3cb7a6f');
  });

  it('test2', async () => {
    expect(await namehash.computeNamehash('brad.crypto'))
      .to.be.equal('0x756e4e998dbffd803c21d23b06cd855cdc7a4b57706c95964a37e24b47c10fc9');

    expect(await namehash.compute('brad.crypto'))
      .to.be.equal('0x756e4e998dbffd803c21d23b06cd855cdc7a4b57706c95964a37e24b47c10fc9');
  });

  it('test3', async () => {
    expect(await namehash.computeNamehash('one.brad.crypto'))
      .to.be.equal('0xc6c19c8775b0b1954371fa354f9bba6fe00d47272c0a48cea7493a7946efce8a');

    expect(await namehash.compute('one.brad.crypto'))
      .to.be.equal('0xc6c19c8775b0b1954371fa354f9bba6fe00d47272c0a48cea7493a7946efce8a');
  });

  it('test4', async () => {
    expect(await namehash.computeNamehash('.brad.crypto.'))
      .to.be.equal(ens_namehash.hash('.brad.crypto.'));

    console.log('')
    console.log('>> brad.crypto')
    expect(await namehash.compute('brad.crypto'))
      .to.be.equal(ens_namehash.hash('brad.crypto'));

    console.log('')
    console.log('>> on.brad.crypto')
    expect(await namehash.compute('on.brad.crypto'))
      .to.be.equal(ens_namehash.hash('on.brad.crypto'));

    console.log('')
    console.log('>> .brad.crypto')
    expect(await namehash.compute('.brad.crypto'))
    .to.be.equal(ens_namehash.hash('.brad.crypto'));

    console.log('')
    console.log('>> o.brad.crypto')
    expect(await namehash.compute('o.brad.crypto'))
      .to.be.equal(ens_namehash.hash('o.brad.crypto'));

    console.log('')
    console.log('>> .brad.crypto.')
    expect(await namehash.compute('.brad.crypto.'))
      .to.be.equal(ens_namehash.hash('.brad.crypto.'));

    console.log('')
    console.log('>> brad.crypto.')
    expect(await namehash.compute('brad.crypto.'))
      .to.be.equal(ens_namehash.hash('brad.crypto.'));
  });

  it('estimation', async () => {
    const result = [];

    const cases = [
      'c',
      '.c',
      'c.',
      '.c.',
      'crypto',
      '.crypto',
      'crypto.',
      '.crypto.',
      'brad.crypto',
      '.brad.crypto',
      'brad.crypto.',
      '.brad.crypto.',
      'longnameherewestarthelloworld.crypto',
      '.longnameherewestarthelloworld.crypto',
      'longnameherewestarthelloworld.crypto.',
      '.longnameherewestarthelloworld.crypto.',
      'sub.longnameherewestarthelloworld.crypto',
      '.sub.longnameherewestarthelloworld.crypto',
      'sub.longnameherewestarthelloworld.crypto.',
      '.sub.longnameherewestarthelloworld.crypto.',
    ];

    for (let i = 0; i < cases.length; i++) {
      result.push({
        name: cases[i],
        compute: (await namehash.estimateGas.compute(cases[i])).toString(),
        computeNamehash: (await namehash.estimateGas.computeNamehash(cases[i])).toString(),
      })
    }

    console.table(result);
  })
})
