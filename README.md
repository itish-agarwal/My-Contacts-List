# My-Contacts-List

This is a basic contacts list that runs on your local server and stores the data into the database

# Requirements
* Nodejs
* MongoDB 

## How to use?
* Make sure MongoDB server is running. You can check if the server is running with the command `sudo systemctl status mongod`
* If MongoDB server is not running, run it using the command `sudo systemctl start mongod`
* Clone the repository using the command `git clone https://github.com/itish-agarwal/My-Contacts-List.git`
* Change directory using `cd My-Contacts-List`
* Install required node dependencies using `npm install`
* Fire up the server using `nodemon index.js`
* This will run the server on port 8000. Visit 127.0.0.1:8000 to check out your contacts list
