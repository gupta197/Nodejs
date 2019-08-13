var limit = 5;
const moment = require('moment');
const con= require('../Database/dbconnect');
module.exports.User_json =function(req,res) {
    console.log("Userjson")
    con.query(`SELECT * from User1`, function(err, rows, fields) {           // send the query and fetching record from database
    var detail=[];  // creating detail name array
      if (!err) {
        for (var i = 0; i < rows.length; i++) {             // Create an object to save current row's data
          var add = {
            'Id':rows[i].Id,
            'Image':rows[i].Image,
            'UserName':rows[i].UserName,
            'Email':rows[i].Email,
            'Role':rows[i].Role
            }
            detail.push(add);         // inser the values in detail arrays
          } 
          res.json(detail);
      }
      else{
        console.log("Error in total query Fetch");
      }
    });
  }
