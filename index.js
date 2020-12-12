const express = require('express');
const path = require('path');
const port = 8000;

//require database
const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

//tell express that ejs will be our view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middleware - parse -> to decode the data from the form
app.use(express.urlencoded()); //also a middleware
 
//access static files
app.use(express.static('assets'));



//middleware is basically a function that can access both request side and the response side

// //Custom middlewares
// //middleware 1
// app.use(function(req, res, next) {
//     console.log("M1 called");
//     next();
// });

// //middleware 2
// app.use(function(req, res, next) {
//     console.log("M2 called");
//     next();
// });


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
        phone: "3325464369"
    }
];

app.get('/', function(req, res) {
    //find all contacts
    Contact.find({}, function(err, contacts) {
        if(err) {
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render('home', {
            title: "My Contacts List", 
            contacts_list: contacts
        });
    });
});

app.get('/practise', function(req, res) {
    return res.render('practise', {
        title: "Let us practise with EJS"
    });
});


//make profile page
app.get('/profile-page/', function(req, res) {

    let id = req.query.id;
    Contact.findOne({_id: id}, function(err, person) {
        if(err) {
            console.log("Error in finding such a contact");
            return;
        }
        return res.render('profile', {
            p : person
        });
    });

});




//get form data
app.post('/create-contact', function(req, res) {
    
    //data is encoded as a string when it is sent from the browser
    //we need to decode it to be able to use it in the form of an object
    
    //hence we need a parser to read the data
    //this parser creates a property of the object 'req' as 'body' and puts the data as properties of 'body'
    // console.log(req.body);

    // contactList.push(req.body);

    //push into the database now

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err) {
            console.log("Error in creating a contact");
            return;
        }
        // console.log("************", newContact);
        return res.redirect('back');
    });
});

//add email
app.post('/add-email', function(req, res) {
    
    let email = req.body.email;
    let id = req.query.id;

    Contact.findByIdAndUpdate(id, {email: email}, function(err, person) {
        if(err) {
            console.log("Error in finding the contact");
            return;
        }        
        return res.redirect('back');
    });
});













//delete a contact -> 

//1. this is for string params (for eg, /delete-contact/2344343343);
// app.get('/delete-contact/:phone', function(req, res) 
//     console.log(req.params);
//     let phone = req.params.phone;
//


//2. using query params (for eg, /delete-contact/?phone=2344343343);

app.get('/delete-contact', function(req, res) {
    // console.log(req.query);

    // let phone = req.query.phone;

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');



    //to delete from the database, use _id
    let id = req.query.id;

    //find contact in the database using id and delete it
    Contact.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log("Error in deleting a contact");
            return;
        }
        return res.redirect('back');
    });    
});


app.listen(port, function(err) {
    if(err) {
        console.log("Error");
        return;
    }
    console.log("Server is running on port: ", port);
});