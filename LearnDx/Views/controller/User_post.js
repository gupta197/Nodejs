var limit = 5;
const moment = require('moment');
const con= require('../Database/dbconnect');
module.exports.User_post = function(req,res){
        var search = req.body.search;       //request the search variable name from user html form
          var role = req.body.role;       //request the Role variable
          if(search == '' && role != ''){             //check if search is empty or role is not empty
            var sql = `SELECT * FROM User WHERE UserName='${search}' or Role= '${role}'`; // creating query according them
          }
          if(search != '' && role == ''){         //check if search is not empty or role is empty
            var sql = `SELECT * FROM User WHERE UserName LIKE '%${search}%'`;    // creating query according them
          }
          if(search != '' && role != ''){         // check if both data is not empty
            var sql = `SELECT * FROM User WHERE UserName='%${search}%' or Role= '${role}'`;// creating query according them
          }
          if(search == "" && role == ''){         //check if both data is empty
              var sql = `SELECT * from User limit ${limit} offset 0`;
              var flag=1;// creating query according them
         }
         if(flag==1){
               con.query(`SELECT * from User limit ${limit} offset 0`, function(err, rows, fields) {
               var detail=[];
                 if (!err)
                   {console.log('The solution is: ', rows);
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
                      res.render('User',{detail, pageSize, currentPage, pageCount});
                    }
                  });
                }
              });
            }
            else{
               con.query(sql, function(err, rows, fields){     // send query and fetch record according to query
                 var detail=[];       // array with name details
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
                           detail.push(add);      // insert the data which is fetch form Query
                         }

                         var pageSize = 5;          // total page data display to User
                         var pageCount =rows.length/5; // total page
                         var currentPage = 1;       //current page start with 1
                         res.render('User',{detail, pageSize, currentPage, pageCount});
                      }
                      else{
                          res.render("view");       // render html  views page if error found in query
                        }
                  });
                }
  }
