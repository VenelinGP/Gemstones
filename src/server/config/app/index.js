const config = require("../config"),
    express = require("express");

const app = express();

const dataControler = require("../database");
const pageController = require("../../controllers")(dataControler);

require("./express-config")(app, config);
require("../database")(config);
require("../passport")(app);
require("../routing/users-routing")(app, pageController);

module.exports = app;