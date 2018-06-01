module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
        var context = {};
        context.sub = "Login";
        var mysql = req.app.get('mysql');
        res.render('login', context);
    });

    return router;
}();