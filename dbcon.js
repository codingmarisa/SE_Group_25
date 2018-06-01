var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_walkertu',
  password        : 'group25',
  database	  	  : 'cs361_walkertu',
  dateStrings     : 'date' 
});

module.exports.pool = pool;