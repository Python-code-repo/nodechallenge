"use strict";

const express = require("express");
const router = express.Router();
// let requiredFiles = require("../config/requiredFiles"); // Common file for all routes and controllers
let loginController = require("../controllers/loginController")


router.get('/', loginController.loginUser);

router.post('/', loginController.loginUserWithUserDetails);


module.exports = router;