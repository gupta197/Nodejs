const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Resource = require('./models/Resource_model');
const Role = require('./models/Role_model');
const Permission = require('./models/Permission_model');
const MapCache = require('map-cache');
const index = require('./routes/index')
const app = express();  // create express app
const path = require('path');

var permissions_cache = new MapCache();     // creating instance of Map cache 
var roles_cache = new MapCache();           
var resources_cache = new MapCache();

global.cache_Roles;         //create Global variable which hold Role of Cache 
global.cache_Resources;
global.cache_Permissions;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'views'))); // set the static path to view the file and directory

//creating connection with mongoose (mongodb)
mongoose.connect("mongodb://localhost:27017/Role", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, res) {
    if (err) {
        console.log("ERROR in connection with database");
    }
    else {
        console.log("Successfully connected to the database")
    }
});

app.use('/', index) //use route 

//set the Role Cache in global variable(global.cache_Roles)
var setRoleCache = async () => {
    var roles = await Role.find();
    roles_cache.set(roles, roles);
    global.cache_Roles = roles_cache.get(roles);
}

var setResourceCache = async () => {
    var resource = await Resource.find();
    resources_cache.set(resource,resource);
    global.cache_Resources = resources_cache.get(resource);
}

//set the Permission Cache in global variable(global.cache_Permission)
var setPermissionCache = async () => {

    var permission = await Permission.find();
    permissions_cache.set(permission,permission)
    global.cache_Permissions =  permissions_cache.get(permission)
}
var role = setRoleCache(); 
var resource =  setResourceCache();
var permission = setPermissionCache(); 

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});