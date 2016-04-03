var moment = require('moment');
var now = moment();

//unix timestamp seconds
console.log(now.format('X'));//1459702003

//unix timestamp miliseconds
console.log(now.format('x'));//1459702003954


//we can compare 2 timestamps by using now.valueOf()

// console.log(now.format("DMMM h:mma"));//3Apr 10:10pm

// now.subtract(1, 'hour');

// console.log(now.format("DMMM h:mma"));//3Apr 9:10pm
