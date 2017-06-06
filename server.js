	var express = require("express");
	var methodOverride = require("method-override");
	var app        = express()
    var passport   = require('passport')
    var session    = require('express-session')
    var bodyParser = require('body-parser')
    var env        = require('dotenv').load()
    var exphbs     = require('express-handlebars')
    var path       = require("path")
    var PORT = process.env.PORT || 8080;

// bring in the models
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

 //For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
// parse application/x-www-form-urlencoded

 // For Passport
 app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 app.use(passport.initialize());
 app.use(passport.session()); // persistent login sessions


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

// app.get('/', function(req, res){
//       res.render('/');
//     });

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

//Routes
    var authRoute = require('./routes/passP.js')(app,passport);
//load passport strategies
    require('./config/passport.js')(passport,db.Users);


var routes = require("./controllers/categories_controller");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);
//app.use("/users", routes)


// listen on port 3000
db.sequelize.sync().then(function(){
    console.log('Nice! Database looking good!')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
    });



    app.listen(PORT, function(err){
        if(!err)
        console.log("Live on Port 8080"); else console.log(err)

    });