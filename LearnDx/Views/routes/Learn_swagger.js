const express = require('express');               //  router is an instance of the express module
const router = express.Router();
const Add = require('../controller/add');
const User = require('../controller/User');
const User_post = require('../controller/User_post');
const Delete = require('../controller/Delete');
const Edit = require('../controller/Edit');
const Update = require('../controller/Update');
const con= require('../Database/dbconnect');
const Insert = require('../controller/Insert');
const Id = require('../controller/Id');
const User_json = require('../controller/User_json');
const Add_json = require('../controller/Add_json');
const Delete_json = require('../controller/Delete_json');
const Update_json = require('../controller/Update_json');
const User_post_json = require('../controller/User_post_json');
var limit = 5;

router.get("/User",User_json.User_json);                 // creating the callback function with get method or starting page
/**
 * @swagger
 *   /User:
 *   get:
 *     tags:
 *       - users
 *     summary: Return all users
 *     description: ''
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: 'success Operation'
 *         schema:
 *
 */
router.get('/User/:id',User_post_json.User_post_json);
/**
 * @swagger
 *   /User/{id}:
 *  get:
 *     tags:
 *       - users
 *     summary: Select User by id
 *     description: Returns all Single USer
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         type: integer
 *         required: true
 *         description: Only enter Id of User
 *     responses:
 *       '200':
 *         description: 'success Operation'
 *         schema:
 *         $ref: '#/definitions/users'
 */
router.delete("/User/:id",Delete_json.Delete_json);
/**
 * @swagger
 *   /User/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: Delete user by His ID
 *     description: delete the particular user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path 
 *         type: integer
 *         required: true
 *     responses:
 *       '200':
 *         description: 'success Operation'
 *         schema:
 *         $ref: '#/definitions/userd'
 *
 */
router.put("/User/:id",Update_json.Update_json);
/**
 * @swagger
 *   /User/{id}:
 *   put:
 *     tags:
 *       - users
 *     summary: Add new User in database
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: Id
 *         in: formData
 *         required: true
 *         type: integer
 * 
 *       - name: UserName
 *         in: formData
 *         required: true
 *         type: string

 *  
 *       - name: Name
 *         in: formData
 *         required: true
 *         type: string

 * 
 *       - name: Email
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: Role
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User  added Successfully
 *         schema:
 *           $ref: '#/definitions/Success'
 *       500:
 *         description: Internal Error
 *         schema:
 *           $ref: '#/definitions/Error'
 *
 */
router.post("/User",Add_json.Add_json);
/**
 * @swagger
 * /User:
 *   post:
 *     tags:
 *       - users
 *     summary: Add new User in database
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: UserName
 *         in: formData
 *         required: true
 *         type: string

 *  
 *       - name: Name
 *         in: formData
 *         required: true
 *         type: string

 * 
 *       - name: Email
 *         in: formData
 *         required: true
 *         type: string
 * 
 *       - name: Role
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: User  added Successfully
 *         schema:
 *           $ref: '#/definitions/Successful'
 *       500:
 *         description: Internal Error
 *         schema:
 *           $ref: '#/definitions/Errorless'
 *
 */
router.get("/",User.User);                 // creating the callback function with get method or starting page

router.post('/',User_post.User_post);

router.post("/delete/:id",Delete.Delete);

router.get("/add",Add.add);

router.get("/edit/:id",Edit.Edit);

router.post("/update",Update.Update);

router.post("/insert",Insert.Insert);

router.get("/:id",Id.Id);
/** 
* @swagger
* definitions:
*   users:
*     type: object
*     requied:
*       -name   
*     properties:
*       id:
*         type: interger
*         format: int64
*       name:
*         type: string
*         example: User   
*/
/** 
* @swagger
* definitions:
*   userd:
*     type: object
*     requied:
*       -name   
*     properties:
*       id:
*         type: interger
*         format: int64
*       name:
*         type: string
*         example: User   
*/

     
/**
* @swagger
* definitions:
*   Error:
*     type: object
*     requied:
*       - name   
*     properties:
*       id:
*         type: interger
*         format: int64
*       name:
*         type: string
*         example: User   
*/
/**
* @swagger
* definitions:
*   Success:
*     type: object 
*     requied:
*       - name   
*     properties:
*       UserName:
*         type: String
*         format: base64 
*       Role:
*         type: String
*         format: base64
*       Image:
*         type: String
*         format: base64
*       Email:
*         type: String
*         format: base64
*       name:
*         type: string
*         example: User 
*/
/**
* @swagger
* definitions:
*   Successful:
*     type: object 
*     requied:
*       - name   
*     properties:
*       Id:
*         type: interger
*         format: Int64 
*       UserName:
*         type: String
*         format: base64 
*       Role:
*         type: String
*         format: base64
*       Image:
*         type: String
*         format: base64
*       Email:
*         type: String
*         format: base64
*       name:
*         type: string
*         example: User 
*/
module.exports = router ;
