const express = require('express');
const mongoose = require('mongoose');
// Import the ShortUrl model
const ShortUrl=require("./models/Urls") // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/URLShortener')

const app = express();
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
  res.render("FrontPage", { title: "Home Page" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});