"use strict";
let express = require('express'),
    auth = require('./server/config/auth');
let env = process.env.NODE_ENV || 'development';
/// let port = process.env.PORT || config.development.port;

const app = express();
const config = require('./server/config/config')[env];
const userControler = require("./server/controllers/user-controllers")
require('./server/config/express')(app, config);
require('./server/config/database')(config);
require('./server/config/passport')();
require('./server/config/routes')(app, auth, userControler);

app.listen(env.port, () => console.log(`Magic happening at http://localhost:${env.port}`));