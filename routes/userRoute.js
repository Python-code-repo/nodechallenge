"use strict";

const express = require("express");
const router = express.Router();
// let requiredFiles = require("../config/requiredFiles"); // Common file for all routes and controllers
let loginController = require("../controllers/loginController")


router.get('/blockUser/:userId', loginController.blockUser);

router.get('/loggedin/:userDetails', loginController.loggedin);

router.get('/regusers/:userRole', loginController.regusers);

router.post('/regusers/:userRole', loginController.regusersPostMethod);

router.get('/todolist/doctor/:myid', loginController.todolist);

router.get('/isAcceptted/:userId/:isAcceptted', loginController.isAcceptted);

router.get('/Appointments/:userId', loginController.Appointments);

router.post('/Appointments/:userId', loginController.AppointmentsCreate);


module.exports = router;