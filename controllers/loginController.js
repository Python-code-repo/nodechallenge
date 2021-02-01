'use strict'

const mongoose = require('mongoose');
const user = mongoose.model('user');
const appointment = mongoose.model('appointment');


const loginController = {

    loginUser: function (req, res) {
        res.render("./login");
    },

    loginUserWithUserDetails: function (req, res) {
        user.find({ active: true })
            .then(userData => {
                let doctors = [];
                let patients = [];

                let isUserAvail = userData.filter(user => {
                    if (user.role == "PAT") {
                        patients.push(user);
                    } else if (user.role == "DOC") {
                        doctors.push(user);
                    }
                    if (user.contactNumber == req.body.username && user.password == req.body.password) {
                        return user;
                    }
                });

                if (isUserAvail.length == 1) {
                    if (isUserAvail[0].role && isUserAvail[0].role == "HA") {
                        // let obj = {
                        //     pageTitle: 'Welcome ' + isUserAvail[0].name,
                        //     users: doctors.concat(patients),
                        //     whoisthis: "Doctor",
                        //     roleCan: "DOC"
                        // }
                        // res.redirect("/user/loggedin/" + JSON.stringify(obj))
                        res.render("./hospitalAdmin", {
                            pageTitle: 'Welcome ' + isUserAvail[0].name,
                            users: doctors.concat(patients),
                            whoisthis: "Doctor",
                            roleCan: "DOC",
                            mydetails: isUserAvail[0]
                        });
                    } else if (isUserAvail[0].role && isUserAvail[0].role == "DOC") {
                        res.render("./hospitalAdmin", {
                            pageTitle: 'Welcome ' + isUserAvail[0].name,
                            users: patients,
                            whoisthis: "Patient",
                            roleCan: "PAT",
                            mydetails: isUserAvail[0]
                        });
                    } else if (isUserAvail[0].role && isUserAvail[0].role == "PAT") {
                        console.log(isUserAvail[0]._id)
                        appointment.find({ userId: isUserAvail[0]._id })
                            .populate("docId")
                            .then(data1 => {
                                res.render("./patient", {
                                    data1: data1.length > 0 ? data1 : [],
                                    mydetails: isUserAvail[0]
                                });
                            })
                            .catch(err => {
                                console.log(err)
                                res.render("./patient", {
                                    data1: [],
                                    mydetails: isUserAvail[0]
                                });
                            })
                    }
                }
                else {
                    res.redirect("/");
                }
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false,
                    message: "Something went wrong !",
                    err: err,
                    data: ''
                });
            })
    },

    blockUser: function (req, res) {
        let userId = req.params.userId;
        user.updateOne({ _id: userId }, { $set: { active: false } })
            .then(data => {
                res.json({
                    success: true
                });
            })
            .catch(err => {
                console.log(err);
                res.json({
                    success: false
                });
            })
    },

    regusers: function (req, res) {
        res.render("./regUsers", {
            roleCan: req.params.roleCan
        });
    },


    regusersPostMethod: function (req, res) {
        let obj = {
            name: req.body.Name,
            gender: req.body.Gender,
            Age: req.body.Age,
            contactNumber: req.body.Contactnumber,
            password: "letmein",
            role: req.params.userRole,
            active: true
        }
        user.create(obj)
            .then(result => {
                res.render("./regUsers", {
                    roleCan: req.params.roleCan
                })
            })
            .catch(err => {
                console.log(err)
                res.render("./regUsers", {
                    roleCan: req.params.roleCan
                })
            })
    },

    loggedin: function (req, res) {
        res.render("./hospitalAdmin", JSON.parse(req.params.userDetails));
    },

    todolist: function (req, res) {
        let myId = req.params.myid;
        appointment.find({ docId: myId })
            .populate("docId userId")
            .then(data => {
                res.render("./doctor", {
                    users: data
                });
            })
            .catch(err => {
                console.log(err)
                res.render("./doctor", {
                    users: []
                });
            })
    },

    isAcceptted: function (req, res) {
        let myId = req.params.userId;
        let isAcceptted = req.params.isAcceptted;
        appointment.updateOne({ _id: myId }, { $set: { isaccepted: isAcceptted == 'no' ? "Rejected" : "Accepted" } })
            .then(data => {

            })
            .catch(err => {

            })
    },

    Appointments: function (req, res) {
        let myId = req.params.userId;
        user.find({ role: "DOC", active: true })
            .then(data => {
                appointment.find({})
                    .then(oppointment => {
                        res.render("./appointments", {
                            userID: myId,
                            doctors: data,
                            oppointment: oppointment
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.render("./appointments", {
                            userID: myId,
                            oppointment: [],
                            doctors: []
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                res.render("./appointments", {
                    userID: myId
                });
            })
    },

    AppointmentsCreate: function (req, res) {
        let myId = req.params.userId;
        let obj = {
            docId: req.body.Doctor,
            userId: myId,
            appointdate: req.body.Date,
            fromTime: req.body.fromTime,
            toTime: req.body.toTime,
            isaccepted: "pending"
        }
        appointment.create(obj)
            .then(data => {
                user.find({ role: "DOC", active: true })
                    .then(data => {
                        res.render("./appointments", {
                            userID: myId,
                            doctors: data,
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.render("./appointments", {
                            userID: myId
                        });
                    })
            })
            .catch(err => {
                console.log(err);
                user.find({ role: "DOC", active: true })
                    .then(data => {
                        res.render("./appointments", {
                            userID: myId,
                            doctors: data,
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.render("./appointments", {
                            userID: myId
                        });
                    })
            })

    },

}

module.exports = loginController;