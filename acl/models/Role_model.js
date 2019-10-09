const mongoose = require('mongoose');
var roleSchema = mongoose.Schema({
    roles_name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Role', roleSchema);