// TODO: create a home html page. Check lign 13
// update and delete an user lign 56


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
    // into the main index, updating the page
    var hbsObject = {
      Users: dbUsers
    };
    console.log(dbUsers);
    console.log("list of all the users");
    return res.render("index", hbsObject);
    
  });
});



// post route to create burgers
router.post("/burgers", function(req, res) {
  console.log(req.body)

  // edited burger create to add in a burger_name
  db.Burger.create({
    burger_name: req.body.burger_name
  })
  // pass the result of our call
  .then(function(dbBurger) {
    // log the result to our terminal/bash window
    console.log(dbBurger);
    // redirect
    res.redirect("/");
  });
});




// post route to create users
router.post("/create", function(req, res) {
  console.log(req.body)

    // res.sendStatus(200);
  // edited Users create to add in a Users_name
  // db.Users.create()
  // // pass the result of our call
  // .then(function(dbUsers) {
  //   // log the result to our terminal/bash window
  //   //console.log(dbUsers);
  //   console.log("hello")
  //   // redirect
  //   res.sendStatus(200);
  //   res.redirect("/");

  // });
});

// put route to devour a Users
router.put("/users/update", function(req, res) {
  // If we are given a customer, create the customer and give them this devoured Users
  if (req.body.customer) {
    db.Customer.create({
      customer: req.body.customer,
      UsersId: req.body.user_id
    })
    .then(function(dbCustomer) {
      return db.Users.update({
        devoured: true
      }, {
        where: {
          id: req.body.Users_id
        }
      });
    })
    .then(function(dbUsers) {
      res.redirect("/");
    });
  }
  // If we aren't given a customer, just update the Users to be devoured
  else {
    db.Users.update({
      devoured: true
    }, {
      where: {
        id: req.body.Users_id
      }
    })
    .then(function(dbUsers) {
      res.redirect("/");
    });
  }
});

module.exports = router;
