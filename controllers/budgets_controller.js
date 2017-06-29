var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");


//var Sequelize = require('sequelize');

//let {categories} = db.Categories;

//TODO:  VARIABLE BELOW INSERTED FOR TESTING PURPOSES.  EITHER MUST BE REMOVED LATER, OR 
//KEPT BUT SET EQUAL TO localStorage.getItem('user_id')
var currentUser = "";

//TODO: CALLS FUNCTION USED FOR DEVELOPMENT.  
//storeUserId();  Commented out by CR 06/25/17

// get route -> index
///router.get("/", function(req, res) {
//   // send us to the next get function instead.
//   res.redirect("/budgets");
// });

router.get("/budgets/view/setup", function(req, res){
  //call up the view page without rendering any hbs object
  // because we don't have a request body yet.
  res.render("budgetsView","");
});

// get route, edited to match sequelize
router.get("/budgets/view/list", function(req, res) {

  console.log('start_date: ' + req.query.start_date);
  console.log('end_date: ' + req.query.end_date);
  db.Budgets.findAll({
    // use promise method to pass the Budgets...
       where: {
        //UserId: currentUser,
        UserId: localStorage.getItem('user_id'),  //added by CR 06/25/17
        start_date: req.query.start_date,
        end_date: req.query.end_date
      },
      include: [{model: db.Categories, attributes: ['description']}]


    })
    .then(function(dbBudgets) {
      var hbsObject = [];


      for (var i = dbBudgets.length - 1; i >= 0; i--) {
        let obj = {
          id: dbBudgets[i].id,
          description:dbBudgets[i].Category.dataValues.description,
          amt_budgeted: dbBudgets[i].amt_budgeted
        }

      hbsObject.push(obj);
      //console.log(obj);
      }

      var budgetData = {Budgets: hbsObject};


      console.log(hbsObject);

      return res.render("budgetsView", budgetData);
      
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
  //res.redirect("/categories/budgetsCreate");
  });
});


 // UPDATE 
  router.put("/budgets/update", function(req, res) {
    db.Budgets.update({
      amt_budgeted: req.body.amt_budgeted
    },{
      where: {
        id: req.body.budget_id
      }
    })
    .then(function(dbBudgets) {
      //res.json(dbBudgets);
    });
  });

 // DELETE 
  router.delete("/budgets/delete", function(req, res) {
    db.Budgets.destroy({
      where: {
        id: req.body.id
      }
    })
    .then(function(dbBudgets) {
      //res.json(dbBudgets);
    });
  });

// router.get("/graphs/view/setup", function(req, res){
//   //call up the view page without rendering any hbs object
//   // because we don't have a request body yet.
//   res.render("graphsView","");
// });



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
























