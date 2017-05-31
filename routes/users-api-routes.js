// api-routes.js - this file offers a set of routes for displaying and saving data to the db

var db = require("../models");

module.exports = function(app) {

  //Find all the users
  app.get("/api/users", function(req, res) {
    db.Users.findAll({
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });


//Get route for retrieving a single user
  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, the categories, the budgets, and the expenditures
    db.Users.findOne({
      where: {
        id: req.params.id
      },
       include: [db.Categories]
          include: [db.Budgets]
              include: [db.Expenditures]
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

// create a new user
  app.post("/api/users", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // delete an user
  app.delete("/api/users/:id", function(req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // update an user
  app.put("/api/users", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

};
