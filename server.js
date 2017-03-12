const express = require("express");
// const auth = require("./server/config/auth");
const config = require("./server/config/config");
const app = express();
// const userControler = require("./server/controllers/user-controllers");
const port = process.env.PORT || config.development.port;

require("./server/config/app/")(app, config);
require("./server/config/database")(config);
//require("./server/config/routing/users-routing")(app, auth, userControler);

//app.get("/", (req, res) => res.render("index"));
app.listen(port, () => console.log(`Magic happening at http://localhost:${port}`));