var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");

var Sequelize = require('sequelize');

let {categories} = db.Categories;

//TODO:  VARIABLE BELOW INSERTED FOR TESTING PURPOSES.  EITHER MUST BE REMOVED LATER, OR 
//KEPT BUT SET EQUAL TO localStorage.getItem('user_id')
var currentUser = "";

//TODO: CALLS FUNCTION USED FOR DEVELOPMENT.  
storeUserId();

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/budgets");
});

// get route, edited to match sequelize
router.get("/budgets", function(req, res) {
 
  db.Budgets.findAll({
  // use promise method to pass the Budgets...
    where: {
      UserId: currentUser},
    // include: [{
    //     model: Categories,
    //     where: { Categories: Sequelize.col('CategoryId') }
    // }]
    include: [db.Categories]
  })
  .then(function(dbBudgets) {
    var hbsObject = {
      Budgets: dbBudgets
    };
    console.log(dbBudgets);
    console.log("list of all the Budgets");
    return res.render("budgets", hbsObject);
    
  });
});


// post route to create budget
router.post("/budgets/create", function(req, res) {
  req.body.UserId = localStorage.getItem('user_id');

  console.log(req.body)

  
  db.Budgets.create({
    UserId: req.body.UserId,
    CategoryId: req.body.category_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    amt_budgeted: req.body.amt_budgeted
  })
  // pass the result of our call
  .then(function(dbBudgets) {
    // log the result to our terminal/bash window
    console.log(dbBudgets);
    // redirect
    res.redirect("/budgets");
  });
});


 // UPDATE 
  router.put("/budgets/update/:id", function(req, res) {
    db.Budgets.update({
      amt_budgeted: req.body.amt_budgeted
    },{
      where: {
        id: req.params.id
      }
    })
    .then(function(dbBudgets) {
      res.json(dbBudgets);
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

//TODO: FUNCTION BELOW INSERTED TEMPORARILY FOR TESTING PURPOSES
//MUST BE REMOVED LATER

function storeUserId(){

  if (typeof localStorage === "undefined" || localStorage === null) {
    
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
   
  localStorage.setItem('user_id', 1);
  console.log('current user id ' + localStorage.getItem('user_id'));

  currentUser = localStorage.getItem('user_id');

};

module.exports = router;
























