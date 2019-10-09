const express = require('express');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream')
var uuid = require('node-uuid')

const PORT = 3000;
const app = express();

// morgan.token('id', function getId (req) {
//     return req.id
//   })
   
// //   var app = express()
   
//   app.use(assignId)
  app.use(morgan(' :method :url :response-time :url :remote-addr  :remote-user '))
   
  app.get('/', function (req, res) {
    res.send('hello, world!')
  })
   
//   function assignId (req, res, next) {
//     req.id = uuid.v4()
//     next()
//   }

// app.use(morgan('dev', {
//     skip: function (req, res) { return res.statusCode < 400 }
//   }))
   
//   // log all requests to access.log
//   app.use(morgan('common', {
//     stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//   }))

// var logDirectory = path.join(__dirname, 'logs')
 
// ensure log directory exists
// fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
 
// create a rotating write stream
// var accessLogStream = rfs('access.log', {
//   interval: '1d', // rotate daily
//   path: logDirectory
// })
// var accessLogStream = fs.createWriteStream(path.join(__dirname, `/logs/${Date()}access.log`), { flags: 'a' })
 
// use combined preset, see https://github.com/expressjs/morgan#combined
// app.use(morgan('dev'))

// app.use(morgan('combined', { stream: accessLogStream }))
// console.log(path.join(__dirname, 'access.log'))

app.get('/', (req, res)  => {
  res.send('Hello from Express.js server!')
});

app.get('/:stuff', (req, res)  => {
    res.send(`Hello ${req.params.stuff}`);
  });


// run the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


 