// this page is the api route for categories

var express = require("express");

var router = express.Router();

var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/categories");
});

// get route, edited to match sequelize
router.get("/categories", function(req, res) {
  // replace old function with sequelize function
  db.Categories.findAll({
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
    return res.render("index", hbsObject);
  });
});

// // post route to create burgers
// router.post("/burgers/create", function(req, res) {
//   // edited burger create to add in a burger_name
//   db.Burger.create({
//     burger_name: req.body.burger_name
//   })
//   // pass the result of our call
//   .then(function(dbBurger) {
//     // log the result to our terminal/bash window
//     console.log(dbBurger);
//     // redirect
//     res.redirect("/");
//   });
// });

// // put route to devour a burger
// router.put("/burgers/update", function(req, res) {
//   // If we are given a customer, create the customer and give them this devoured burger
//   if (req.body.customer) {
//     db.Customer.create({
//       customer: req.body.customer,
//       BurgerId: req.body.burger_id
//     })
//     .then(function(dbCustomer) {
//       return db.Burger.update({
//         devoured: true
//       }, {
//         where: {
//           id: req.body.burger_id
//         }
//       });
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
//   // If we aren't given a customer, just update the burger to be devoured
//   else {
//     db.Burger.update({
//       devoured: true
//     }, {
//       where: {
//         id: req.body.burger_id
//       }
//     })
//     .then(function(dbBurger) {
//       res.redirect("/");
//     });
//   }
// });

module.exports = router;
//COMMENT OUT BELOW

// module.exports = function(app) {

//   //Find all the Categories
//   app.get("/api/categories", function(req, res) {
//     db.Categories.findAll({
//     }).then(function(dbCategories) {
//       res.json(dbCategories);
//     });
//   });


// //Get route for retrieving a single Category
//   app.get("/api/categories/:id", function(req, res) {
//     // Here we add an "include" property to our options in our findOne query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, the budgets, and the expenditures
//     db.Categories.findOne({
//       where: {
//         id: req.params.id
//       },
//           include: [db.Budgets]
//               include: [db.Expenditures]
//     }).then(function(dbCategories) {
//       res.json(dbCategories);
//     });
//   });

// // create a new Category
//   app.post("/api/categories", function(req, res) {
//     db.Categories.create(req.body).then(function(dbCategories) {
//       res.json(dbCategories);
//     });
//   });

//   // delete a Category
//   app.delete("/api/Categories/:id", function(req, res) {
//     db.Categories.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbCategories) {
//       res.json(dbCategories);
//     });
//   });

//   // update a Category
//   app.put("/api/categories", function(req, res) {
//     db.Post.update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       }).then(function(dbCategories) {
//         res.json(dbCategories);
//       });
//   });

// };
