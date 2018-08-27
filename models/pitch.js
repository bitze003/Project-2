module.exports = function(sequelize, DataTypes) {
  var Pitch = sequelize.define("Pitch", {
    text: DataTypes.TEXT,
    score: DataTypes.INTEGER
  });


  Pitch.associate = function(models) {
    // a Pitch must belong to a User
    // a Pitch cannot be created without a User due to the foreign key constraint (?)
    Pitch.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Pitch;
};

