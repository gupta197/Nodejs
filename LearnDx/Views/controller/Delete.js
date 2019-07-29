const moment = require('moment');
const con= require('../Database/dbconnect');
var limit = 5;
module.exports.Delete =  function(req,res){
  var detail=[];        // create the array with name Details
  var params_req=req.params.id;     // request the parameter id which is in URL and assign to hii variable
  var sql="DELETE FROM User WHERE id=" +params_req ;        // create query with delete the user which is id id hi
  con.query(sql, function(err, rows) {
    if (!err){
      con.query(`SELECT * from User limit ${limit} offset 0`, function(err, rows) {
      var detail=[];
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
                  detail.push(add);
                }
                con.query('SELECT * from User', function(err, rows) {    // this is use for total rows in database and create variable to according to them
                  if(!err){
                var pageSize = 5;
                var pageCount = Math.round(rows.length/5);;
                var currentPage = 1;
             res.render('delete',{detail, pageSize, currentPage, pageCount});
           }
         });
       }
     });
   }
   else{
     console.log('Error while performing Query.');
   }
 });
}
