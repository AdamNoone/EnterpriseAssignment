// This Route has functionality inspired by a tutorial by bezkoder
// This Route code contains some elements of this tutorial which have been adapted for this project
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
