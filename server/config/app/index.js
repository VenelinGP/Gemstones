"use strict";

const express = require("express"),
    config = require("../app/config");

const app = express();

let env = require("../app/config")["development"];

// const dataControler = require("../../database/controllers"),
//     pageController = require("../controllers/page-controllers")(dataControler);

// require("../config/database")(env);
require("./express")(config, app);
// require("../config/routes")(app, pageController);

module.exports = app;