const mongoose = require("mongoose");
const models = require("../../models");

mongoose.Promise = global.Promise;
module.exports = (config) => {
    console.log("Database");
    mongoose.connect(config.development.db);
    let db = mongoose.connection;

    db.once("open", (err) => {
        if (err) {
            console.log("Database could not be opened: " + err);
            return;
        }

        console.log("Database up and running...");
    });

    db.on("error", (err) => {
        console.log(`Database error: ${err}`);
    });

    // models.User.seedInitialUsers();
};