const express = require('express');
const exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

//CONNECT TO MONGODB
mongoose.connect('mongodb://localhost/vidjot-dev')
.then(() => console.log('Connected with Mongodb'))
.catch((err) => console.log(err));

//LOAD Idea MODEL
require('./models/Idea');
const Idea = mongoose.model('ideas');

//HANDLEBARS MIDDLEWARE
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//BODY PARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 5000;

//HOW MIDDLEWARE WORKS
app.use( (req, res, next) => {
  //console.log(Date.now());
  req.name = 'Jagdeep Singh';
  req.date = Date.now();
  next();
});

//INDEX ROUTE
app.get('/', (req, res) => {
  const title = 'VidJot';
  res.render('index', {
    title:title
  });
});

//ABOUT ROUTE
app.get('/about', (req, res) => {
  const title = 'About page';
  res.render('about', {
    title:title
  });
});

//ADD IDEA ROUTE
app.get('/ideas/addIdea', (req, res) => {
  res.render('ideas/add');
});

//POST IDEA ROUTE
app.post('/ideas', (req, res) => {
  let errors = [];
  if(!req.body.title){
    errors.push({text: 'Please add a title'});
  }
  if(!req.body.details){
    errors.push({text: 'Please add some details'});
  }

  if(errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  }
  else{
    res.send('Passed');
  }

});

app.listen(port, () =>{
  console.log(`app listening on port ${port}`);
});