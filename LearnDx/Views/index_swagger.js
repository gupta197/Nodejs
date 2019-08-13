const express = require("express");     // Import Express module
   // Import events module
const app = express();               //  app is an instance of the express module
const Learn= require('./routes/Learn');
const path = require('path');         // Import path module
app.use(express.static(path.join(__dirname, 'views')));
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
var swaggerDefinition = {
   info: {
     title: 'User module',
     version: '1.0.0',
     description: 'In this Project we will Add, Delete, Edit the User data in Database and we will display all the user in html',
   },
   host: 'localhost:4000',
   basePath: '/',
 };
 // options for the swagger docs
 var options = {
   // import swaggerDefinitions
   swaggerDefinition: swaggerDefinition,
   // path to the API docs
   apis: ['./routes/*.js']// pass all in array 
};   // initialize swagger-jsdoc
app.get("/swagger", function( req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
var swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.set('view engine', 'ejs');                 // set template engine name
app.use(express.urlencoded({extended: false})); //he middleware to handle url encoded data is returned by bodyParser
app.use(bodyParser.json());               //bodyParser.json returns middleware that only parses json
app.use(bodyParser.urlencoded({extended: false}));  //Store it in a constiable named bodyParser
app.use('/',Learn);

// serve swagger
console.log("connect to server ....");
app.listen(4000);   // port number  4000
