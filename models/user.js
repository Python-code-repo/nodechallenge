"use strict";

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gender: { type: String, required: true },
    Age: { type: Number, required: true },
    contactNumber: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('user', userSchema);