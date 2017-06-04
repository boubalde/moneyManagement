var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");



// get route, edited to match sequelize
router.get("/expenditures", function(req, res) {
 
  db.Expenditures.findAll({})
  // use promise method to pass the Expenditures...
  .then(function(dbExpenditures) {
    var hbsObject = {
      Expenditures: dbExpenditures
    };
    console.log(dbExpenditures);
    console.log("list of all the Expenditures");
    return res.render("index", hbsObject);
    
  });
});


// post route to create expenditure
router.post("/expenditures/create", function(req, res) {
  console.log(req.body)

  // edited burger create to add in a burger_name
  db.Expenditures.create({
    date_: req.body.date_
    amt_spent:req.body.amt_spent
    classMethods:req.body.classMethods
  })
  // pass the result of our call
  .then(function(dbExpenditures) {
    // log the result to our terminal/bash window
    console.log(dbExpenditures);
    // redirect
    res.redirect("/");
  });
});


 // DELETE
  router.delete("/expenditures/delete/:id", function(req, res) {
    db.Expenditures.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbExpenditures) {
      res.json(dbExpenditures);
    });
  });

module.exports = router;



