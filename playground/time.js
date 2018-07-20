var moment = require('moment');

var createAt = 1234;
var someTimestamp = moment().valueOf();
console.log(someTimestamp)
var date = moment(createAt);
console.log(date.format('h:mm a'));