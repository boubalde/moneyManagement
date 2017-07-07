// this page is the api route for categories

var express = require("express");

var router = express.Router();

var db = require("../models");


// This route populates a drop-down box on either of two views.  The view is specified
// in the parameter :pageName
router.get("/categories/:pageName", function(req, res) {

  // console.log("local Storage user id: " + localStorage.getItem("user_id"))

  db.Categories.findAll({
    where: {
      UserId: {
        $or: [null,localStorage.getItem('user_id')]}
    },
    // Here we specify we want to return our categories in ascending order by description field
    order: [
      ["description", "ASC"]
    ]
  })
  // use promise method to pass the burgers...
  .then(function(dbCategories) {
    // into the relevant page
    var hbsObject = {
      category: dbCategories
    };
    return res.render(req.params.pageName, hbsObject);
  });
});


// TODO: WILL NEED A PAGE TO MANAGE CATEGORIES FOR PURPOSES OF ADDING USER
// DEFINED CATEGORIES AND DELETING USER DEFINED CATEGORIES ONLY.
// MUST WRITE A DELETE ROUTE BELOW AND CONFINE IT TO ONLY THE USER'S OWN
// CUSTOM CATEGORIES, IF ANY.

// TODO:  ALSO NEED ROUTE TO UPDATE USER DEFINED CATEGORIES ONLY, IF ANY.

// TODO:  PAGE FOR INSERTING/DELETING MUST BE ABLE TO CALL POST, PUT AND
// DESTROY METHODS ON CLICK OF A BUTTON.

router.post("/categories/create", function(req, res) {
  console.log(req.body);

  // Post to 
  db.Categories.create({
    description: req.body.description,
    UserId: localStorage.getItem('user_id')
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




module.exports = router;
