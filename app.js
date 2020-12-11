<<<<<<< Updated upstream
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
=======
//jshint esversion:6
require('dotenv').config()
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const findOrCreate = require('mongoose-findorcreate');

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

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(session({
  secret: "this is my secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

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
>>>>>>> Stashed changes
