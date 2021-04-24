/// The solution is a partial dump from @openzeppelin/test-helpers@0.5.6 package
/// It allows the assertion of transaction's revert messages

const { expect } = require('chai');

async function expectException (promise, expectedError) {
  try {
    await promise;
  } catch (error) {
    if (error.message.indexOf(expectedError) === -1) {
      // When the exception was a revert, the resulting string will include only
      // the revert reason, otherwise it will be the type of exception (e.g. 'invalid opcode')
      const actualError = error.message.replace(
        /Returned error: VM Exception while processing transaction: (revert )?/,
        '',
      );
      expect(actualError).to.equal(expectedError, 'Wrong kind of exception received');
    }
    return;
  }

  expect.fail('Expected an exception but none was received');
}

const expectRevert = async function (promise, expectedError) {
  promise.catch(() => { }); // Avoids uncaught promise rejections in case an input validation causes us to return early

  if (!expectedError) {
    throw Error('No revert reason specified: call expectRevert with the reason string, or use expectRevert.unspecified \
if your \'require\' statement doesn\'t have one.');
  }

  await expectException(promise, expectedError);
};

expectRevert.assertion = (promise) => expectException(promise, 'invalid opcode');
expectRevert.outOfGas = (promise) => expectException(promise, 'out of gas');
expectRevert.unspecified = (promise) => expectException(promise, 'revert');

module.exports = expectRevert;
