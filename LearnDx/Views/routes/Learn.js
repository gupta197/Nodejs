const express = require('express');               //  router is an instance of the express module
const router = express.Router();
const Add = require('../controller/add');
const User = require('../controller/User');
const User_post = require('../controller/User_post');
const Delete = require('../controller/Delete');
const Edit = require('../controller/Edit');
const Update = require('../controller/Update');
const Insert = require('../controller/Insert');
const Id = require('../controller/Id');
var limit = 5;
router.get("/",User.User);                 // creating the callback function with get method or starting page

router.post('/',User_post.User_post);

router.post("/delete/:id",Delete.Delete);

router.get("/add",Add.add);

router.get("/edit/:id",Edit.Edit);

router.post("/update",Update.Update);

router.post("/insert",Insert.Insert);

router.get("/:id",Id.Id);

module.exports = router ;
