const moment = require('moment');
const con= require('../Database/dbconnect');
var limit = 5;
module.exports.Edit =function(req,res) {    // creating the callback function to edit the User details
  var id=req.params.id;                   // request the user id which is cvhange by the user
  var sql=`Select * FROM User WHERE id= ${id}`; // create the query
  con.query(sql,function(err, rows,fields) {
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
}
