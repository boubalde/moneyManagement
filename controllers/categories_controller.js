// // this page is the api route for categories

// var db = require("../models");

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
