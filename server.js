"use strict";
let express = require('express'),
    auth = require('./server/config/auth');

const config = require('./server/config/config');

let port = process.env.PORT || config.development.port;

const app = express();

const userControler = require("./server/controllers/user-controllers")
require('./server/config/express')(app, config);
require('./server/config/database')(config);
require('./server/config/passport')();
require('./server/config/routes')(app, auth, userControler);

app.listen(port, () => console.log(`Magic happening at http://localhost:${port}`));