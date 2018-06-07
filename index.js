"use strict";
const express = require('express');
 const exphbs = require('express-handlebars');
 const bodyParser = require('body-parser');
 const Greeting = require('./greet');

  const app = express();
  var PORT = process.env.PORT || 3000;

  const pg = require('pg');
  const Pool = pg.Pool;

 const pool = new Pool({
  connectionString:'postgresql://coder:coder123@localhost:5432/greetings'
 });

  const greet = Greeting(pool);

  app.use(express.static('public'));

  app.use(bodyParser.urlencoded({
      extended:false
  }));

  app.use(bodyParser.json());

  app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
   app.set('view engine', 'handlebars');

app.get('/', async function(req,res ,next) {
  try {
    let counter   =  await greet.greetCounter();
  res.render('greetings',{counter});
  } catch (err) {
    return next(err);
  }
});

app.get('/greet/:name/:langauge', async function(req,res) {
  let greetMessage =  await greet.messageGreet(req.params.name,req.params.langauge);
  let counter   = await greet.greetCounter();

  res.render('greetings',{greetMessage,counter});
});

app.post("/greet",async function(req,res,next){
  try {
    let greetMessage = await greet.messageGreet(req.body.enteredName,req.body.langauge);
let counter   = await greet.greetCounter();
res.render('greetings',{greetMessage,counter});
  } catch (err) {
    return next(err);
  }
});

app.get("/greeted",async function(req,res,next){
  try {
     let result = await pool.query('SELECT * FROM users');
     let nameList = result.rows;
    res.render('greetedList',{nameList});
  } catch (err) {
    return next(err);
  }
  
});

app.get("/counter/:userName",async function(req,res,next){
  try {
    let result = await pool.query('SELECT * FROM users');
  let nameList = result.rows;
     let message = await greet.greetMessage(req.params.userName);
res.render('greetedList',{nameList,message})
  } catch (err) {
    return next(err);
  }
});

app.get("/reset",async function(req,res,next){
  try {
    await greet.reset();
    let counter   = await greet.greetCounter();
    res.render('greetings',{counter});
  } catch (error) {
    return next(err);
  }  
});

 app.listen(PORT, async function(err) {
   console.log('App starting on port', PORT)
 });


