var express = require("express");     // Import Express module
var mysql  = require('mysql');       // Import mysql module
var util = require('util');         // Import events module
var app = express();               //  app is an instance of the express module
var path = require('path');         // Import path module
var bodyParser = require('body-parser');  // Import body- parser Module
var formidable = require('formidable');   // Import Formidable module
var fs = require('fs');                   // Import file system(fs) module
var moment = require('moment');           // import moment module for date and time
app.use(express.urlencoded({extended: false})); //he middleware to handle url encoded data is returned by bodyParser
app.use(bodyParser.json());               //bodyParser.json returns middleware that only parses json
app.use(bodyParser.urlencoded({extended: false}));  //Store it in a variable named bodyParser
app.set('view engine', 'ejs');                 // set template engine name
app.use(express.static('views'));               // set the sattic path to browser where the file to pick
var connection = mysql.createConnection({        // create connection with mysql
  host     : 'localhost',        // server name
  user     : 'root',                // mysql user name
  password : 'ztech@44',         //mysql password
  database : 'LearnDx'          // using the database name in mysql
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

app.get("/",function(req,res){                    // creating the callback function with get method or starting page

connection.query('SELECT * from User limit 5 offset 0', function(err, rows, fields) {           // send the query and fetching record from database
var detail=[];  // creating detail name array
  if (!err) {//console.log('The solution is: ', rows);
    for (var i = 0; i < rows.length; i++) {
  	  			// Create an object to save current row's data

  		  		var add = {
  		  			'Id':rows[i].Id,
              'Image':rows[i].Image,
  		  			'UserName':rows[i].UserName,
  		  			'Email':rows[i].Email,
              'Role':rows[i].Role,
              'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
  		  		}
            detail.push(add);         // inser the values in detail arrays
          }
          connection.query('SELECT * from User', function(err, rows) {
            if(!err){
          var pageSize = 5;           // limit of page data
          var pageCount = Math.round(rows.length/5);         // a
          var currentPage = 1;        // page start with current page
      res.render('User',{detail:detail,                   // render the User html page with send the variable with it
      pageSize:pageSize,
      currentPage:currentPage,
      pageCount:pageCount});}
    });

    }
  else
    {console.log('Error while performing Query.');} // console the query err if compilor throw the console.error
  });

});

app.post('/',function(req,res){
  var search = req.body.search;       //request the search variable name from user html form
    var role = req.body.role;       //request the Role variable name from user html form
    if(search == '' && role != '')    {             //check if search is empty or role is not empty
      var sql = "SELECT * FROM `User` WHERE UserName='"+search+"' or Role= '"+role+"'"; // creating query according them
    }
    if(search != '' && role == ''){         //check if search is not empty or role is empty
      var sql = "SELECT * FROM `User` WHERE UserName LIKE '%"+search+"%'";    // creating query according them
    }
    if(search != '' && role != ''){         // check if both data is not empty
      var sql = "SELECT * FROM `User` WHERE UserName LIKE '"+search+"%' or Role= '"+role+"'";// creating query according them
    }
    if(search == "" && role == ''){         //check if both data is empty
        var sql = "SELECT * from User limit 5 offset 0";// creating query according them
   }
       connection.query(sql, function(err, rows, fields){     // send query and fetch record according to query
         var detail=[];       // array with name details
         if (!err)
           {
           for (var i = 0; i < rows.length; i++) {
                   // Create an object to save current row's data
                   var add = {
                     'Id':rows[i].Id,
                     'Image':rows[i].Image,
                     'UserName':rows[i].UserName,
                     'Email':rows[i].Email,
                     'Role':rows[i].Role,
                     'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
                            }
                   detail.push(add);      // insert the data which is fetch form Query
                 }

                 var pageSize = 5;          // total page data display to User
                 var pageCount =rows.length/5; // total page
                 var currentPage = 1;       //current page start with 1
             res.render('User',{detail:detail,      //Render User html page and sending the variable to user page
             pageSize:pageSize,
             currentPage:currentPage,
             pageCount:pageCount});
                }
                else{
                        res.render("view");       // render html  views page if error found in query
                }
           });
});

app.get("/delete/:id",function(req,res){
  var detail=[];        // create the array with name Details
  var hi=req.params.id;     // request the parameter id which is in URL and assign to hii variable
  var sql="DELETE FROM User WHERE id=" +hi ;        // create query with delete the user which is id id hi
  connection.query(sql, function(err, rows, fields) {
    if (!err)
      {console.log('this is delete ',rows);
      connection.query('SELECT * from User limit 5 offset 0', function(err, rows, fields) {
      var detail=[];
        if (!err)
          {console.log('The solution is: ', rows);
          for (var i = 0; i < rows.length; i++) {
        	  			// Create an object to save current row's data
        		  		var add = {
        		  			'Id':rows[i].Id,
                    'Image':rows[i].Image,
        		  			'UserName':rows[i].UserName,
        		  			'Email':rows[i].Email,
                    'Role':rows[i].Role,
                    'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
        		  		}
                  detail.push(add);
                }
                connection.query('SELECT * from User', function(err, rows) {    // this is use for total rows in database and create variable to according to them
                  if(!err){
                var pageSize = 5;
                var pageCount = Math.round(rows.length/5);;
                var currentPage = 1;
             res.render('User',{detail:detail,
             pageSize:pageSize,
             currentPage:currentPage,
             pageCount:pageCount});}
             });

          }
        });
      }
    else{
      console.log('Error while performing Query.');    }
    });
});

app.get("/add",function(req,res) {
  res.render("add");    // if user want the add the detail this will render the add html to user
});

app.get("/edit/:id",function(req,res) {    // creating the callback function to edit the User details
  var hi=req.params.id;                   // request the user id which is cvhange by the user
  var sql="Select * FROM User WHERE id=" +hi ; // create the query
  connection.query(sql,function(err, rows,fields) {
    if(!err){
    var val=[];
    for (var i = 0; i < rows.length; i++) {
            var add = {
              'Id':rows[i].Id,
              'Image':rows[i].Image,
              'UserName':rows[i].UserName,
              'Email':rows[i].Email,
              'Role':rows[i].Role,
              'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
            }
            val.push(add);
          }
      res.render("Edit",{val:val});   // Render the edit html page  with sending user detail
  }
    else{
      console.log(err);   // console the error found the in query
    }
  })
});

app.post("/update",function(req,res){     // create the update callback function of the user details
  var form = new formidable.IncomingForm();     // create the form instance of formidable.IncomingForm
  form.parse(req, function (err, fields, files) {     //request the form fields  variable use in edit html page
      var val=[];
      val=util.inspect(fields); // getting the fields use in form
      console.log(val); //console the variable which is name is val
      var Id=fields.Id;     //creating the fields variable
      var UserName=fields.UserName;
      var Email=fields.Email;
      var Role=fields.Role;
      if(files.filetoupload.name == "")   // check the user upload file or not
      {
        var Image =fields.Pic;
               var sql="UPDATE User SET Image='"+Image+"',UserName='"+UserName+"',Email='"+Email+"',Role='"+Role+"' WHERE Id=" +Id;
                 connection.query(sql, function(err, rows,fields)  {
                     if(!err){
                       connection.query('SELECT * from User limit 5 offset 0', function(err, rows, fields) {
                       var detail=[];
                         if (!err)
                           {            for (var i = 0; i < rows.length; i++) {
                                   // Create an object to save current row's data
                                   var add = {
                                     'Id':rows[i].Id,
                                     'Image':rows[i].Image,
                                     'UserName':rows[i].UserName,
                                     'Email':rows[i].Email,
                                     'Role':rows[i].Role,
                                     'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
                                   }
                                   detail.push(add);
                                 }
                                 connection.query('SELECT * from User', function(err, rows) {
                                   if(!err){
                                 var pageSize = 5;
                                 var pageCount = Math.round(rows.length/5);;
                                 var currentPage = 1;
                             res.render('User',{detail:detail,
                             pageSize:pageSize,
                             currentPage:currentPage,
                             pageCount:pageCount});}
                           });
                         }
                         });
                     }
                   });
      }
      else
      {var Image=files.filetoupload.name;     // get the file name
      var oldpath = files.filetoupload.path;    // get the old path of pic
      var newpath = '/home/vikas/myapp/views/images/' + files.filetoupload.name;    // create the new path of file
      fs.rename(oldpath, newpath, function (err) {      // change the file directory with tye same of file name
        if (err)      // if find any error during changing the directory
        { console.log(err);} //console the error
        else{//update image, UserName, Email, ROle
         var sql="UPDATE User SET Image='"+Image+"',UserName='"+UserName+"',Email='"+Email+"',Role='"+Role+"' WHERE Id=" +Id;
         connection.query(sql, function(err, rows, fields)  {
             if(!err){
               connection.query('SELECT * from User', function(err, rows, fields) {
                 if (!err)
                   {
                       var detail=[];
                        for (var i = 0; i < rows.length; i++) {
                           var add = {
                             'Id':rows[i].Id,
                             'Image':rows[i].Image,
                             'UserName':rows[i].UserName,
                             'Email':rows[i].Email,
                             'Role':rows[i].Role,
                             'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
                                    }
                           detail.push(add);
                            }
                            connection.query('SELECT * from User', function(err, rows) {// getting the total record in database and create variables
                              if(!err){
                            var pageSize = 5;
                            var pageCount = rows.length/5;
                            var currentPage = 1;
                        res.render('User',{detail:detail,
                        pageSize:pageSize,
                        currentPage:currentPage,
                        pageCount:pageCount});
                      }
                    });
                     }
                                                                    });
             }
           });
            }
      });
    }
 });

  });

app.post("/insert",function(req,res){       // create the insert callback function of the user details
  var form = new formidable.IncomingForm(); // create the form instance of formidable.IncomingForm
  form.parse(req, function (err, fields, files) {     // requet the form details
      var val=[];
      val=util.inspect(fields);   //check the fielda values
      console.log(val); // create the variables according to field
      var Id=fields.Id;
      var UserName=fields.UserName;
      var Email=fields.Email;
      var Role=fields.Role;
      console.log(files.filetoupload.name);
      if(files.filetoupload.name == "")     //CHECK THE FILE IS upload
      {var sql="INSERT INTO User(UserName, Email, Role) VALUES  ('"+UserName+"','"+Email+"','"+Role+"');"; //create query if form not get the image
      console.log(sql);
                 connection.query(sql, function(err, rows,fields)  { // create the connection with query to update the data
                     if(!err){
                       connection.query('SELECT * from User limit 5 offset 0', function(err, rows, fields) { //fetch the record in database with limit 5 and starting value
                       var detail=[];
                       if (!err)
                           {       for (var i = 0; i < rows.length; i++) {
                                   // Create an object to save current row's data
                                   var add = {
                                     'Id':rows[i].Id,
                                     'Image':rows[i].Image,
                                     'UserName':rows[i].UserName,
                                     'Email':rows[i].Email,
                                     'Role':rows[i].Role,
                                     'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
                                   }
                                   detail.push(add);
                                 }
                                 connection.query('SELECT * from User', function(err, rows) { // this is use for count the stotal number of record in data base
                                   if(!err){
                                 var pageSize = 5;
                                 var pageCount = Math.round(rows.length/5);;
                                 var currentPage = 1;
                             res.render('User',{detail:detail,      // render the USer page after the updating the details
                             pageSize:pageSize,
                             currentPage:currentPage,
                             pageCount:pageCount});}
                           });
                             }
                         });
                     }
                   });
      }
      else
      {var Image=files.filetoupload.name;         // set the image name into Image variable name
      var oldpath = files.filetoupload.path;      //set the current path of file into oldpath variable
      var newpath = '/home/vikas/myapp/views/images/' + files.filetoupload.name;  // set the new path of file
          fs.rename(oldpath, newpath, function (err) {    //update the file path with name
        if (err)
        { console.log(err);}
        else{;
        var sql="INSERT INTO User(image,UserName, Email, Role) VALUES  ('"+Image+"','"+UserName+"','"+Email+"','"+Role+"');"; // insert the user detail into the database
           connection.query(sql, function(err, rows,fields)  {  //
             if(!err){
               connection.query('SELECT * from User limit 5 offset 0', function(err, rows, fields) {    //fetch the record in database with limit 5 and starting value
               var detail=[];
                 if (!err)
                   {            for (var i = 0; i < rows.length; i++) {
                           // Create an object to save current row's data
                           var add = {
                             'Id':rows[i].Id,
                             'Image':rows[i].Image,
                             'UserName':rows[i].UserName,
                             'Email':rows[i].Email,
                             'Role':rows[i].Role,
                             'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
                           }
                           detail.push(add);
                         }
                         connection.query('SELECT * from User', function(err, rows) { // this is use for count the stotal number of record in data base
                           if(!err){
                         var pageSize = 5;
                         var pageCount = Math.round(rows.length/5);;
                         var currentPage = 1;
                     res.render('User',{detail:detail,      // render the USer page after the updating the details
                     pageSize:pageSize,
                     currentPage:currentPage,
                     pageCount:pageCount});
                   }
                 });
             }
           });
            }
      });
    }
 });
}
});

});
app.get("/:id",function(req,res){ // this callback function for pagination
  var page= req.params.id;    //request the page number
  var pageSize = 5;       //limit of user detail shows in user page
  var y= page - 1;        // this variable id use for offset
  var x=pageSize * y;
  var currentPage = page; // changing the current page according to pagination
  connection.query("SELECT * from User limit "+pageSize+ " offset "+x, function(err, rows, fields) { // create the pagination query
  var detail=[];
  if (!err)
      {       for (var i = 0; i < rows.length; i++) {
              // Create an object to save current row's data
              var add = {
                'Id':rows[i].Id,
                'Image':rows[i].Image,
                'UserName':rows[i].UserName,
                'Email':rows[i].Email,
                'Role':rows[i].Role,
                'CreatedAt': moment(rows[i].CreatedAT).endOf('day').fromNow()
              }
              detail.push(add);
            }
            connection.query('SELECT * from User', function(err, rows) {    // count the total number Record in  database
              if(!err){
            var pageSize = 5;
            var pageCount = Math.round(rows.length/5);
        res.render('User',{detail:detail, //render the page with user details and variable
        pageSize:pageSize,
        currentPage:currentPage,
        pageCount:pageCount});}
      });
    }
        });
});

app.listen(4000);   // port number  4000
