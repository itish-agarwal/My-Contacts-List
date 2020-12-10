const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

//tell express that ejs will be our view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', function(req, res) {
    return res.render('home', {title: "My Contacts List"});
});

app.get('/practise', function(req, res) {
    return res.render('practise', {
        title: "Let us practise with EJS"
    });
});

app.listen(port, function(err) {
    if(err) {
        console.log("Error");
        return;
    }
    console.log("Server is running on port: ", port);
});