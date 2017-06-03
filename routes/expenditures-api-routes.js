var db = require("../models");

module.exports = function(app) {

  //Find all the Expenditures
  app.get("/api/expenditures", function(req, res) {
    db.Expenditures.findAll({
    }).then(function(dbExpenditures) {
      res.json(dbExpenditures);
    });
  });


//Get route for retrieving a single expenditure
  app.get("/api/expenditures/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, the Expenditures, and the expenditures
    db.Expenditures.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbExpenditures) {
      res.json(dbExpenditures);
    });
  });

// create a new expenditure
  app.post("/api/expenditures", function(req, res) {
    db.Expenditures.create(req.body).then(function(dbExpenditures) {
      res.json(dbExpenditures);
    });
  });

  // delete a expenditure
  app.delete("/api/expenditures/:id", function(req, res) {
    db.Expenditures.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExpenditures) {
      res.json(dbExpenditures);
    });
  });

  // update a expenditure
  app.put("/api/expenditures", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbExpenditures) {
        res.json(dbExpenditures);
      });
  });

};
