// This controller has functionality inspired by a tutorial by bezkoder
// This controllers code contains some elements of this tutorial which have been adapted for this project
// The tutorial can be accessed at https://bezkoder.com/node-js-express-sequelize-mysql/


const db = require("../models");
const Pub = db.pubs;
const Op = db.Sequelize.Op;

// Create and Save a new Pub
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Pub
  const pub = {
    lat: req.body.lat,
    lon: req.body.lon,
    name: req.body.name,
  };

  // Save Pub in the database
  Pub.create(pub)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the pub."
      });
    });
};

// Retrieve all Pubs from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Pub.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while retrieving Pubs."
      });
    });
};


// Find a single Pub with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Pub.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Pub with id=" + id
      });
    });
};




// Delete a Pub with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Pub.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "pub was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete pub with id=" + id
      });
    });
};



