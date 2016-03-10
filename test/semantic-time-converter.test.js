let TimeConverter = require('../index.js');

whats = TimeConverter.starter();

describe('invokation', function() {
  it('returns TimeConverter object', function() {
    expect(whats(3)).to.be.an.instanceOf()
  });
});
