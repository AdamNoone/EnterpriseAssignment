// This controller has functionality inspired by a tutorial by bezkoder
// This controllers code contains some elements of this tutorial which have been adapted for this project
// The tutorial can be accessed at https://bezkoder.com/node-js-express-sequelize-mysql/


const db = require("../models");
const Review = db.reviews;
const Op = db.Sequelize.Op;

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request
  if (!req.body.pub_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Review
  const review = {
    pub_id: req.body.pub_id,
    review_title: req.body.review_title,
    review_text: req.body.review_text,
    rating: req.body.rating,
    user: req.body.user,
  };

  // Save Review in the database
  Review.create(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the Review."
      });
    });
};


exports.findByID = (req, res) => {
  const pubid = req.query.pub_id;
  var condition = pubid ? { pub_id: { [Op.like]: `%${pubid}%` } } : null;

  Review.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving Reviews."
      });
    });
};

// Retrieve all Reviews from the database.
exports.findByName = (req, res) => {
  const username = req.query.user;
  console.log("backend says " + username);
  var condition = username ? { user: { [Op.like]: `%${username}%` } } : null;

  Review.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving Reviews."
      });
    });
};


// Find a single Review with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Review.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Review with id=" + id
      });
    });
};


// Update a Review by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Review.update(req.body, {
    where: { id: id }
  })
    .then(num => {
        res.send({
          message: "Review was updated successfully."
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Review with id=" + id
      });
    });
};

// Delete a Review with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Review.destroy({
    where: { id: id }
  })
    .then(num => {
        res.send({
          message: "Review was deleted successfully!"
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};



