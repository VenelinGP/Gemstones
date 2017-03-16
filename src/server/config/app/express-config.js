const bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser"),
    express = require("express"),
    session = require("express-session");
const exphbs = require("express-handlebars");
module.exports = (app, config) => {

    app.engine(".hbs", exphbs({ extname: ".hbs" }));
    app.set("view engine", ".hbs");

    // app.engine("handlebars", exphbs({ defaultLayouts: "main" }));
    // app.set("view engine", "handlebars");
    app.set("views", "build/views/");

    let secretKey = process.env["SECRET_KEY"] || config.development.secret;

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: secretKey,
        resave: true,
        saveUninitialized: true
    }));



    // app.get("/", (req, res) => res.render("index"));
    app.get("/", (req, res) => res.render("index", { layout: false }));

    app.use("/libs", express.static(config.development.rootPath + "/node_modules"));
    app.use(express.static(config.development.rootPath + "/public"));
};