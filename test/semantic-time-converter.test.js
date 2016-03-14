'use strict';

let expect        = require('chai').expect,
    whats         = require('../index.js'),
    TimeConverter = whats.TimeConverter;

describe('invocation', function() {
  it('has properties', function() {
    let c = whats(3);

    expect(c.seconds).to.exist;
    expect(c.minutes).to.exist;
    expect(c.weeks).to.exist;
    expect(c.weeks.and).to.exist;
    expect(c.weeks).to.respondTo('and');
  });
});

describe('conversion', function() {
  it('converts time', function() {
    expect(whats(120).seconds.in.minutes).to.eql(2);
    expect(whats(7).days.in.weeks).to.eql(1);
  });
});

describe('#and', function() {
  it('adds durations', function() {
    expect(whats(1).minutes.and(30).seconds.in.seconds).to.equal(90);
  });
});

describe('#plus', function() {
  it('should be the same as and', function() {
    expect(whats(1).minutes.and(30).seconds.in.seconds)
    .to.equal(whats(1).minutes.plus(30).seconds.in.seconds);
  });
});

describe('#less', function() {
  it('subtracts durations', function() {
    expect(whats(1).minutes.less(30).seconds.in.seconds).to.equal(30);
  });
});

describe.skip('#in', function() {
  it('gets the right values', function() {

  });
});
