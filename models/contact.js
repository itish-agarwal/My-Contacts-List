const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    }
});

//what do we want to call this document in the collection that will be stored in database
const Contact = mongoose.model('Contact', contactSchema);

//finally, export this
module.exports = Contact;

//now require this schema in index.js