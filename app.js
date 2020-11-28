//jshint esversion:6
require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DATA);
mongoose.set("useCreateIndex", true);
const secretSchema = new mongoose.Schema({
  secretString: String
});
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false
  },
  password: String,
  googleId: String,
  facebookId: String,
  secret: [{
    type: secretSchema
  }]
});
const Secret = mongoose.model("Secret", secretSchema);
const User = mongoose.model("User", userSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running");
});
app.get("/", function(req, res) {
  res.render("home");
});
app.get("/register", function(req, res) { //THIS GOES INTO APP.JS
  res.render("register", {
    errorString: ""
  });
});
