const mongoose = require('mongoose');
var logSchema = mongoose.Schema({
    timestamp: {
        type: Number, default: (new Date()).getTime() 
    },
    level:{
        type:String,
    },
    message:{
        type:String,
    }
});

module.exports = mongoose.model('Logs', logSchema);