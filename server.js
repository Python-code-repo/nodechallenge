"use strict";

//Models
require('./models/user');
require('./models/appointment');

const loginRoute = require("./routes/loginRoute");
const userRoute = require("./routes/userRoute");
const config = require("./config/config");
const bodyParser = require("body-parser");

//Import express
const express = require("express");
const mongoose = require('mongoose');

//Create app from express
const app = express();
app.use(express.static('public'));

//Body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Get port from process.env
const serverPort = config.env.port;

//set view engine
app.set("view engine", "jade")


// Routes redirect to folder
app.use('/', loginRoute);
app.use('/user', userRoute);

// Connect to MongoDB
mongoose.connect(config.env.db, config.options);

let db = mongoose.connection;
db.on('error', err => console.log("MongoDB Connection error : " + err));
db.once('open', () => console.log("MongoDB Connected successfully !"));


//app listen
app.listen(serverPort, (err) => {
    if (err) {
        console.log('Error on Server : ' + err);
    } else {
        console.log('Express Server listening on port : ' + serverPort);
    }
});