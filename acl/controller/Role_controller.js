var Role = require('../models/Role_model');
const MapCache = require('map-cache');
var roles_cache = new MapCache();
var _ = require('lodash');

// Create and Save a new role
exports.create = async (req, res) => {
    if (!req.body.role_name) {
        return res.status(400).send({
            message: "role content can not be empty"
        });
    }
    var query = req.body.role_name.toLowerCase(); //Extract title from input form

    //check the Cache has role name which user is find
    if (_.some(cache_Roles, { roles_name: query })) {
        res.send("Data already exit in database")
    }
    else {
        // Create a role accound to his model
        var role = new Role({
            roles_name: req.body.role_name.toLowerCase(),
        });
        // create and Save role in the database
        await Role.create(role, function (err, results) {
            if (err) {
                console.log('an error occurred', err);
                return res.sendStatus(500);
            } else {
                let temp = cache_Roles //store role cache in temp variable
                var roles = [];
                temp.push(results)
                roles = temp
                roles_cache.set(roles, roles)  //set the roles cache
                cache_Roles = roles_cache.get(roles) //storing the role cache in global variable
                res.send(roles_cache.get(roles))
                console.log(results);
            }
        })

    }
}

// Retrieve and return all roles from the database.
exports.findAll = async (req, res) => {
    res.send(cache_Roles)
};

// Find a single role with a roleId
exports.findOne = (req, res) => {

    res.send(_.find(cache_Roles, { id: req.params.roleId }))

};

// Update a role identified by the roleId in the request
exports.update = (req, res) => {

    if (!req.body.role_name) {
        return res.status(400).send({
            message: "role content can not be empty"
        });
    }
    var query = req.body.role_name.toLowerCase();
    // Find role and update it with the request body
    Role.findByIdAndUpdate(req.params.roleId, {
        roles_name: query,
    }, { new: true })
        .then(role => {
            if (!role) {
                return res.status(404).send({
                    message: "role not found with id " + req.params.roleId
                });
            }
            //Update or modify in the cache
            var del_obj = _.find(cache_Roles, { id: req.params.roleId }) //delete the id which is modify
            _.remove(cache_Roles, del_obj)
            let temp = cache_Roles
            var roles = [];
            temp.push(role)
            roles = temp
            roles_cache.set(roles, roles)
            cache_Roles = roles_cache.get(roles) //update global variable role cache
            res.send(cache_Roles);

        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "role not found with id " + req.params.roleId
                });
            }
            return res.status(500).send({
                message: "Error updating role with id " + req.params.roleId
            });
        });


};

// Delete a role with the specified roleId in the request
exports.delete = (req, res) => {
    Role.findByIdAndRemove(req.params.roleId)
        .then(role => {
            if (!role) {
                return res.status(404).send({
                    message: "role not found with id " + req.params.roleId
                });
            }
            // find in the role id in cache and delete it
            var deleteObj = _.find(cache_Roles, { id: req.params.roleId })
            
            res.send(_.remove(cache_Roles, deleteObj));
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "role not found with id " + req.params.roleId
                });
            }
            return res.status(500).send({
                message: "Could not delete role with id " + req.params.roleId
            });
        });
}