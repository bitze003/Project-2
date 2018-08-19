module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("bigIdea", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
