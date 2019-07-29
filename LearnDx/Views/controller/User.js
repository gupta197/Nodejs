var limit = 5;
const moment = require('moment');
const con= require('../Database/dbconnect');
module.exports.User = function(req,res) {
  con.query(`SELECT * from User limit ${limit} offset 0`, function(err, rows, fields) {           // send the query and fetching record from database
  var detail=[];  // creating detail name array
    if (!err) {
      for (var i = 0; i < rows.length; i++) {             // Create an object to save current row's data
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
        con.query('SELECT * from User', function(err, rows) {
        if(!err){
          var pageSize = 5;           // limit of page data
          var pageCount = Math.round(rows.length/5);         // a
          var currentPage = 1;        // page start with current page
          res.render('User',{detail, pageSize, currentPage, pageCount});
          }
          else{
            console.log("Error in total query Fetch");
          }
        });
      }
      else{
        console.log('Error while performing Query.'); // console the query err if compilor throw the console.error
      }
    });
};
