'use strict';
var Resource = require('../models/Resource_model');
var _ = require('lodash');
const MapCache = require('map-cache');
var resource_cache = new MapCache(); //create map cache instance

// create and save Resources
exports.create = async (req, res) => {
    var routelist = global.routeList //global routelist  
    var listResources = global.cache_Resources 
    var arr = [];

    //converting in the model route list in the form of data base stored
    for (let i = 0; i < _.size(routelist); i++) {
        let path_variable = routelist[i].path;
        let method = routelist[i].methods;
        for (let j = 0; j < method.length; j++) {
            var method_name = method[j]
            let resources = path_variable;
            let path = method_name;
            var add = { 'resources': resources, 'path': path, 'grant': false, }
            arr.push(add)

        }
    }

    console.log(arr)
    var data = [];

    //find and update in variable which is not in the database
    arr.forEach(element => {
        //console.log(_.some(listResources, element))
        if (!(_.some(listResources, element))) {
            data.push(element)

        }
    });

    //updating in database 
    if (data) {
        var resource = data;
        await Resource.create(resource, function (err, results) {
            if (err) {
                console.log('an error occurred', err);
                return res.sendStatus(500);
            }
            else {
                let temp = cache_Resources;
                var resource = [];
                if (!(_.isEmpty(results))) {
                    results.forEach(element => {
                        var add = {
                            'id': element.id,
                            'resources': element.resources,
                            'path': element.path,
                            'grant':element.grant,
                        }
                        temp.push(add)
                    });

                    resource = temp;
                    resource_cache.set(resource, resource)
                    cache_Resources = resource_cache.get(resource)
                }
                res.send(results)
            }
        });
    }

}
// Retrieve and return all roles from the database.
exports.findAll = async (req, res) => {
    res.send(cache_Resources)
};