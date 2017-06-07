// Categories models



module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    id: {
      type: DataTypes.INTEGER(11),
      //defaultValue:DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    description: {
      type: DataTypes.TEXT,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Categories.hasMany(models.Budgets);
        Categories.belongsTo(models.Users);
      }
    }
  });
  return Categories;
};



