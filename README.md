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

Supports addition and subtraction of different unites through the `.and()` and
`.less()` functions. `.plus()` is an alias for `.and()` and `.minus()` is an 
alias for `.less()`

### Example usage

```
const convert = require('semantic-time-converter');

app.use(session({
  resave: false, 
  saveUninitialized: false,
  secret: 'keyboard cat',
  cookie: {

    maxAge: convert(3).weeks.to.milliseconds 
    // self documenting unlike explicitly specifying a mysterious number 
    // like 1814400000 or directly calculating it with 
    // 3 * 7 * 24 * 60 * 60 * 1000
  }
}));
```

More examples

```
convert(2).years.to.months       === 24;
convert(2).years.to.weeks        === 104.35714285714286;
convert(2).years.to.days         === 730.5;
convert(2).years.to.hours        === 17532;
convert(2).years.to.minutes      === 1051920;
convert(2).years.to.seconds      === 63115200;
convert(2).years.to.milliseconds === 6311520000;

// Fractional quantities are no problem.
convert(2).seconds.to.minutes === 0.03333333333333333

// This is pointless but it still works
convert(2).seconds.to.days === 0.000023148148148148147;

// combine units with and and less
convert(2).minutes.and(30).seconds.to.seconds  === 150;
convert(2).minutes.less(30).seconds.to.seconds === 90;
convert(2).minutes.and(30).seconds.and(3).months.to.seconds === 7889550;

// Alternative whats or giveme style
whats(3).weeks.in.seconds === 1814400;
giveme(4).months.and(5).days.in.hours === 3042;
```

*For the purposes of this package a year is defined here as 365.25 days and a month is defined as 365.25/12 days.*
