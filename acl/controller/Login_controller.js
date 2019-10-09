var _ = require('lodash');

exports.login = (req, res, next) => {
    res.send("login")
}

exports.validate = async (req, res, next) => {
    // global.user;
    var roles_name = req.body.role_name;
    var permission = await cache_Permissions
    var permit = _.find(permission, { 'roles_name': roles_name })
    console.log(permit)
    var result = _.find(permit, { 'resources': "/login" })
    console.log(result)
    if (!(result)) {
        res.send("You doesnot have to permission to access this page")
    }
    else {
        next();
    }

}
