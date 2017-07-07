var express = require("express");

var moment = require("moment");

var router = express.Router();

// grabbing our models
var db = require("../models");

//TODO:  VARIABLE BELOW INSERTED FOR TESTING PURPOSES.  EITHER MUST BE REMOVED LATER, OR 
//KEPT BUT SET EQUAL TO localStorage.getItem('user_id')
var currentUser = "";
var intBudgetId = ""

//TODO: CALLS FUNCTION USED FOR DEVELOPMENT.  
//storeUserId();

router.get("/expenditures/view/setup", function(req, res){
  //call up the view page without rendering any hbs object
  // because we don't have a request body yet.
  res.render("expendituresView","");
});

// get route, edited to match sequelize
router.get("/expenditures/view/list", function(req, res) {

  console.log('start_date: ' + req.query.start_date);
  console.log('end_date: ' + req.query.end_date);
  db.Expenditures.findAll({
    // use promise method to pass the Budgets...
       where: {
        //UserId: currentUser,
        UserId: localStorage.getItem('user_id'),
        date_spent: {
          $between:[req.query.start_date, req.query.end_date]
        }
      },
      include: [{model: db.Categories, attributes: ['description']}],
      order: [ [ db.Categories, 'description', 'ASC' ],[ 'date_spent', 'ASC' ], ]


    })
    .then(function(dbExpenditures) {
      var hbsObject = [];


      //for (var i = dbExpenditures.length - 1; i >= 0; i--) {
      for (var i=0; i < dbExpenditures.length; i++) {
        let obj = {
          id: dbExpenditures[i].id,
          description:dbExpenditures[i].Category.dataValues.description,
          date_spent: dbExpenditures[i].date_spent,
          comments: dbExpenditures[i].comments,
          amt_spent: dbExpenditures[i].amt_spent
        }

      hbsObject.push(obj);
      console.log(obj);
      }

      var expenditureData = {Expenditures: hbsObject};


      console.log(hbsObject);

      return res.render("expendituresView", expenditureData);
      
  });
});



// post route to create expenditure
router.post("/expenditures/create", function(req, res) {
  
  console.log(req.body)

  // Begin by finding a BudgetId in budgets table.
  // This is a match on category, user and time period.
  db.Budgets.findOne({
    where: {
      //UserId: currentUser,
      UserId: localStorage.getItem('user_id'),
      CategoryId: req.body.category_id,
      start_date: {$lte: req.body.date_spent},
      end_date: {$gte: req.body.date_spent}
    },

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

        //UserId: currentUser,
        UserId: localStorage.getItem('user_id'),
        date_spent: req.body.date_spent,
        amt_spent: req.body.amt_spent,
        comments: req.body.comments,
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




  // UPDATE 
  router.put("/expenditures/update", function(req, res) {
    db.Expenditures.update({
      amt_spent: req.body.amt_spent,
      comments: req.body.comments,
      date_spent: req.body.date_spent

    },{
      where: {
        id: req.body.expenditure_id
      }
    })
    .then(function(dbExpenditures) {
      //res.json(dbExpenditures);
    });
    
  });

  // DELETE
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


module.exports = router;



