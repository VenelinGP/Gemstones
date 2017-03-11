"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');
let config = require('./config');

module.exports = (app, config) => {
    app.set("view engine", "pug");
    //app.set("views", `${config.path.rootPath}views`);
    app.set('views', config.rootPath + '/server/views');

    // here load other routs
    app.use(bodyParser.urlencoded({ extended: true, uploadDir: "../../public/images" }));
    app.use(bodyParser.json());
    let secretKey = process.env["SECRET_KEY"] || config;
    app.use(cookieParser(secretKey));
    app.use(session({
        secret: secretKey,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));

    //require("../passport")(app);
    //app.use(express.static(`${config.path.rootPath}/public`));
    //app.use('/static', express.static(path.join(__dirname, '/public')));
};

// var stylus = require('stylus'),
//     passport = require('passport');

// module.exports = function(app, config) {
//     app.use(stylus.middleware({
//         src: config.rootPath + '/public',
//         compile: function(str, path) {
//             return stylus(str).set('filename', path);
//         }
//     }));
// }