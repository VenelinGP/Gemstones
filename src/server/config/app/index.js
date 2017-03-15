const config = require("../config"),
    express = require("express");

const app = express();

const dataControler = require("../database");
const pageController = require("../../controllers")(dataControler);

require("../database")(config);
require("./express-config")(app, config);
require("../routing/users-routing")(app, pageController);

module.exports = app;