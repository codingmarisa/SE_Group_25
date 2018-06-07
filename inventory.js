// inventory.js
//
// Description:     This is the back-end file which controlls the logic for
//                  getting and displaying a farmer account's inventory to the
//                  farmer. It also gives the farmer the ability to update inventory
// ..................................................................................

module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // ............................................................
    //
    //  FUNCTION: getItems
    //
    //  descrption: gets information about items from the database
    //              and adds it to the front ent's page context
    //              this returns ALL items
    //
    //  @param      res         the results of the getItems query
    //  @param      mysql       the mysql database
    //  @param      context     the context to store results to
    //  @param      complete    callback function
    // ............................................................
    function getItems(res, mysql, context, complete){

        // run a query to get all items from the database
        mysql.pool.query("SELECT it_item_id, it_name, price FROM Item", function(error, results, fields){
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
    //  FUNCTION: getUserItems
    //
    //  descrption: gets information about an item from the
    //              database. Returns a SINGLE item
    //
    //  @param      res         the results of the getFood query
    //  @param      mysql       the mysql database
    //  @param      context     the context to store results to
    //  @param      complete    callback function
    // ............................................................
    function getUserItems(res, mysql, context, complete){
        // run a query to get a specific item at item_id
        console.log("LOGINID");
        console.log(context.loginId);
        var sql = "SELECT It.it_item_id, It.it_name, I.quantity, It.price FROM Account A INNER JOIN Inventory I ON A.a_acct_id=I.inv_acct_id INNER JOIN Item It ON I.inv_item_id=It.it_item_id WHERE a_acct_id= ?";
        var inserts = [context.loginId];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            // add the results to item
            context.item = results;
            console.log(context.item);
            complete();
        });
    }  

    // ............................................................
    //
    //  FUNCTION: getItem
    //
    //  descrption: gets information about an item from the
    //              database. Returns a SINGLE item
    //
    //  @param      res         the results of the getFood query
    //  @param      mysql       the mysql database
    //  @param      context     the context to store results to
    //  @param      complete    callback function
    // ............................................................
    function getItem(res, mysql, context, id, complete){
        // run a query to get a specific item at item_id
        var sql = "SELECT it_item_id, it_name, price FROM Item WHERE it_item_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            // add the results to item
            context.item = results[0];
            complete();
        });
    }  

    // ............................................................
    //
    //  ROUTE: get (/)
    //
    //  descrption: a router to get information from the
    //              database to the /inventory page. Requires web
    //              based javascript to delete users with AJAX
    //
    //  @param      /               the URL path after ./inventory
    //  @param      function        logic to add page information
    // ............................................................
    router.get('/', function(req, res){

        var callbackCount = 0;                                          // tracks the number of functions that need to be complete before rendering the page
        var context = {};                                               // information to be injected into the page
        context.sub = "Inventory";                                      // the page subtitle
        context.jsscripts = ["js/deleteitem.js", "js/removeitem.js"];   // javascript to be injected into the page
        var mysql = req.app.get('mysql');                               // the database
        getItems(res, mysql, context, complete);                        // callback = 1
        function complete(){                                            // wait until getItems() is complete before rendering
            callbackCount++;
            if(callbackCount >= 1){
                res.render('inventory', context);                       // render the inventory page
            }

        }
    });

    // ............................................................
    //
    //  ROUTE: get (/:uid)
    //
    //  descrption: a router to get information from the
    //              database to the /inventory page for a specific
    //              user.
    //
    //  @param      /:uid           the URL path after ./inventory
    //  @param      function        logic to add page information
    // ............................................................
    router.get('/:loginId', function(req, res){

        var callbackCount = 0;                                          // tracks the number of functions that need to be complete before rendering the page
        var context = {};                                               // information to be injected into the page
        context.sub = "Inventory";                                      // the page subtitle
        context.loginId = req.params.loginId;
        context.jsscripts = ["js/deleteitem.js", "js/removeitem.js"];   // javascript to be injected into the page
        var mysql = req.app.get('mysql');                               // the database
        getUserItems(res, mysql, context, complete);                    // callback = 1
        function complete(){                                            // wait until getFood() and getItems() are complete before rendering
            callbackCount++;
            if(callbackCount >= 1){
                res.render('inventory', context);                       // render the inventory page
            }

        }
    });

    // ............................................................
    //
    //  ROUTE: post (/:uid)
    //
    //  descrption: a router to get information from the
    //              database to the /inventory page for a specific
    //              user.
    //
    //  @param      /:uid           the URL path after ./inventory
    //  @param      function        logic to add page information
    // ............................................................
    router.post('/:loginId', function(req, res){

        var callbackCount = 0;                                          // tracks the number of functions that need to be complete before rendering the page
        var context = {};                                               // information to be injected into the page
        context.sub = "Inventory";                                      // the page subtitle
        context.loginId = req.params.loginId;
        context.jsscripts = ["js/deleteitem.js", "js/removeitem.js"];   // javascript to be injected into the page
        var mysql = req.app.get('mysql');                               // the database

        // queries to the database
        var sql = "INSERT INTO Item (it_name, price) VALUES (?, ?)";
        var inserts = [req.body.itemName, req.body.itemPrice];
        var sql2 = "INSERT INTO Inventory (inv_acct_id, inv_item_id, quantity) VALUES ((?), (SELECT MAX(it_item_id) FROM Item), (?))"
        var inserts2 = [context.loginId, req.body.itemQuantity];

        // run the queries
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
        });
        sql2 = mysql.pool.query(sql2,inserts2,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
        });
        getUserItems(res, mysql, context, complete);                    // callback = 1
        function complete(){                                            // wait until getFood() and getItems() are complete before rendering
            callbackCount++;
            if(callbackCount >= 1){
                res.render('inventory', context);                       // render the inventory page
            }

        }
    });

    // ............................................................
    //
    //  ROUTE: get (/item/:id)
    //
    //  descrption: routes to an update item page with the
    //              appropriate item id
    //
    //  @param      /item/:id       the URL path after ./inventory
    //  @param      function        logic to add page information
    // ............................................................
    router.get('/item/:loginId/:itemId', function(req, res){
        callbackCount = 0;                                          // tracks the number of functions that need to be complete before rendering the page 
        var context = {};                                           // information to be injected into the page 
        context.loginId = req.params.loginId;   
        context.jsscripts = ["js/updateitem.js"];                   // javascript to be injected into the page
        var mysql = req.app.get('mysql');                           // the database
        getItem(res, mysql, context, req.params.itemId, complete);  // callback = 1
        function complete(){                                        // wait until getItem() is complete before rendering
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-item', context);                 // render the update-item page
            }

        }
    });

    // ............................................................
    //
    //  ROUTE: post (/addFood)
    //
    //  descrption: adds a food item and redirects to the inventory
    //              page after adding
    //
    //  @param      /addFood       the URL path after ./inventory
    //  @param      function       logic to add page information
    // ............................................................
    router.post('/addItem', function(req, res){

        // the database
        var mysql = req.app.get('mysql');

        // queries to the database
        var sql = "INSERT INTO Item (it_name, price) VALUES (?, ?)";
        var inserts = [req.body.itemName, req.body.itemPrice];

        // run the queries
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/inventory'); // refresh the page
            }
        });
    });

    // ............................................................
    //
    //  ROUTE: put (/item/:id)
    //
    //  descrption: SQL queries to update an item
    //
    //  @param      /item/:id      the URL path after ./inventory
    //  @param      function       logic to update an item
    // ............................................................
    router.put('/item/:loginId/:itemId', function(req, res){
        var mysql = req.app.get('mysql');                                         // the database
        var sql = "UPDATE Item SET it_name=?, price=? WHERE it_item_id=?";        // the SQL query to be sent
        var inserts = [req.body.it_name, req.body.price, req.params.itemId];          // SQL information from the page

        // run the query
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    // ............................................................
    //
    //  ROUTE: delete (/item:id)
    //
    //  descrption: deletes an item from the database and returns
    //              a 202 upon success. Handled by AJAX
    //
    //  @param      /item:id      the URL path after ./inventory
    //  @param      function      logic to delete an item
    // ............................................................
    router.delete('/deleteitem/:aid/:iid', function(req, res){
        var mysql = req.app.get('mysql');                                                   // the database
        var sql = "DELETE FROM Inventory WHERE inv_acct_id = ? AND inv_item_id = ?";        // the delete query
        var inserts = [req.params.aid, req.params.iid];                                     // item id to be injected into the query

        //  run the query
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        });
    });

    return router;
}();
