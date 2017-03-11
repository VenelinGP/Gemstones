const express = require("express");
const auth = require("./server/config/auth");
const config = require("./server/config/config");
const app = express();
const userControler = require("./server/controllers/user-controllers");
let port = process.env.PORT || config.development.port;

require("./server/config/express")(app, config);
require("./server/config/database")(config);
require("./server/config/passport")();
require("./server/config/routes")(app, auth, userControler);

app.get("/", (req, res) => res.render("index"));
app.listen(port, () => console.log(`Magic happening at http://localhost:${port}`));