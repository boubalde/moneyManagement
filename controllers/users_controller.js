
var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");


// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/home");   
});

// get route, edited to match sequelize
router.get("/users", function(req, res) {
 
  db.Users.findAll({})
  // use promise method to pass the users...
  .then(function(dbUsers) {
    var hbsObject = {
      Users: dbUsers
    };
    console.log(dbUsers);
    console.log("list of all the users");
    return res.render("index", hbsObject);
    
  });
});



// post route to create users
router.post("/users/create", function(req, res) {
  console.log(req.body)

  // edited burger create to add in a burger_name
  db.Users.create({
    first_name:req.body.first_name
    last_name: req.body.last_name
    email_address: req.body.email_address
    password: req.body.password
    classMethod: req.body.classMethod
  })
  // pass the result of our call
  .then(function(dbUsers) {
    // log the result to our terminal/bash window
    console.log(dbUsers);
    // redirect
    res.redirect("/");
  });
});


 // DELETE 
  router.delete("/users/delete/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbUsers) {
      res.json(dbUsers);
    });
  });





module.exports = router;
