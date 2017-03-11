"use strict";

const express = require("express");
const config = require("../app/config");

const app = express();

let env = require("../app/config")["development"];

const dataControler = require("../../data/controllers"),
    userController = require("../../controllers/user-controller")(dataControler);

require("./database")(env);
require("./express")(config, app);
require("./routes")(app, userController);

module.exports = app;