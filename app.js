//jshint esversion:6

//server configurations
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");  //use lodash for utility goodness.
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
const posts = [];  //can modify a const array.


//Routes
app.get("/", function(req, res){
  res.render("home.ejs", {home_text:homeContent, posts:posts});
});

app.get("/about", function(req, res){
  res.render("about.ejs", {about_text:aboutContent});
});

app.get("/compose", function(req, res){
  res.render("compose.ejs");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.post_title,
    body:req.body.post_body
  }
  posts.push(post);
  res.redirect("/");
});

app.get("/contact", function(req, res){
  res.render("contact.ejs", {contact_text:contactContent});
});

app.get("/posts/:title", function(req, res){
posts.forEach(function(post){
  if(_.lowerCase(post.title) === _.lowerCase(req.params.title)){
    res.render("post.ejs", {post});
  }
});

});