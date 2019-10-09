'use strict';
var Permission = require('../models/Permission_model');
const MapCache = require('map-cache');
var permission_cache = new MapCache();
var _ = require('lodash');


// Retrieve and return all roles from the database.
exports.findAll = (req, res) => {
    var detail = [];
    var permit = cache_Permissions;
    var raw = cache_Resources;
    permit.forEach(element => {
        // console.log(cache_Resources)

        let data = _.find(raw, { _id: element['resources_id'] })
        //    console.log(data)
        if (data) {
            add = {
                id: element['id'],
                roles_name: element['roles_name'],
                resources: data['resources'],
                path: data['path']

            }
        }
        detail.push(add)
    })

    res.send(detail);
};

exports.findOne = (req, res) => {
    var permit_user = cache_Permissions;
    var raw = cache_Resources;
    var detail = [];
    raw.forEach(element => {
        let add = {
            "grant": false,
            "id": element['id'],
            "resources": element['resources'],
            "path": element['path'],
        }
        detail.push(add)
    })
    var permit = _.filter(permit_user, { roles_name: `${req.params.role}` });
    if (permit.length > 0) {
        permit.forEach(val => {
            if (_.some(detail, { id: `${val['resources_id']}` })) {
                var del_obj = _.find(detail, { id: `${val['resources_id']}` })

                _.remove(detail, _.find(detail, del_obj));
                let add = {
                    "grant": true,
                    "_id": del_obj['id'],
                    "resources": del_obj['resources'],
                    "path": del_obj['path'],
                }
                detail.push(add)
            }
        })
    }
    res.send(detail);
};

//Update and modify th exiting Permission
exports.update = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "permissionId, permission  content can not be empty"
        });
    }

    var query = req.body.role_name.toLowerCase();   // Find role and update it with the request body

    Permission.findOneAndUpdate(req.params.permissionId, {
        roles_name: query,
    }, { new: true })
        .then(role => {
            if (!role) {
                return res.status(404).send({
                    message: "permission not found with id " + req.params.permissionId
                });
            }

            var del_obj = _.find(cache_Permissions, { id: req.params.permissionId });
            //find and delete in cache 
            _.remove(cache_Permissions, del_obj);
            let temp = cache_Permissions;
            var permission = [];
            temp.push(role);
            permission = temp;
            permission_cache.set(permission, permission);
            cache_Permissions = permission_cache.get(permission); //update data in cache 
            res.send(cache_Permissions);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "permission  not found with id " + req.params.permissionId
                });
            }
            return res.status(500).send({
                message: "Error updating permission with id " + req.params.permissionId
            });
        });


};

//Delete Permission
exports.delete = async (req, res) => {
    Permission.findByIdAndRemove(req.params.permissionId)
        .then(role => {
            if (!role) {
                return res.status(404).send({
                    message: "role not found with id " + req.params.permissionId
                });
            }
            // find the data in cache and stored in del obj
            var del_obj = _.find(cache_Permissions, { id: req.params.permissionId })
            //delete the object in the cache 
            res.send(_.remove(cache_Permissions, del_obj));
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "role not found with id " + req.params.permissionId
                });
            }
            return res.status(500).send({
                message: "Could not delete role with id " + req.params.permissionId
            });
        });
}

//Giving the permission or create permission
exports.create = async (req, res) => {
    var arr = [];

    var resource = await cache_Resources;
    var role = cache_Roles;
    var list1 = cache_Permissions;

    var roles_name = req.body.role_name.toLowerCase()
    var resource_id = req.body.resource;
    for (let i = 0; i < resource_id.length; i++) {
        // console.log(resource_id)
        if (_.some(role, { roles_name: roles_name })) {
            if (_.some(resource, { id: resource_id[i] })) {
                var add = {
                    'roles_name': roles_name,
                    'resources_id': resource_id[i],

                }
                arr.push(add)

            }
            else {
                res.send("Enter the Valid resource id")
            }
        }
        else {
            res.send("Enter the valid user name")
        }
    }
    var data = [];
    var temp = [];
    var permission = [];
    if (!(_.isEmpty(cache_Permissions))) {
        cache_Permissions.forEach(element => {
            //console.log(element)
            var add = {
                'id': element.id,
                'roles_name': roles_name,
                'resources_id': element.resources_id,
            }
            temp.push(add)
        })
    }

    arr.forEach(element => {
        if (!(_.some(list1, element))) {

            data.push(element)
        }
    });
    if (data) {
        var permission = data;
        await Permission.create(permission, function (err, results) {
            if (err) {
                console.log('an error occurred', err);
                return res.sendStatus(500);
            }
            else {
                if (!(_.isEmpty(results))) {
                    results.forEach(element => {
                        // console.log(element)
                        var add = {
                            'id': element.id,
                            'roles_name': roles_name,
                            'resources': element.resources_id,
                        }
                        temp.push(add)
                    });

                    permission = temp;
                    permission_cache.set(permission, permission)
                    cache_Permissions = permission_cache.get(permission)
                }
                res.send(results)
            }
        });
    }
}