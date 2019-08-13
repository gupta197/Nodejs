const moment = require('moment');
const util = require('util');
const formidable = require('formidable');   // Import Formidable module
const fs = require('fs');
const con= require('../Database/dbconnect');
var limit = 5;
module.exports.Update_json = function(req,res){       // create the insert callback function of the user details   // requet the form details
  console.log(" ",req.body," "); // create the variables according to field
  var fields = req.body;
  var Id = fields.Id
  var UserName=fields.UserName;
  var Email=fields.Email;
  var Role=fields.Role      //CHECK THE FILE IS upload
  var Image = fields.Name
  var sql=`UPDATE User1 SET Image='${Image}',UserName='${UserName}',Email='${Email}',Role='${Role}' WHERE Id= ${Id}`; //create query if form not get the image
  console.log(sql)
  con.query(sql, function(err, rows,fields){ // create the con with query to update the data
    if(!err){
      con.query(`SELECT * from User1`, function(err, rows, fields) { //fetch the record in database with limit 5 and starting value
        var detail=[];
        if (!err){
          for (var i = 0; i < rows.length; i++) {     // Create an object to save current row's data
            var add = {
              'Id':rows[i].Id,
              'Name':rows[i].Image,
              'UserName':rows[i].UserName,
              'Email':rows[i].Email,
              'Role':rows[i].Role,
              }
              detail.push(add);
          }
            res.json(detail);
        }
        else{
            console.log("error in selecting all");
        }
      })
    }
    else{
        console.log("error query");
      }
  });
}
        