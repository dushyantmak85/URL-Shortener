const express = require('express');
const mongoose = require('mongoose');
// Import the ShortUrl model
const ShortUrl=require("./models/Urls") // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/URLShortener')

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
let clicksCount = 0;

app.get("/",(req,res)=>{
  res.render("FrontPage", { title: "Home Page" });
});

app.post("/shorten", async(req,res)=>{
  clicksCount++;
  const originalUrl=req.body.originalUrl;
  const shortUrl = Math.random().toString(36).substring(2, 8); // Simple random string for short URL
  const newUrl = new ShortUrl({
    originalUrl: originalUrl,
    shortUrl: shortUrl,
    clicks: clicksCount
  });
  try {
    await newUrl.save();
    res.render("ShortenedPage", {  shortUrl: shortUrl, clicks: clicksCount });
  } catch (error) {
    console.error("Error saving URL:", error);
    res.status(500).send("Internal Server Error");
  }
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});