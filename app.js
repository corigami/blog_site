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
const homeContent = "Home Page";
const aboutContent = "About Page";
const composeContent = "Compose message";
const contactContent = "Contact Me";


//Routes
app.get("/", function(req, res){
  res.render("home.ejs", {home_text:homeContent});
});

app.get("/about", function(req, res){
  res.render("about.ejs", {about_text:aboutContent});
});

app.get("/compose", function(req, res){
  res.render("compose.ejs");
});

app.post("/compose", function(req, res){
  let post_title = req.body.post_title;
  let post_body = req.body.post_body;
  console.log(post_title);
  console.log(post_body);
});


app.get("/contact", function(req, res){
  res.render("contact.ejs", {contact_text:contactContent});
});