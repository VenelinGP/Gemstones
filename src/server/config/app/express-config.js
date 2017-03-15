const bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    express = require("express"),
    session = require("express-session");
module.exports = (app, config) => {
    console.log("Express");
    // app.set("view engine", "pug");
    // app.set("views", `${config.path.rootPath}views`);
    // app.set("views", config.development.rootPath + "/server/views");

    let secretKey = process.env["SECRET_KEY"] || config.development.secret;

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: secretKey,
        resave: true,
        saveUninitialized: true
    }));

    require("../passport")(app);

    app.use("/libs", express.static(config.development.rootPath + "/node_modules"));
    app.use(express.static(config.development.rootPath + "/public"));
};