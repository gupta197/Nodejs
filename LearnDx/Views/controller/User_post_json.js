var limit = 5;
const moment = require('moment');
const con= require('../Database/dbconnect');
var limit = 5
module.exports.User_post_json = function(req,res){
  var search = req.params.id;      //request the search variable name from user html form
  console.log(req.params.id," ")
  var sql = `SELECT * FROM User1 WHERE Id=${search}`; // creating query according them
  con.query(sql, function(err, rows, fields){     // send query and fetch record according to query
    var detail=[];       // array with name details
    if (!err) {
      for (var i = 0; i < rows.length; i++) {
        // Create an object to save current row's data
        var add = {
          'Id':rows[i].Id,
          'Image':rows[i].Image,
          'UserName':rows[i].UserName,
          'Email':rows[i].Email,
          'Role':rows[i].Role
        }
        detail.push(add);      // insert the data which is fetch form Query
      }
      res.json(detail);       // render html  views page if error found in query
    }
    else{
      console.log("error in Display", err)
    }
  });
}