var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");



router.get("/graphs/view/setup", function(req, res){
  //call up the view page without rendering any hbs object
  // because we don't have a request body yet.
  res.render("graphsView","");
});


router.get("/graphs/show", function(req, res){
  //res.render("graphsView","");
  var hbsObject = {
  	source1: "/assets/img/BarGraph.png",
  	source2: "/assets/img/PieChart.png"
  }
  console.log("Wow");

  var GraphDisplay = {Graphs: hbsObject}

  console.log(GraphDisplay);

  res.render("graphsView", GraphDisplay);
});


module.exports = router;
























