// Code is an adapted version of 2 tutorials by bezkoder
// The code in his tutorial has been adapted to fit my project but may contain some similarities
// Tutorial 1 can be accessed at https://bezkoder.com/node-js-jwt-authentication-mysql/

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
