var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// bring in the models
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
// parse application/x-www-form-urlencoded
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



// listen on port 3000
var port = process.env.PORT || 3000;
db.sequelize.sync().then(function() {
  app.listen(port);
});
