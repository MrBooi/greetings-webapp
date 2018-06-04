"use strict";
const express = require('express');
 const exphbs = require('express-handlebars');
 const bodyParser = require('body-parser');
 const greeting = require('./greet');

  const app = express();
  const greet = greeting();

  var PORT = process.env.PORT || 3000;
  app.use(express.static('public'));

  app.use(bodyParser.urlencoded({
      extended:false
  }));

  app.use(bodyParser.json());

  app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
   app.set('view engine', 'handlebars');

app.get('/',function(req,res) {
  let counter   = greet.greetCounter();
  res.render('greetings',{counter});
});

app.get('/greet/:name/:langauge',function(req,res) {
  let nameGreeted =  greet.messageGreet(req.params.name,req.params.langauge);
  let counter   = greet.greetCounter();
  res.render('greetings',{nameGreeted,counter});
});

app.post("/greet",function(req,res){
let nameGreeted =  greet.messageGreet(req.body.enteredName,req.body.langauge);
let counter   = greet.greetCounter();
res.render('greetings',{nameGreeted,counter});
});

app.get("/greeted",function(req,res){
  let listOfNames= greet.nameMap();
  res.render('greetedList',{nameList:listOfNames});
});

app.get("/counter/:userName",function(req,res){
    let listOfNames= greet.nameMap();
     let message =greet.greetMessage(req.params.userName);
res.render('greetedList',{nameList:listOfNames,message})
})

 app.listen(PORT, function(err) {
   console.log('App starting on port', PORT)
 });
c