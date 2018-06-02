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

    return router;
}();