import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/URLShortener')

const app = express();

app.get("/",(req,res)=>{
  res.render("FrontPage", { title: "Home Page" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});