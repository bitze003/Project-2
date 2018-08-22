module.exports = function(sequelize, DataTypes) {
    var Pitch = sequelize.define("Pitch", {
        text: DataTypes.TEXT,
        score: DataTypes.INTEGER,
    });
    return Pitch;
};