module.exports = (sequelize, Sequelize) => {
  const Pub = sequelize.define("pub", {
    lat: {
      type: Sequelize.FLOAT
    },
    lon: {
      type: Sequelize.FLOAT
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Pub;
};
