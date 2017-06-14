var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");

//TODO:  VARIABLE BELOW INSERTED FOR TESTING PURPOSES.  EITHER MUST BE REMOVED LATER, OR 
//KEPT BUT SET EQUAL TO localStorage.getItem('user_id')
var currentUser = "";


// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/budgets");
});

// get route, edited to match sequelize
router.get("/budgets", function(req, res) {
 
  db.Budgets.findAll({})
  // use promise method to pass the Budgets...
  .then(function(dbBudgets) {
    var hbsObject = {
      Budgets: dbBudgets
    };
    console.log(dbBudgets);
    console.log("list of all the Budgets");
    return res.render("index", hbsObject);
    
  });
});


// post route to create budget
router.post("/budgets/create", function(req, res) {
  console.log(req.body)

  
  db.Budgets.create({
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    amt_budgeted: req.body.amt_budgeted
  })
  // pass the result of our call
  .then(function(dbBudgets) {
    // log the result to our terminal/bash window
    console.log(dbBudgets);
    // redirect
    res.redirect("/");
  });
});

 // DELETE 
  router.delete("/budgets/delete/:id", function(req, res) {
    db.Budgets.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbBudgets) {
      res.json(dbBudgets);
    });
  });

module.exports = router;
























