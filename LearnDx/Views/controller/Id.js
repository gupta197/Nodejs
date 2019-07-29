const moment = require('moment');
const con = require('../Database/dbconnect');
var limit = 5;
module.exports.Id = function(req,res){ // this callback function for pagination
  var currentPage= req.params.id;    //request the page number
  var pageSize = 5;       //limit of user detail shows in user page
  var y= currentPage - 1;        // this variable id use for offset
  var x=pageSize * y;
  con.query(`SELECT * from User limit ${pageSize} offset ${x}`, function(err, rows, fields) { // create the pagination query
  var detail=[];
  if (!err){
      for (var i = 0; i < rows.length; i++) {              // Create an object to save current row's data
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
          con.query('SELECT * from User', function(err, rows) {    // count the total number Record in  database
              if(!err){
                var pageSize = 5;
                var pageCount = Math.round(rows.length/5);
                res.render('User',{detail, pageSize, currentPage, pageCount});
              }
              else{
                console.log("Error found in total total query");
              }
            });
        }
    });
}
