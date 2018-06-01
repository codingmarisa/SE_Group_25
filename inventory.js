module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT item_id, name, weight, manufactureDate, expirationDate FROM item", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results;
            complete();
        });
    }

    function getFood(res, mysql, context, complete){
        mysql.pool.query("SELECT I.item_id, I.name, I.weight, F.calories, F.fat, F.protein FROM item I INNER JOIN item_food F ON I.item_id=F.item_id", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.food = results;
            complete();
        });
    }    

    function getItem(res, mysql, context, id, complete){
        var sql = "SELECT item_id, name, weight, manufactureDate, expirationDate FROM item WHERE item_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.item = results[0];
            complete();
        });
    }  

    /*Display all items. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.sub = "Inventory";
        context.jsscripts = ["js/deleteitem.js", "js/removeitem.js"];
        var mysql = req.app.get('mysql');
        getFood(res, mysql, context, complete);
        getItems(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('inventory', context);
            }

        }
    });

    /* Display one item for the specific purpose of updating it */

    router.get('/item/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["js/updateitem.js"];
        var mysql = req.app.get('mysql');
        getItem(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-item', context);
            }

        }
    });

    /* Adds a food item, redirects to the pack page after adding */

    router.post('/addFood', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO item (name, weight) VALUES (?, ?)";
        var sql2 = "INSERT INTO item_food ( item_id, calories, fat, protein) VALUES ((SELECT MAX(item_id) FROM item), ?, ?, ?)";
        var inserts = [req.body.foodName, req.body.foodWeight, req.body.calories, req.body.fat, req.body.protein];
        var inserts2 = [req.body.calories, req.body.fat, req.body.protein]

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
                res.redirect('/inventory');
            }
        });
    });

    /* The URI that update data is sent to in order to update an item */

    router.put('/item/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE item SET name=?, weight=? WHERE item_id=?";
        var inserts = [req.body.name, req.body.weight, req.params.id];
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

    /* Route to delete an item, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/item:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM item WHERE item_id = ?";
        var inserts = [req.params.id];
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
