var mongoose = require('mongoose');
//Set up default mongoose connection

mongoose.connect('mongodb://localhost:27017/log-win', { useNewUrlParser: true, useUnifiedTopology: true  }, function (err, res) {
    if (err) {
        console.log("ERROR in connection with database");
    }
    else {
        console.log("Successfully connected to the database")
    }
});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db