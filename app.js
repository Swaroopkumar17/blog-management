//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Transform your online presence with our expert blog management services. Elevate your brand, engage your audience, and boost your search engine rankings. Our team of seasoned writers and content strategists are dedicated to crafting compelling, SEO-friendly blog posts tailored to your niche. With a keen eye for trends and a commitment to quality, we ensure your blog stands out in the digital landscape. Let us take care of the content so you can focus on what you do best – running your business. Discover the power of impactful blogging with [Your Company Name]. Start today and watch your online influence grow.";
const aboutContent = "Discover [Your Company Name], where expert blog management meets your online ambitions. We specialize in crafting compelling content that resonates with your audience. With a team of seasoned writers and digital marketing professionals, we're here to elevate your blog and drive meaningful engagement.";
const contactContent = "contact us @blogmanagement.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
