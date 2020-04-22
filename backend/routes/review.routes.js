// Code is an adapted version of a tutorial by bezkoder
// The code in his tutorial has been adapted to fit my project but may contain some similarities
// The tutorial can be accessed at https://bezkoder.com/node-js-express-sequelize-mysql/


module.exports = app => {
  const reviews = require("../controllers/review.controller.js");

  var router = require("express").Router();

  // Create a new Review
  router.post("/", reviews.create);

// Retrieve all Review
  router.get("/user", reviews.findByName);

  // Retrieve all Review
  router.get("/pub_id", reviews.findByID);

  // Retrieve a single Review with id
  router.get("/:id", reviews.findOne);

  // Update a Recipe with id
  router.put("/:id", reviews.update);

  // Delete a Recipe with id
  router.delete("/:id", reviews.delete);

  app.use('/api/reviews', router);
};
