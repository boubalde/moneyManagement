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
storeUserId();

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
        UserId: currentUser,
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
    // redirect
    //res.redirect("/budgets/create");
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


// get route, edited to match sequelize
// router.get("/budgets/view/test", function(req, res) {

//   console.log('start_date: ' + req.query.start_date);
//   console.log('end_date: ' + req.query.end_date);
//   db.Categories.findAll({
//     // use promise method to pass the Budgets...
//       // where: {
//       //   UserId: currentUser,
//       //   start_date: req.query.start_date,
//       //   end_date: req.query.end_date
//       // },
//       //  where: {
//       //   UserId: currentUser,
//       //   start_date: req.query.start_date,
//       //   end_date: req.query.end_date
//       // },       //start_date: localStorage.getItem('start_date'),
//         //end_date: localStorage.getItem('end_date')},
//       // include: [{
//       //     model: Categories,
//       //     where: { Categories: Sequelize.col('CategoryId') }
//       // }]
//       include: [{model: db.Budgets, attributes: ['start_date']}]

//     })
//     .then(function(dbCategories) {
//       var hbsObject = {
//         Categories: dbCategories
//       };
//       // console.log("id: " + dbBudgets.id);
//       // console.log("description: " + dbBudgets.description);
//       // console.log("start_date: " + dbBudgets.start_date);
//       // console.log("end_date: " + dbBudgets.end_date);
//       // console.log("amt_budgeted: " + dbBudgets.amt_budgeted);
//       // console.log("CategoryId: " + dbBudgets.CategoryId);
//       // console.log("CreatedAt: ") + dbBudgets.createdAt;
//       // console.log("list of all the Budgets");
//       console.log("start_date: " + dbCategories.start_date);
//       //console.log(dbCategories);


//       //return res.render("budgetsView", hbsObject);
      
//   });
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
























