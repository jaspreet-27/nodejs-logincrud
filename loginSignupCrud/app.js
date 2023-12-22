
if (process.env.NODE_ !== "production") {
  require("dotenv").config();
}
require("dotenv").config();
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express();
const my_routes = require("./src/routes")
const mongoose = require('mongoose')
require("./src/config/database")
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.json());
app.use('/', my_routes)

app.listen(3000, () => {
  console.log("server is running")
});