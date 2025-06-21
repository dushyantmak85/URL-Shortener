const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require("./models/Urls"); // Make sure the path is correct

mongoose.connect('mongodb://localhost:27017/URLShortener', {
  useNewUrlParser: true
});

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("FrontPage", { shortUrl: null, clicks: null });
});

app.post("/shorten", async (req, res) => {
  const originalUrl = req.body.LongUrl;

  try {
    let existingUrl = await ShortUrl.findOne({ originalUrl });

    if (existingUrl) {
      await existingUrl.save();
      return res.render("FrontPage", {
        shortUrl: existingUrl.shortUrl,
        clicks: existingUrl.clicks
      });
    }

    const shortUrl = Math.random().toString(36).substring(2, 8);
    const newUrl = new ShortUrl({
      originalUrl,
      shortUrl,
      clicks: 1
    });

    await newUrl.save();
    res.render("FrontPage", {
      shortUrl: newUrl.shortUrl,
      clicks: newUrl.clicks
    });

  } catch (err) {
    console.error("Error saving or retrieving URL:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:shortUrl", async(req,res)=>{
  const shortUrl=req.params.shortUrl;
  try{
    const url=await ShortUrl.findOne({shortUrl: shortUrl});
    if(!url){
      return res.status(404).send("URL not found");
    }
    url.clicks += 1;
    await url.save();
    res.redirect(url.originalUrl);
  }
  catch(err){
    console.error("Error retrieving URL:", err);
    res.status(500).send("Internal Server Error");
  }
})



app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
