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
        mysql.pool.query("SELECT item_id, name, weight, manufactureDate, expirationDate FROM item", function(error, results, fields){
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
    //  FUNCTION: getFood
    //
    //  descrption: gets information about a food item from the 
    //              database (food is a subset of items). This
    //              returns a SINGLE food
    //
    //  @param      res         the results of the getFood query
    //  @param      mysql       the mysql database
    //  @param      context     the context to store results to
    //  @param      complete    callback function
    // ............................................................
    function getFood(res, mysql, context, complete){
        // run a query to get a specific food item at item_id
        mysql.pool.query("SELECT I.item_id, I.name, I.weight, F.calories, F.fat, F.protein FROM item I INNER JOIN item_food F ON I.item_id=F.item_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            // add the results to food
            context.food = results;
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
        var sql = "SELECT item_id, name, weight, manufactureDate, expirationDate FROM item WHERE item_id = ?";
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
        getFood(res, mysql, context, complete);                         // callback = 1
        getItems(res, mysql, context, complete);                        // callback = 2
        function complete(){                                            // wait until getFood() and getItems() are complete before rendering
            callbackCount++;
            if(callbackCount >= 2){
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
    router.get('/item/:id', function(req, res){
        callbackCount = 0;                                          // tracks the number of functions that need to be complete before rendering the page 
        var context = {};                                           // information to be injected into the page    
        context.jsscripts = ["js/updateitem.js"];                   // javascript to be injected into the page
        var mysql = req.app.get('mysql');                           // the database
        getItem(res, mysql, context, req.params.id, complete);      // callback = 1
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
    router.post('/addFood', function(req, res){

        // the database
        var mysql = req.app.get('mysql');

        // queries to the database
        var sql = "INSERT INTO item (name, weight) VALUES (?, ?)";
        var sql2 = "INSERT INTO item_food ( item_id, calories, fat, protein) VALUES ((SELECT MAX(item_id) FROM item), ?, ?, ?)";
        var inserts = [req.body.foodName, req.body.foodWeight, req.body.calories, req.body.fat, req.body.protein];
        var inserts2 = [req.body.calories, req.body.fat, req.body.protein]

        // run the queries
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{

            }
        });
        sql = mysql.pool.query(sql2,inserts2,function(error, results, fields){
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
    router.put('/item/:id', function(req, res){
        var mysql = req.app.get('mysql');                                       // the database
        var sql = "UPDATE item SET name=?, weight=? WHERE item_id=?";           // the SQL query to be sent
        var inserts = [req.body.name, req.body.weight, req.params.id];          // SQL information from the page

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
    router.delete('/item:id', function(req, res){
        var mysql = req.app.get('mysql');                                       // the database
        var sql = "DELETE FROM item WHERE item_id = ?";                         // the delete query
        var inserts = [req.params.id];                                          // item id to be injected into the query

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
