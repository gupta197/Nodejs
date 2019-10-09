const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var permissionSchema = mongoose.Schema({
    roles_name: { type: String, },
    resources_id: {
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    }
});

module.exports = mongoose.model('Permission', permissionSchema);