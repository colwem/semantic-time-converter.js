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


const createAmbiguated = getCreateAmbiguated(inMs);
const createDisambiguated = getCreateDisambiguated(inMs);
const createConverter = getCreateConverter(inMs);

// so we have 2 types of objects, ambiguous and disambiguated
// ambiguous will have properties of units
// each unit will be a disambiguated object
// it has the incoming milliseconds and adds to that the
// disambiguated value.
// it has properties in, to, and, plus, less, minus
// in and to are a conversion object.
// conversion object has properties for each possible conversion

function getDurations(inMs) {
  return Object.keys(inMs);
}

function getCreateAmbiguated(inMs) {
  const durations = getDurations(inMs);

  return function(currentMs, number) {
    const ambiguous = {
      number,
      currentMs
    };

    for (let duration of durations) {
      Object.defineProperty(ambiguous, duration, {
        get: function() {
          return createDisambiguated(ambiguous, duration);
        }
      });
    }

    makeSingularAliases(ambiguous, durations);
    return ambiguous;
  };
}

function getCreateDisambiguated(inMs) {
  return function(ambiguous, duration) {
    const disambiguated = {
      currentMs:
          inMs[duration] * ambiguous.number + ambiguous.currentMs
    }
    disambiguated.to = createConverter(disambiguated);
    disambiguated.in = disambiguated.to

    disambiguated.and = createAmbiguated.bind(null, disambiguated.currentMs);
    disambiguated.plus = disambiguated.and;

    disambiguated.less = function(number) {
      return createAmbiguated(disambiguated.currentMs, -number);
    };
    disambiguated.minus = disambiguated.less;

    return disambiguated;
  }
}

function getCreateConverter(inMs) {
  const durations = getDurations(inMs);
  return function(disambiguated) {
    const converter = {
      disambiguated
    }

    for(let duration of durations) {
      Object.defineProperty(converter, duration, {
        get: function () {
          return disambiguated.currentMs / inMs[duration];
        }
      });
    }
    return converter;
  }
}

// Takes an array and function and returns an object keyed by the elements
// from the array with the values being the result of applying the function
// to the that element of the array.
const mapToObject = function(arr, fn) {
   return _.zipObject(arr, _.map(arr, fn));
}

// The next 4 functions are for making singular versions of the plural named
// duration properties
function singularize(plural) {
  return plural.replace(/s$/, '');
}

function pairWith(list, fn) {
  return list.map((e) => {
    return [e, fn(e)];
  });
}

function aliasProperties(obj, aliasPairs) {
  for(let pair of aliasPairs) {
    obj[pair[1]] = obj[pair[0]];
  }
}

function makeSingularAliases(obj, propertyList) {
  aliasProperties(obj, pairWith(propertyList, singularize));
}


const startAtZero = createAmbiguated.bind(null, 0);

module.exports = startAtZero;
