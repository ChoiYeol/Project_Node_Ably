require("dotenv").config();

const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')

let db = new JsonDB(new Config(process.env.dbName, true, false, '/'));

module.exports = {db}