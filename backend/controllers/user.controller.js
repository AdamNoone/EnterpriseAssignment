// This controller has functionality inspired by a tutorial by bezkoder
// This controllers code contains some elements of this tutorial which have been adapted for this project
// The tutorial can be accessed at https://bezkoder.com/node-js-jwt-authentication-mysql/


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

