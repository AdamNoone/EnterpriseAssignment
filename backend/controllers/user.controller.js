// Code is an adapted version of a tutorial by bezkoder
// The code in his tutorial has been adapted to fit my project but may contain some similarities
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

