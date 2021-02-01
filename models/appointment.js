"use strict";

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'user' },
    appointdate: { type: String },
    fromTime: { type: String },
    toTime: { type: String },
    isaccepted: { type: String, default: "pending" },
    // accepted: { type: Boolean },
    docId: { type: mongoose.Schema.ObjectId, ref: 'user' },
});

module.exports = mongoose.model('appointment', appointmentSchema);