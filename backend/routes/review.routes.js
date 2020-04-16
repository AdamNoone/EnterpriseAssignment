module.exports = app => {
  const reviews = require("../controllers/review.controller.js");

  var router = require("express").Router();

  // Create a new Recipe
  router.post("/", reviews.create);

  // Retrieve all Recipes
  router.get("/", reviews.findAll);

  // Retrieve a single Recipe with id
  router.get("/:id", reviews.findOne);

  // Update a Recipe with id
  router.put("/:id", reviews.update);

  // Delete a Recipe with id
  router.delete("/:id", reviews.delete);

  // Create a new Recipe
  router.delete("/", reviews.deleteAll);

  app.use('/api/reviews', router);
};
