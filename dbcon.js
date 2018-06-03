// dbcon.js
//
// Description: 	The purpose of this file is to allow access to the database
// ..................................................................................

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_[YOUR USERNAME]',
  password        : '[YOUR PASSWORD]',
  database	  	  : 'cs361_[YOUR USERNAME]',
  dateStrings     : 'date' 
});

module.exports.pool = pool;
