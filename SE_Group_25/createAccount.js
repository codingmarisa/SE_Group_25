// createAccount.js
//
// Description:     This is the back-end file which controlls the logic for
//                  getting and displaying the createAccount page
// ..................................................................................

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // ............................................................
    //
    //  ROUTE: get (/)
    //
    //  descrption: a router to get information from the
    //              database to the /login page.
    //
    //  @param      /               the URL path after ./login
    //  @param      function        logic to add page information
    // ............................................................
    router.get('/', function(req, res){
        var context = {};
        context.sub = "createAccount";
        var mysql = req.app.get('mysql');
        res.render('createAccount', context);
    });

	
    // ............................................................
    //
    //  ROUTE: post (/addUser)
    //
    //  descrption: adds a user and redirects to the inventory
    //              page after adding
    //
    //  @param      /addUser       the URL path after ./createAccount
    //  @param      function       logic to add page information
    // ............................................................
    router.post('/addUser', function(req, res){

        // the database
        var mysql = req.app.get('mysql');

        // queries to the database
        var sql = "INSERT INTO Account (username, password, acct_type) VALUES (?, ?, ?)";
        var inserts = [req.body.uname, req.body.psw, req.body.Choose];

        // run the queries
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/login'); // refresh the page
            }
        });
    });	
	
	
	
	
	
	
	
	
	
    return router;
}();