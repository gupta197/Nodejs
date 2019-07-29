const moment = require('moment');
const util = require('util');
const formidable = require('formidable');   // Import Formidable module
const fs = require('fs');
const con= require('../Database/dbconnect');
var limit = 5;
module.exports.Update = function(req,res){     // create the update callback function of the user details
  var form = new formidable.IncomingForm();     // create the form instance of formidable.IncomingForm
  form.parse(req, function (err, fields, files) {     //request the form fields  variable use in edit html page
      var val=[];
      val=util.inspect(fields); // getting the fields use in form
      console.log(val); //console the variable which is name is val
      var Id=fields.Id;     //creating the fields variable
      var UserName=fields.UserName;
      var Email=fields.Email;
      var Role=fields.Role;
      if(files.filetoupload.name == ""){   // check the user upload file or not
          var Image =fields.Pic;
          var sql=`UPDATE User SET Image='${Image}',UserName='${UserName}',Email='${Email}',Role='${Role}' WHERE Id= ${Id}`;
          con.query(sql, function(err, rows,fields){
              if(!err){
                  con.query('SELECT * from User limit 5 offset 0', function(err, rows, fields) {
                  var detail=[];
                  if (!err){
                      for (var i = 0; i < rows.length; i++) {// Create an object to save current row's data
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
                        con.query('SELECT * from User', function(err, rows) {
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
              var Image=files.filetoupload.name;     // get the file name
              var oldpath = files.filetoupload.path;    // get the old path of pic
              var newpath = '/home/vikas/myapp/views/images/' + files.filetoupload.name;    // create the new path of file
              fs.rename(oldpath, newpath, function (err) {      // change the file directory with tye same of file name
                if (err){      // if find any error during changing the directory
                   console.log(err);
                 } //console the error
                 else{//update image, UserName, Email, ROle
                   var sql=`UPDATE User SET Image='${Image}',UserName='${UserName}',Email='${Email}',Role='${Role}' WHERE Id= ${Id}`;
                   con.query(sql, function(err, rows, fields)  {
                     if(!err){
                       con.query('SELECT * from User', function(err, rows, fields) {
                         if(!err){
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
                            con.query('SELECT * from User', function(err, rows) {// getting the total record in database and create variables
                            if(!err){
                              var pageSize = 5;
                              var pageCount = rows.length/5;
                              var currentPage = 1;
                              res.render('User',{detail, pageSize, currentPage, pageCount});
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
