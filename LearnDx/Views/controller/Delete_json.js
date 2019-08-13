const moment = require('moment');
const con= require('../Database/dbconnect');
var limit = 5;
module.exports.Delete_json = function(req,res){
  console.log("Delete")
    var detail=[];        // create the array with name Details
    var params_req=req.params.id;  
    console.log(params_req)   // request the parameter id which is in URL and assign to hii variable
    var sql="DELETE FROM User1 WHERE id=" +params_req ;        // create query with delete the user which is id id hi
    con.query(sql, function(err, rows) {
      if (!err){
        con.query(`SELECT * from User1 limit ${limit} offset 0`, function(err, rows) {
        var detail=[];
          if (!err){
            for (var i = 0; i < rows.length; i++) {
                // Create an object to save current row's data
                  var add = {
                    'Id':rows[i].Id,
                'Image':rows[i].Image,
                    'UserName':rows[i].UserName,
                    'Email':rows[i].Email,
                'Role':rows[i].Role,
                  }
              detail.push(add);
            }
            res.json(detail);
          }
        });
      }
      else{
       console.log('Error while performing Query.');
      }
    });
  }