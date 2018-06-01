// login.js
//
// Description:     This is the back-end file which controlls the logic for
//                  getting and displaying the login page
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
        context.sub = "Login";
        var mysql = req.app.get('mysql');
        res.render('login', context);
    });

    return router;
}();