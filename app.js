//jshint esversion:6

//server configurations
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//Global variables
const homeStartingContent = "Home Page"
const aboutContent = "About Page"
const contactContent = "Contact Me"

//Routes

app.get("/", function(req, res){
  res.render("home.ejs", {home_text:homeStartingContent});
});










