const mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({
    resources: { type: String,},
    path:{ type : String, },
    grant:{
        type:Boolean,
        default:false
    }
});


module.exports = mongoose.model('Resource', resourceSchema);



