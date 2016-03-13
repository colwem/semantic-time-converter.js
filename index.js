'use strict';

let _ = require('lodash');

let yearDays = 365.25;

// ms is short for milliseconds
let inMs = {
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


let TimeConverter = function TimeConverter(msAccumulator, ambiguousNumber) {
  this.msAccumulator =  msAccumulator;
  this.ambiguousNumber = ambiguousNumber;
  let durations = Object.keys(inMs);


  // creat object keyed by each possible duration with the value being the duration
  // object built with this._buildDuration
  let durationsObj =
    _.zipObject(
      durations,
      _.map(
        durations,
        _.bind(buildDuration(inMs, durations), this)));

  _.assign(this, durationsObj);
}

let buildDuration = _.curry(function (inMs, durations, thisDuration) {
  let newMsAccumulator =
    inMs[thisDuration] * this.ambiguousNumber + this.msAccumulator;

  let durationObj = {};

  // chain on an addition
  // convert([ambiguousNumber]).[duration].and([newAmbiguousNumber])
  durationObj.and = and(newMsAccumulator);
  durationObj.plus = durationObj.and;

  // chain on a subration
  // convert([ambiguousNumber]).[duration].less([newAmbiguousNumber])
  durationObj.less = less(newMsAccumulator);
  durationObj.minus = durationObj.less;

  // Calculate and attach all the possible convertions for this object
  // convert([ambiguousNumber]).[duration].to.[otherDuration]
  durationObj.to = _.zipObject(durations, _.map(durations, (duration) => {

    return newMsAccumulator / inMs[duration];
  }));

  // for the gimme...in form
  // gimme([ambiguousNumber]).[duration].in([newAmbiguousNumber])
  durationObj.in = durationObj.to;

  return durationObj
});


let and = _.curry((acc, number) => {
  return new TimeConverter(acc, number)
});


let less = _.curry((acc, number) => {
  return new TimeConverter(acc, -number)
});

let toExport = and(0);

toExport.TimeConverter = TimeConverter;

module.exports = toExport;
