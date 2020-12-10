const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

//tell express that ejs will be our view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware - parse -> to decode the data from the form
app.use(express.urlencoded());

var contactList = [
    {
        name: "Tom",
        phone: "123456789"
    },
    {
        name: "Jerry",
        phone: "987654321"
    }, 
    {
        name: "Dog",
        phone: "3432546436"
    }
];

app.get('/', function(req, res) {
    return res.render('home', {
        title: "My Contacts List",
        contacts_list: contactList
    });
});

app.get('/practise', function(req, res) {
    return res.render('practise', {
        title: "Let us practise with EJS"
    });
});

//get form data
app.post('/create-contact', function(req, res) {
    
    //data is encoded as a string when it is sent from the browser
    //we need to decode it to be able to use it in the form of an object
    
    //hence we need a parser to read the data
    //this parser creates a property of the object 'req' as 'body' and puts the data as properties of 'body'
    // console.log(req.body);

    contactList.push(req.body);
    return res.redirect('/');

});

app.listen(port, function(err) {
    if(err) {
        console.log("Error");
        return;
    }
    console.log("Server is running on port: ", port);
});