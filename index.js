const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Greeting= require('./greet');
const flash = require('express-flash')
const session= require('express-session')
const db = require("./db/db")
const dbFunction = require("./db/DbFunction")(db)
 
const app = express()
const greeting = Greeting();
// const dbFunction = DbFunction(db)


app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json()) 
app.use(session({
    secret : "Mbali",
    resave : false,
    saveUninitialized: true,
     cookie: { maxAge: 60000 }
}));

app.use(flash());

app.get('/', async function (req, res) {
 let name = greeting.username
 let language = greeting.language
let message= greeting.greet(name,language)

  greeting.username =""
  greeting.language=""
    res.render('index' ,{
    message: message,
      count: await dbFunction.getCounter(),
    
    });  
});



app.post('/greeted', async function(req, res){
    let error = greeting.errorMessage(req.body.fullname,req.body.language)
    if (error) {
       req.flash('info', error)
    }else{
      greeting.username = req.body.fullname
      greeting.language = req.body.language
      await dbFunction.greets(greeting.username)
    }
 

res.redirect('/');
});
app.post('/clear', async function(req, res){

  await dbFunction.clearNames()
  res.redirect('/');

})


app.get('/greeted' ,async function(req,res){
  let names= await dbFunction.getNames()
  
   console.log(names)
res.render('greeted',{
  names
})
})

app.get('/counter/:username',async function(req, res){
  let user = req.params.username;
  let counter= await dbFunction.getUserCounter(user)
// await dbFunction.getCounter(user)
  res.render('counter',{user, counter})
  
  });


const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});  