/* globals __dirname */

const path = require("path");

// var rootPath = path.normalize(__dirname + "/../../")
let rootPath = path.normalize(path.join(__dirname, "/../../"));

const developmentPort = 3000;

const protocol = "mongodb:/";
const server = "localhost:27017";
const databaseName = "gemstones-store";

const CONNECTION_URL = `${protocol}/${server}/${databaseName}`;

module.exports = {
    development: {
        rootPath,
        db: process.env["MONGODB_URI"] || CONNECTION_URL,
        port: developmentPort,
        secret: "purple unicorn"
    },
    production: {
        rootPath,
        db: process.env["MONGODB_URI"] || CONNECTION_URL,
        port: developmentPort,
        secret: "purple unicorn"
    }
};