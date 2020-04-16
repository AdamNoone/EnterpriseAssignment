
module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("review", {
    pub_id: {
      type: Sequelize.INTEGER
    },
    review_title: {
      type: Sequelize.STRING
    },
    review_text: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER
    },
    user: {
      type: Sequelize.STRING
    },
  });

  return Review;
};

