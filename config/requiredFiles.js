"use strict";

// All files are exported here. so, other modules can able to use it from here
module.exports = {
    config: require("./config"), // Config file for NODE_ENV details
    mongoose: require('mongoose'), // Mongoose package
    loginRoute: require("../routes/login"), // login routes file
    // loginController: require("../controllers/login"), // login controller file
    bodyParser: require("body-parser")
}