// Code is an adapted version of a tutorial by bezkoder
// The code in his tutorial has been adapted to fit my project but may contain some similarities
// The tutorial can be accessed at https://bezkoder.com/node-js-express-sequelize-mysql/

module.exports = app => {
  const pubs = require("../controllers/pub.controller.js");

  var router = require("express").Router();

  // Create a new Recipe
  router.post("/", pubs.create);

  // Retrieve all Recipes
  router.get("/", pubs.findAll);

  // Retrieve a single Recipe with id
  router.get("/:id", pubs.findOne);


  // Delete a Recipe with id
  router.delete("/:id", pubs.delete);


  app.use('/api/pubs', router);
};
