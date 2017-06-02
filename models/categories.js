// Categories models



module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    cat_id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    category_name: {
      type:DataTypes.STRING,
    }
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


