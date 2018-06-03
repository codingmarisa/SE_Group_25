// updateAccount.js
//
// Description:     This is the back-end file which controlls the logic for
//                  getting and displaying the update account page
// ..................................................................................

module.exports = function(){
    var express = require('express');
    var router = express.Router();

	// ............................................................
    //
    //  ROUTE: get (/)
    //
    //  descrption: a router to get information from the
    //              database to the /updateAccount page.
    //
    //  @param      /               the URL path after ./updateAccount
    //  @param      function        logic to add page information
    // ............................................................
    router.get('/', function(req, res){
        var context = {};
        context.sub = "Update Account";
        var mysql = req.app.get('mysql');
        res.render('updateAccount', context);
    });
	
	
    // ............................................................
    //
    //  FUNCTION: updateAccount
    //
    //  descrption: updates Account Info of currently logged in
    //              user by ID returning a success message or 
    //              error message.
    //
    //  @param      res         the results of the query
    //  @param      mysql       the mysql database
    //  @param      context     the context to store results to
    //  @param      complete    callback function
    // ............................................................
    // TODO: Add functionality to update account here.
    function updateAccount(res, mysql, context, complete){

        // run a query to update this specific user's account
        mysql.pool.query("UPDATE account SET username=[username_input]," + 
        "password=[passwordInput], acct_type=[accountTypeInput] " +
        "WHERE a_acct_id=[currentUserID]", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }

            // add the results to item
            context.item = results;
            complete();
        });
    }

    // ............................................................
    //
    //  FUNCTION: deleteAccount
    //
    //  descrption: deletes account of currently logged in
    //              user by ID returning a success message or 
    //              error message.
    //
    //  @param      res         the results of the query
    //  @param      mysql       the mysql database
    //  @param      context     the context to store results to
    //  @param      complete    callback function
    // ............................................................
    function deleteAccount(res, mysql, context, complete){

        // run a query to update this specific user's account
        mysql.pool.query("DELETE FROM account" +
        "WHERE a_acct_id=[currentUserID]", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }

            // add the results to item
            context.item = results;
            complete();
        });
    }

    return router;
}();

// SQL to update account info
// UPDATE account SET username=[username_input], 
//     password=[passwordInput], acct_type=[accountTypeInput] 
//     WHERE a_acct_id=[currentUserID]


