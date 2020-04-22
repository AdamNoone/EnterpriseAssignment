// This middleware has functionality inspired by a tutorial by bezkoder
// This middleware code contains some elements of this tutorial which have been adapted for this project
// The tutorial can be accessed at https://bezkoder.com/node-js-jwt-authentication-mysql/

//registration code to call JWT and Verify that the sign process was successful
const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,
  verifySignUp
};
