module.exports = app => {
  const pubs = require("../controllers/pub.controller.js");

  var router = require("express").Router();

  // Create a new Recipe
  router.post("/", pubs.create);

  // Retrieve all Recipes
  router.get("/", pubs.findAll);

  // Retrieve a single Recipe with id
  router.get("/:id", pubs.findOne);

  // Update a Recipe with id
  router.put("/:id", pubs.update);

  // Delete a Recipe with id
  router.delete("/:id", pubs.delete);

  // Create a new Recipe
  router.delete("/", pubs.deleteAll);

  app.use('/api/pubs', router);
};
