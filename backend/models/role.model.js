// Code is an adapted version of 2 tutorials by bezkoder
// The code in his tutorial has been adapted to fit my project but may contain some similarities
// Tutorial 1 can be accessed at https://bezkoder.com/node-js-jwt-authentication-mysql/

module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Role;
};
