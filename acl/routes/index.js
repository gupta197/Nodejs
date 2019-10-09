const role_Controller = require('../controller/Role_controller');
const resource_Controller = require('../controller/Resource_controller')
const permission_Controller = require('../controller/Permission_controller')
const login_Controller = require('../controller/Login_controller')
const express = require('express')
const app = express();
const listEndpoints = require('express-list-endpoints')



// define a simple route
app.route('/').get((req, res) => {
    res.json({ "message": "Welcome to Role application. Take notes quickly. Organize and keep track of all your Roles." });
});

// Create a new Role
app.route('/role').post(role_Controller.create);

// Retrieve all role
app.route('/role').get(role_Controller.findAll);

// Retrieve a single Role with RoleId
app.route('/role/:roleId').get(role_Controller.findOne);

// Update a Role with RoleId
app.route('/role/:roleId').put(role_Controller.update);

// Delete a Role with RoleId
app.route('/role/:roleId').delete(role_Controller.delete);

// Create a Resource
app.route('/resource').post(resource_Controller.create)

// GEt all Resources
app.route('/resource').get(resource_Controller.findAll)

//Giving the permission to user/admin/client
app.route('/permission').post(permission_Controller.create)

//get all permission
app.route('/permission').get(permission_Controller.findAll)

app.route('/permission/:role').get(permission_Controller.findOne)
//update permission 
app.route('/permission/:permissionId').put(permission_Controller.update);

//delete a particular permission
app.route('/permission/:permissionId').delete(permission_Controller.delete)

// login Api
app.route('/login').post(login_Controller.validate, login_Controller.login);

// create global variable which hold All route name and method
global.routeList = listEndpoints(app)

module.exports = app

