const express = require("express");     // Import Express module
   // Import events module
const app = express();               //  app is an instance of the express module
const Learn= require('./routes/Learn');
const path = require('path');         // Import path module
app.use(express.static(path.join(__dirname, 'views')));
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');                 // set template engine name
app.use(express.urlencoded({extended: false})); //he middleware to handle url encoded data is returned by bodyParser
app.use(bodyParser.json());               //bodyParser.json returns middleware that only parses json
app.use(bodyParser.urlencoded({extended: false}));  //Store it in a constiable named bodyParser
app.use('/',Learn);
console.log("connect to server ....");
// app.engine('ejs', require('ejs').renderFile);
app.listen(4000);   // port number  4000
