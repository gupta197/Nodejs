const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');



var index = require('./route/index')
var logger = require('./config/logger')
var winston = require('./config/winston')
var db = require('./config/db')

var app = express();
app.use(express.static(path.join(__dirname, 'views/'))); // giving the static path 
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
//The middleware to handle url encoded data is returned by bodyParser
app.use(bodyParser.json());

const PORT = 3000;

// logger stream to save error or info store in database and log file aslo
logger.stream = {
    write: async function (message, encoding) {
        logger.error(message);
        winston.error(message);  
    }
};

//morgan for server error detect and save in log file
app.use(morgan("combined", {
    skip: function (req, res) { return res.statusCode < 400 },
    "stream": logger.stream
}));


app.use('/', index) // view all API's in it


// run the server 
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});