// this page is the api route for categories

var express = require("express");

var router = express.Router();

var db = require("../models");

//TODO:  VARIABLE BELOW INSERTED FOR TESTING PURPOSES.  EITHER MUST BE REMOVED LATER, OR 
//KEPT BUT SET EQUAL TO localStorage.getItem('user_id')
var currentUser = "";



// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/categories");
});

// get route, edited to match sequelize
router.get("/categories", function(req, res) {

  // TODO: Call function inserted temporarily to set a value for user id of
  // current user.  This function will be removed after the login
  // code has been adjusted to store the actual value for user.
  storeUserId();
    
  //var currentUser = localStorage.getItem('user_id');
  db.Categories.findAll({
    where: {
      UserUserId: {
        //$or: [null,1]}
        $or: [null,currentUser]}
    },
    // Here we specify we want to return our categories in ascending order by description field
    order: [
      ["description", "ASC"]
    ]
  })
  // use promise method to pass the burgers...
  .then(function(dbCategories) {
    // into the main index, updating the page
    var hbsObject = {
      category: dbCategories
    };
    return res.render("expenditures", hbsObject);
  });
});

router.post("/categories/create", function(req, res) {
  console.log(req.body);

  // TODO - LINE BELOW CALLS A TESTING FUNCTION AND IT MUST BE REMOVED LATER
  storeUserId();

  // Post to 
  db.Categories.create({
    description: req.body.description,
    UserUserId: currentUser
  })
  // pass the result of our call
  .then(function(dbCategories) {
    // log the result to our terminal/bash window
    console.log(dbCategories);
    
    //TODO - DON'T REDIRECT AUTOMATICALLY TO HOME PAGE.
    //LET USER USE MENU TO GO BACK TO HOME IN CASE
    //USER WANTS TO STAY ON PAGE AND CREATE MORE CATEGORIES
    // redirect
    //res.redirect("/");
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
