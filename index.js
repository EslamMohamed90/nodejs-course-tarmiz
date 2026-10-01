const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const Article = require("./models/article");

// Parse JSON request bodies before route handlers access req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mongodb+srv://<db_username>:<db_password>@nodejs-course-tarmiz.zkfdnq4.mongodb.net/?appName=nodejs-course-tarmiz

mongoose.connect('mongodb+srv://startcodesign_db_user:7j2NwlDEgH0iZkrQ@nodejs-course-tarmiz.zkfdnq4.mongodb.net/?appName=nodejs-course-tarmiz')
.then(() => {
  console.log("connected successfully with database M");
}).catch((error) => {
  console.log("Error with connecting with database M", error);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'products'));

app.get('/', (req, res) => {

  let numbers = "";

  for(let i=0; i<=100; i++){
    numbers += i + "-";
  }

  res.send(`This is home page from node.js course tarmiz channel, <br> numbers: ${numbers}`);
});

app.post('/articles', async (req, res) => {
  const newArticle = new Article();

  const artTitle = req.body.articleTitle
  const artBody = req.body.articleBody

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 10960;
  
  await newArticle.save();
  res.json(newArticle);
});

app.get('/articles', async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get('/articles/:articleId', async (req, res) => {

  const idArticle = req.params.articleId;
  
  try {
    const article = await Article.findById(idArticle);
    res.json(article);
    return;
  } catch(error){
    console.log('error while reading article of id', id);
    return res.send('error');
  }

});

app.get('/show-all-articles', async (req, res) => {
  const articles = await Article.find();

  res.render('articles', {
    allArticles: articles
  });
});

app.delete('/articles/:articleId', async (req, res) => {

  const id = req.params.articleId;
  
  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  } catch(error){
    console.log('error deleting article of id', id);
    return res.send('error');
  }

});

app.get('/category', (req, res) => {
  res.send('This is category page from node.js course tarmiz channel');
});

app.get('/product-details', (req, res) => {
  res.send('This is product details page from node.js course tarmiz channel');
});

app.get('/products/all-products', (req, res) => {
  res.render('all-products');
});

app.get('/products/add-product', (req, res) => {
  res.render('add-product');
});

app.get('/products/edit-product', (req, res) => {
  res.render('edit-product');
});

app.post('/addComment', (req, res) => {
  res.send('This is add comment demand from node.js course tarmiz channel');
});

app.listen(3000, () => {
  console.log("I am listening in port 3000");
});
