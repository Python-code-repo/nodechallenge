"use strict";

const express = require("express");
const router = express.Router();

//Test router without endpoint
router.get('/', (req, res) => {
    res.render('login');
});


module.exports = router;