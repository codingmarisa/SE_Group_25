// login.js
//
// Description:     This is the back-end file which controlls the logic for
//                  getting and displaying the login page
// ..................................................................................

module.exports = function(){
    var express = require('express');
    var router = express.Router();

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

function genContext(type, request){
  var qParams = [];   //  holds query string data
  var bParams = [];   //  holds data from the body in the case of a POST

  //  parse the query string
  for (var p in request.query)
  {
    qParams.push({'name':p,'value':request.query[p]})
    console.log("generating Get Request Item");
  }

  //  if the context is a POST, parse the body
  if (type === 'POST')
  {
    for (var p in request.body)
    {
      bParams.push({'name':p,'value':request.body[p]})
      console.log("generating Query Request Item");
    }
  }

  // generate a context to use on client-side
  var context = {};
  context.type = type;          // GET or POST request
  context.queryList = qParams;  // list of query items
  context.bodyList = bParams;   // list of body items

  return context;
}

// HANDLES GET REQUESTS
///////////////////////////////////////////////

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

// HANDLES POST REQUESTS
///////////////////////////////////////////////

// ............................................................
//
//  ROUTE: post (/)
//
//  descrption: a router to post username/password and find
//              out if they're stored in the database
//
//  @param      /               the URL path after ./login
//  @param      function        logic to add page information
// ............................................................
router.post('/', function(req,res){
    console.log("Start Post");

    // the database
    var mysql = req.app.get('mysql');
    var context = {};
    context.sub = "login";

    // queries to the database
    var sql = "SELECT a_acct_id FROM Account WHERE username = ? AND password = ?";
    var inserts = [req.body.username, req.body.password]

    // run the queries
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){                                                   // if an error occurs
            console.log("ERROR OCCURRED");                           // print error to console
            res.write(JSON.stringify(error));
            res.end();
        }else if (results[0] == undefined){                          // if the query returns undefined
            console.log("failed to authenticate!");                  // a user account was not found; report in console
            res.render('login', context);                            // re-render the login page
        }else{                                                       // if the query returns a valid login...
            console.log("login success!");                           // report success in console
            results = JSON.stringify(results[0].a_acct_id);          // account ID is stored in results
            console.log(results);                                    // account ID is displayed in console
            res.render('./inventory', context);                      // render the appropriate page
        }
    });
});

    return router;
}();