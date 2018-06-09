// dbcon.js
//
// Description: 	The purpose of this file is to allow access to the database
// ..................................................................................

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_username',
  password        : 'password',
  database	  	  : 'cs361_username',
  dateStrings     : 'date' 
});

module.exports.pool = pool;
