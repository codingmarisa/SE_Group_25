var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_[YOUR USERNAME]',
  password        : '[YOUR PASSWORD]',
  database	  	  : '[YOUR USERNAME]',
  dateStrings     : 'date' 
});

module.exports.pool = pool;
