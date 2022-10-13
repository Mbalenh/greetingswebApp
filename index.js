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
const routes= require("./routes")(dbFunction,greeting)
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

app.get('/', routes.getIndex)
app.post('/greeted', routes.greeted)
app.post('/clear' , routes.clearName)
app.get('/greeted' ,routes.getName)
app.get('/counter/:username',routes.getUserCounters)


const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});  