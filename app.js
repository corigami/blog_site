//npm modules
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");  //use lodash for utility goodness.
const ejs = require("ejs");
const mongoose = require("mongoose");

/* ---------------Database Configuration ------------*/
const DB_PORT = 27017;
const DB_URI = "mongodb://localhost:" + DB_PORT + "/blog";
mongoose.connect(DB_URI);

//create Blog schema and model
const postSchema = new mongoose.Schema({ title: String, body: String });
const Post = mongoose.model("Post", postSchema);

/* ---------------Express Configuration ------------*/
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, function () {
  console.log("Server started on port " + PORT);
});

/* ------------------Express Routes ---------------*/
app.get("/", function (req, res) {
  const homeContent = "A collection of musings...";
  Post.find({}, function (err, data) {
    if(!err){
      res.render("home", { home_text: homeContent, posts: data });
    }else{
      console.log(err);
    }
  });
});

app.get("/about", function (req, res) {
  const aboutContent = "I'm a retired USAF Officer with plenty of time on my hands.  Why not create a blog site that no one will read.";
  res.render("about.ejs", { about_text: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose.ejs");
});

app.post("/compose", function (req, res) {
  //get date from form
  const post_title = req.body.post_title;
  const post_body = req.body.post_body;

  //create new mongo document using mongoose model
  const post = new Post({ title: post_title, body: post_body });
  post.save().then(res.redirect("/"));
});

app.get("/contact", function (req, res) {
  const contactContent = "Contact Me";
  res.render("contact.ejs", { contact_text: contactContent });
});

app.get("/posts/:_id", function (req, res) {
  const ID = req.params._id
  Post.findById(ID, function (err, post) {
    if (!err) {
      res.render("post.ejs", { post });
    } else {
      console.log(err);
    }
  });
});