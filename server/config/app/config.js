"use strict";

const path = require("path");
const developmentPort = 3001;

const protocol = 'mongodb:/';
const server = 'localhost:27017';
const databaseName = 'gemstones-store';

const CONNECTION_URL = `${protocol}/${server}/${databaseName}`;

let rootPath = path.normalize(path.join(__dirname, "/../../"));


module.exports = {
    development: {
        db: process.env["MONGODB_URI"] || CONNECTION_URL,
        port: developmentPort,
        secret: "secret_key"
    },

    /* production: {
        // db: process.env.MONGO_DB_CONN_STRING,
    },*/
    path: { rootPath }
};