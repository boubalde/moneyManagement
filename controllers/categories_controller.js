
var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");



// get route, edited to match sequelize
router.get("/categories", function(req, res) {
 
  db.Categories.findAll({})
  // use promise method to pass the Categories...
  .then(function(dbCategories) {
    var hbsObject = {
      Categories: dbCategories
    };
    console.log(dbCategories);
    console.log("list of all the Categories");
    return res.render("index", hbsObject);
    
  });
});


var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");



// post route to create category
router.post("/categories/create", function(req, res) {
  console.log(req.body)

  // edited burger create to add in a burger_name
  db.Categories.create({
    category_name: req.body.category_name
    description: req.body.description
    classMethod: req.body.classMethod
  })
  // pass the result of our call
  .then(function(dbCategories) {
    // log the result to our terminal/bash window
    console.log(dbCategories);
    // redirect
    res.redirect("/");
  });
});


 // DELETE 
  router.delete("/categories/delete/:id", function(req, res) {
    db.Categories.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbCategories) {
      res.json(dbCategories);
    });
  });


module.exports = router;







