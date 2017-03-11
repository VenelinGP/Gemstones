"use strict";

const mongoose = require("mongoose");
const user = require('../models/User');
//course = require('../models/Course');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.development.db);

    let db = mongoose.connection;

    db.once("open", err => {
        if (err) {
            console.log("Database could not be opened: " + err);
            return;
        }

        console.log("Database up and running...");
    });

    db.on("error", err => {
        console.log(`Database error: ${err}`);
    });


    user.seedInitialUsers();
    //course.seedInitialCourses();
};