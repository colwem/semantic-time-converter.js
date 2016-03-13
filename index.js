'use strict';

const _ = require('lodash');

const yearDays = 365.25;

// ms is short for milliseconds
const inMs = {
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


const TimeConverter = function TimeConverter(msAccumulator, ambiguousNumber) {
  this.msAccumulator =  msAccumulator;
  this.ambiguousNumber = ambiguousNumber;
  const durations = Object.keys(inMs);

  // bind 'this' to the curried building function
  const bound = _.bind(buildDuration(inMs, durations), this);

  // creat object keyed by each possible duration with the value being the duration
  // object built with the bound function
  const durationsObj = mapToObject(durations, bound)

  _.assign(this, durationsObj);
}

const buildDuration = _.curry(function (inMs, durations, thisDuration) {
  const newMsAccumulator =
    inMs[thisDuration] * this.ambiguousNumber + this.msAccumulator;

  const durationObj = {};

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
  durationObj.to = mapToObject(durations, (duration) => {

    return newMsAccumulator / inMs[duration];
  });

  // for the gimme...in form
  // gimme([ambiguousNumber]).[duration].in([newAmbiguousNumber])
  durationObj.in = durationObj.to;

  return durationObj
});


// Takes an array and function and returns an object keyed by the elements
// from the array with the values being the result of applying the function
// to the that element of the array.
const mapToObject = function(arr, fn) {
   return _.zipObject(arr, _.map(arr, fn));
}

// Creates a new TimeConverter with an initial value in milliseconds and
// an ambigous value. function is curried so it can be partially applied
//
const and = _.curry((acc, number) => {
  return new TimeConverter(acc, number)
});


// Same as and just subtracts the ambiguous number rather than adds it.
const less = _.curry((acc, number) => {
  return new TimeConverter(acc, -number)
});

const toExport = and(0);

toExport.TimeConverter = TimeConverter;

module.exports = toExport;
