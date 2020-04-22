// Code is an adapted version of a tutorial by bezkoder
// The code in his tutorial has been adapted to fit my project but may contain some similarities
// The tutorial can be accessed at https://bezkoder.com/node-js-jwt-authentication-mysql/

//registration code to call JWT and Verify that the sign process was successful
const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,
  verifySignUp
};
