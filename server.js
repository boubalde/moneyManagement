
var express = require("express");

var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// bring in the models
var db = require("./models");
var path =require("path");


var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));
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

var routes = require("./controllers/categories_controller");

app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);
//app.use("/users", routes)


// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
  app.listen(port);
});
