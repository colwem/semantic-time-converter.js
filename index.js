'use strict';

let _ = require('lodash');

// et(3).weeks.in.years();
// et(3).weeks.less(2).days().in.seconds();

let yearDays = 365.25

class TimeConverter {
  constructor(acc, number) {
    this.acc = acc;
    this.inMilliseconds = {
      "milliseconds": 1,
      "seconds":      1000,
      "minutes":      1000 * 60,
      "hours":        1000 * 60 * 60,
      "days":         1000 * 60 * 60 * 24,
      "weeks":        1000 * 60 * 60 * 24 * 7,
      "months":       1000 * 60 * 60 * 24 * (yearDays / 12),
      "years":        1000 * 60 * 60 * 24 * yearDays,
      "decades":      1000 * 60 * 60 * 24 * yearDays * 10,
      "centuries":    1000 * 60 * 60 * 24 * yearDays * 100,
      "milleniums":   1000 * 60 * 60 * 24 * yearDays * 1000};

    let durations = Object.keys(this.inMilliseconds);
    _.each(durations, (duration) => {
      let newAcc = this.inMilliseconds[duration] * number + acc;
      this[duration].and = and(newAcc);
      this[duration].less = less(newAcc);
      this[duration].in = _.reduce(durations, (o, inDuration) => {
        o[d] = newAcc / this.inMilliseconds[d];
      });
    });
  }

  static starter() {
    return and(0);
  }
}


and = _.curry((acc, number) => {
  return new TimeConverter(acc, number)
}


less = _.curry((acc, number) => {
  return new TimeConverter(acc, -number)
}

module.exports = TimeConverter;
