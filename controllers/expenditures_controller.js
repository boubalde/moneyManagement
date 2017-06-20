var express = require("express");

var router = express.Router();

// grabbing our models
var db = require("../models");

//TODO:  VARIABLE BELOW INSERTED FOR TESTING PURPOSES.  EITHER MUST BE REMOVED LATER, OR 
//KEPT BUT SET EQUAL TO localStorage.getItem('user_id')
var currentUser = "";
var intBudgetId = ""

//TODO: CALLS FUNCTION USED FOR DEVELOPMENT.  
storeUserId();

router.get("/expenditures/view/setup", function(req, res){
  //call up the view page without rendering any hbs object
  // because we don't have a request body yet.
  res.render("expendituresView","");
});

// get route, edited to match sequelize
router.get("/expenditures/view/list", function(req, res) {
  console.log("start_date: " + req.query.start_date);
  console.log("end_date: " + req.query.end_date);

  db.Expenditures.findAll({
    // TODO:  WRITE QUERY TO OBTAIN EXPENDITURES FOR USER ID AND IN DATE
    // RANGE SELECTED BY USER
    where: {
      UserId: currentUser,
      date_spent: {
        $between:[req.query.start_date, req.query.end_date]
      }
    },
  include: [{model: db.Categories}]
  })
  // use promise method to pass the Expenditures...
  .then(function(dbExpenditures) {
    var hbsObject = {
      Expenditures: dbExpenditures
    };
    console.log(dbExpenditures);
    console.log("list of all the Expenditures");
    return res.render("expendituresView", hbsObject);
    
  });
});


// post route to create expenditure
router.post("/expenditures/create", function(req, res) {
  
  console.log(req.body)

  // Begin by finding a BudgetId in budgets table.
  // This is a match on category, user and time period.
  db.Budgets.findOne({
    where: {
      UserId: currentUser,
      CategoryId: req.body.category_id,
      end_date: {$gte: req.body.date_spent}
    },
    //LINE BELOW COMMENTED OUT BY CLAUDE; APPEARS UNNECESSARY HERE
    //classMethods:req.body.classMethods
  })
  // pass the result of our call
  .then(function(dbBudgets) {
    // log the result to our terminal/bash window
    intBudgetId  = dbBudgets.id;
    console.log("BudgetId: " + intBudgetId);
    //TODO - DON'T REDIRECT AUTOMATICALLY TO HOME PAGE.
    //TODO - LET USER USE MENU TO GO BACK TO HOME IN CASE
    //TODO - USER WANTS TO STAY ON PAGE AND ENTER MORE EXPENDITURES
    // redirect
    //res.redirect("/");
  // The expenditure creation has been chained here to ensure that 
  // it will execute only after the integer variable intBudgetId has
  // been assigned a value.  This value is required in the expenditures
  // table (so that later the sum of expenditures in each category can
  // be compared to budget).
  })
  .then(function(dbChain){

      db.Expenditures.create({

        UserId: currentUser,
        date_spent: req.body.date_spent,
        amt_spent: req.body.amt_spent,
        CategoryId: req.body.category_id,
        BudgetId: intBudgetId
        //LINE BELOW COMMENTED OUT BY CLAUDE; APPEARS UNNECESSARY HERE
        //classMethods:req.body.classMethods
      })
      //pass the result of our call
      .then(function(dbExpenditures) {
        // log the result to our terminal/bash window
        console.log(dbExpenditures);
      //   //TODO - DON'T REDIRECT AUTOMATICALLY TO HOME PAGE.
      //   //TODO - LET USER USE MENU TO GO BACK TO HOME IN CASE
      //   //TODO - USER WANTS TO STAY ON PAGE AND ENTER MORE EXPENDITURES
      //   // redirect
      //   //res.redirect("/");
      });
    });
    
  });

//   db.Expenditures.create({

//     UserId: currentUser,
//     date_spent: req.body.date_spent,
//     amt_spent: req.body.amt_spent,
//     CategoryId: req.body.category_id,
//     BudgetId: intBudgetId
//     //LINE BELOW COMMENTED OUT BY CLAUDE; APPEARS UNNECESSARY HERE
//     //classMethods:req.body.classMethods
//   })
//   // pass the result of our call
//   .then(function(dbExpenditures) {
//     // log the result to our terminal/bash window
//     console.log(dbExpenditures);
//     //TODO - DON'T REDIRECT AUTOMATICALLY TO HOME PAGE.
//     //TODO - LET USER USE MENU TO GO BACK TO HOME IN CASE
//     //TODO - USER WANTS TO STAY ON PAGE AND ENTER MORE EXPENDITURES
//     // redirect
//     //res.redirect("/");
//   });
// });


  router.put("/budgets/update/", function(req, res) {
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

  // UPDATE 
  router.put("/expenditures/update", function(req, res) {
    db.Expenditures.update({
      amt_spent: req.body.amt_spent
    },{
      where: {
        id: req.body.expenditure_id
      }
    })
    .then(function(dbExpenditures) {
      //res.json(dbExpenditures);
    });
    
  });// DELETE
  router.delete("/expenditures/delete", function(req, res) {
    db.Expenditures.destroy({
      where: {
        id: req.body.expenditure_id
      }
    })
    .then(function(dbExpenditures) {
      //res.json(dbExpenditures);
    });
  });

//TODO:  WRITE UDATE ROUTE WITH PUT METHOD TO ALLOW USER
//TO OVERWRITE AN EXPENDITURE (E.G., TO CORRECT ERROR)
//THE EXPENDITURES PAGE SHOULD ALLOW FOR THIS

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



