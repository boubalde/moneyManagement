// // this page is the api route for budget

// var db = require("../models");

// module.exports = function(app) {

//   //Find all the Budgets
//   app.get("/api/budgets", function(req, res) {
//     db.Budgets.findAll({
//     }).then(function(dbBudgets) {
//       res.json(dbBudgets);
//     });
//   });


// //Get route for retrieving a single budget
//   app.get("/api/budgets/:id", function(req, res) {
//     // Here we add an "include" property to our options in our findOne query
//     // We set the value to an array of the models we want to include in a left outer join
//     // In this case, the budgets, and the expenditures
//     db.Budgets.findOne({
//       where: {
//         id: req.params.id
//       },
//         include: [db.Expenditures]
//     }).then(function(dbBudgets) {
//       res.json(dbBudgets);
//     });
//   });

// // create a new budget
//   app.post("/api/Budgets", function(req, res) {
//     db.Budgets.create(req.body).then(function(dbBudgets) {
//       res.json(dbBudgets);
//     });
//   });

//   // delete a budget
//   app.delete("/api/Budgets/:id", function(req, res) {
//     db.Budgets.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function(dbBudgets) {
//       res.json(dbBudgets);
//     });
//   });

//   // update a budget
//   app.put("/api/Budgets", function(req, res) {
//     db.Post.update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       }).then(function(dbBudgets) {
//         res.json(dbBudgets);
//       });
//   });

// };
