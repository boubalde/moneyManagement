var express = require("express");

var router = express.Router();

// grabbing our models
var db = require("../models");

//TODO:  VARIABLE BELOW INSERTED FOR TESTING PURPOSES.  EITHER MUST BE REMOVED LATER, OR 
//KEPT BUT SET EQUAL TO localStorage.getItem('user_id')
var currentUser = "";


// get route, edited to match sequelize
router.get("/expenditures", function(req, res) {
 
  db.Expenditures.findAll({
    // TODO:  WRITE QUERY TO OBTAIN EXPENDITURES FOR USER ID AND IN DATE
    // RANGE SELECTED BY USER
    where: {
      UserId: currentUser,
      date_spent: {
        $between:[body.req.start_date, body.req.end_date]
      }
    },
  })
  // use promise method to pass the Expenditures...
  .then(function(dbExpenditures) {
    var hbsObject = {
      expenditures: dbExpenditures
    };
    console.log(dbExpenditures);
    console.log("list of all the Expenditures");
    return res.render("expenditures", hbsObject);
    
  });
});


// post route to create expenditure
router.post("/expenditures/create", function(req, res) {
  console.log(req.body)

  db.Expenditures.create({
    date_spent: req.body.date_spent,
    amt_spent:req.body.amt_spent
    //LINE BELOW COMMENTED OUT BY CLAUDE; APPEARS UNNECESSARY HERE
    //classMethods:req.body.classMethods
  })
  // pass the result of our call
  .then(function(dbExpenditures) {
    // log the result to our terminal/bash window
    console.log(dbExpenditures);
    //TODO - DON'T REDIRECT AUTOMATICALLY TO HOME PAGE.
    //TODO - LET USER USE MENU TO GO BACK TO HOME IN CASE
    //TODO - USER WANTS TO STAY ON PAGE AND ENTER MORE EXPENDITURES
    // redirect
    //res.redirect("/");
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



