const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');

//connection between mongo and mongoose is our data base -> db
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to the database"));

//if connection is successful
db.once('open', function() {
    console.log("Successfully connected to the database!");
});

//now include this file when firing up the server