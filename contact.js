// contact.js
//
// Description:     This is the back-end file which controls the logic for
//                  getting and displaying the contact page
// ..................................................................................

module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var app = express();
    var nodemailer = require('nodemailer');

// generate a context to use on client-side
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
//              database to the /contact page.
//
//  @param      /               the URL path after ./contact
//  @param      function        page for contacting us
// ............................................................
router.get('/', function(req, res){
    var context = {};
    context.sub = "Contact Form";
    res.render('contact', context);
});

// HANDLES POST REQUESTS
///////////////////////////////////////////////

// ............................................................
//
//  ROUTE: post (/)
//
//  descrption: a router to send contact info to our email
//
//  @param      /               the URL path after ./contact
//  @param      function        logic to send email based on form contents
// ............................................................
router.post('/', function(req, res) {
    // following along with this youtube video is very helpful
    // https://www.youtube.com/watch?v=nF9g1825mwk
    // set up content of email
    const output = `
      <p>Contact Form Submitted from Site</p>
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.contactFirstName} ${req.body.contactLastName}</li>
        <li>Email: ${req.body.contactEmail}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.contactMessage}</p>
    `;
  
    // set up the nodemailer transporter
    // feel free to replace this whatever we need for gmail auth on our own
    // account
    var transporter = nodemailer.createTransport( {
      service: 'gmail',
      auth: {
        user: 'eightbitllc@gmail.com',
        pass: '5Y2m^Jz!&H'
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    var mailOptions = {
      from: '"Farm2U Contact-Form" <eightbitllc@gmail.com>',
      to: 'eightbitLLC@gmail.com',
      subject: 'Farm2U Contact Form',
      html: output
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        res.render('contact', {message:error});
      }
      res.render('contact', {message:'Email has been sent successfully'});
    });
  });

  return router;
}();