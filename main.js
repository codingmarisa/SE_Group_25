// main.js
//
// Description:     This is the back-end file which controlls the main entry point
//					of the Farm2U backend
// ..................................................................................

var express = require('express');												
var mysql = require('./dbcon.js');											
var bodyParser = require('body-parser');										

var app = express();															
var handlebars = require('express-handlebars').create({defaultLayout:'main'});		

app.engine('handlebars', handlebars.engine);										
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use('/inventory', require('./inventory.js'));
app.use('/login', require('./login.js'));
app.use('/createAccount', require('./createAccount.js'));
app.use('/updateAccount', require('./updateAccount.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
