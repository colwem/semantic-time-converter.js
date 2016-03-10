# semantic-time-converter.js
### Convert to and from time durations in plain english

Super simple package that supports semantic conversion to and from any quantity of:
* milliseconds
* seconds
* minutes
* hours
* days
* weeks
* months
* years
* decades
* centuries
* milleniums

Supports addition and subtraction of different unites through the `.and()` and `.less()` functions

```
let whats = require('semantic-time-converter').starter;

whats(2).years.in.months       === 24;
whats(2).years.in.weeks        === 104.35714285714286;
whats(2).years.in.days         === 730.5;
whats(2).years.in.hours        === 17532;
whats(2).years.in.minutes      === 1051920;
whats(2).years.in.seconds      === 63115200;
whats(2).years.in.milliseconds === 6311520000;

// Fractional quantities are no problem.
whats(2).seconds.in.minutes === 0.03333333333333333

// This is pointless but it still works
whats(2).seconds.in.days === 0.000023148148148148147;

// Now this is useful for configuring various timed events
whats(3).weeks.in.milliseconds === 1814400000


// combine units with and and less
whats(2).minutes.and(30).seconds.in.seconds  === 150;
whats(2).minutes.less(30).seconds.in.seconds === 90;
whats(2).minutes.and(30).seconds.and(3).months.in.seconds === 7889550;
```

*For the purposes of this package a year is defined here as 365.25 days and a month is defined as 365.25/12 days.*
