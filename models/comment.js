module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
      author: DataTypes.TEXT,
      body: DataTypes.TEXT,
      createdAt: DataTypes.DATE
    });
    // ,{});
    // comments.associate = function(models) {
    //   comments.belongsTo(models.pitch, { as: "pitch", foreignKey: "pitchId" });
    // };
    return Comments;
  };