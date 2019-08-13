var mysql = require('mysql');
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
app.use(express.static(path.join(__dirname, 'views')));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'ztech@44',
	database : 'Problem'
});
app.use(session({
  secret: 'url hide and save session',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
console.log("Server .... http:localhost:3000/")
app.set('view engine', 'ejs');
app.get('/',function(req,res){
   var message = ' ';
   res.render('home',{message})
});

app.post('/login', function(req, res) {
   var message = ''; 
   var post  = req.body;
   var name = post.user_name;
   var pass = post.password;
   var sql=`SELECT Id, First_name, Last_name, UserName FROM Data WHERE UserName ='${name}' and Password = '${pass}'`;                           
   connection.query(sql, function(err, results){  
      console.log(results)    
      if(results.length){
         req.session.userId = results[0].Id;
         req.session.user = results[0].UserName;
         console.log(results[0].Id);
         message = "Welcome " + req.session.user + " You have successfully login " + results[0].First_name;
          res.render('home',{message});
      }
      else{
         message = 'Wrong Credentials.';
         res.render('home',{message: message});
         }        
   });       
})

app.get('/signup', function(req, res) {
   message = '';
   res.render('signup',{message: message});
})

app.get('/login', function(req, res) {
   message = '';
   res.render('home',{message: message});
})

app.post('/signup', function(req,res){
   var message= '';
   var post  = req.body;
   var name= post.user_name;
   var pass= post.password;
   var fname= post.first_name;
   var lname= post.last_name;
   var Email= post.Email;
   var sql = "INSERT INTO `Data` ( `First_Name`,`Last_name`,`Email`,`UserName`,`Password`) VALUES('"+fname+"','"+lname+"','"+Email+"','"+name+"','"+pass+"');";
   connection.query(sql, function(err, result) {
      console.log(result);
      message = "Succesfully! Your account has been created.";
      res.render('signup',{message})
   });
})

app.listen(3000)