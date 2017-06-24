var express = require("express");
var methodOverride = require("method-override");
var app        = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env        = require('dotenv').load();
var exphbs     = require('express-handlebars');
var path       = require("path");
var PORT = process.env.PORT || 3000;


// bring in the models
var db = require("./models");
var path =require("path");


// Serve static content for the app from the "public" directory in the application directory.
 //For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
// parse application/x-www-form-urlencoded

 // For Passport
 app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 app.use(passport.initialize());
 app.use(passport.session()); // persistent login sessions


app.use(express.static(process.cwd()+"/public"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.urlencoded({
  extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");


app.get('/', function(req, res){
      res.render('index');
    });

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

//Passport requirements
var authRoute = require('./routes/passP.js')(app,passport);
//load passport strategies
    // require('./config/passport.js')(passport,db.Users);
var strategies = require('./config/passport.js')(passport,db.Users);


var routes = require("./controllers/categories_controller");

var routes1 = require("./controllers/budgets_controller");
var routes2 = require("./controllers/categories_controller");
var routes3 = require("./controllers/expenditures_controller");
var routes4= require("./controllers/users_controller");


app.use("/", routes1);
app.use("/update", routes1);
app.use("/create", routes1);
app.use("/delete", routes1);
//app.use("/users", routes)

app.use("/", routes2);
app.use("/update", routes2);
app.use("/create", routes2);
app.use("/delete", routes2);

app.use("/", routes3);
app.use("/update", routes3);
app.use("/create", routes3);
app.use("/delete", routes3);

app.use("/", routes4);
app.use("/update", routes4);
app.use("/create", routes4);
app.use("/delete", routes4);




db.sequelize.sync().then(function(){
    console.log('Database connection successful')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });



app.listen(PORT, function(err){
    if(!err){
        console.log("App listening on PORT: " + PORT);        }
    else {
        console.log(err)
    }
});