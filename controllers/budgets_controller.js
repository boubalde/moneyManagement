var express = require("express");
// var bodyParser = require("body-parser");
var router = express.Router();
// grabbing our models
var db = require("../models");


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
        //UserId: currentUser,
        UserId: localStorage.getItem('user_id'),  //added by CR 06/25/17
        start_date: req.query.start_date,
        end_date: req.query.end_date
      },
      include: [{model: db.Categories, attributes: ['description']}],
      order: [ [ db.Categories, 'description', 'ASC' ] ]

    })
    .then(function(dbBudgets) {
      var hbsObject = [];


      //for (var i = dbBudgets.length - 1; i >= 0; i--) {
      for (var i = 0; i< dbBudgets.length; i++) {
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
    //signals client that post response is finished
    //res.sendStatus(200);
    // redirects back to page that called post request
    res.redirect('back');

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
       //signals client that post response is finished
      res.end();
      // redirects back to page that called post request
      res.redirect('back');

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
      //signals client that post response is finished
      res.end();
      // redirects back to page page that called post request
      res.redirect('back');

    });
  });




module.exports = router;

