const moment = require('moment');
const util = require('util');
const formidable = require('formidable');   // Import Formidable module
const fs = require('fs');
const con = require('../Database/dbconnect');
var limit = 5;
module.exports.Insert = function(req,res){       // create the insert callback function of the user details
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
      if(files.filetoupload.name == ""){      //CHECK THE FILE IS upload
          var sql=`INSERT INTO User(UserName, Email, Role) VALUES  ('${UserName}','${Email}','${Role}');`; //create query if form not get the image
          con.query(sql, function(err, rows,fields){ // create the con with query to update the data
          if(!err){
              con.query(`SELECT * from User limit ${limit} offset 0`, function(err, rows, fields) { //fetch the record in database with limit 5 and starting value
              var detail=[];
              if (!err){
              for (var i = 0; i < rows.length; i++) {     // Create an object to save current row's data
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
                    con.query('SELECT * from User', function(err, rows) { // this is use for count the stotal number of record in data base
                        if(!err){
                            var pageSize = 5;
                            var pageCount = Math.round(rows.length/5);;
                            var currentPage = 1;
                            res.render('User',{detail, pageSize, currentPage,pageCount});
                          }
                        });
                      }
                    });
                  }
                });
              }
              else{
                var Image=files.filetoupload.name;         // set the image name into Image variable name
                var oldpath = files.filetoupload.path;      //set the current path of file into oldpath variable
                var newpath = '/home/vikas/myapp/views/images/' + files.filetoupload.name;  // set the new path of file
                fs.rename(oldpath, newpath, function (err) {    //update the file path with name
                  if (err){
                     console.log(err);
                   }
                   else{
                     var sql="INSERT INTO User(image,UserName, Email, Role) VALUES  ('"+Image+"','"+UserName+"','"+Email+"','"+Role+"');"; // insert the user detail into the database
                     con.query(sql, function(err, rows,fields)  {  //
                        if(!err){
                            con.query(`SELECT * from User limit ${limit} offset 0`, function(err, rows, fields) {    //fetch the record in database with limit 5 and starting value
                            var detail=[];
                            if (!err){
                              for (var i = 0; i < rows.length; i++) { // Create an object to save current row's data
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
                                  con.query('SELECT * from User', function(err, rows) { // this is use for count the stotal number of record in data base
                                    if(!err){
                                      var pageSize = 5;
                                      var pageCount = Math.round(rows.length/5);;
                                      var currentPage = 1;
                                      res.render('User',{detail, pageSize, currentPage, pageCount});  // render the USer page after the updating the details
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
                }
