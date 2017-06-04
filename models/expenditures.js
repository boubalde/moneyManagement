// Expenditures models



module.exports = function(sequelize, DataTypes) {
  var Expenditures = sequelize.define("Expenditures", {
    id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    date_spent: {
      type: DataTypes.DATE,
    },
    amt_spent: {
      type: DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Expenditures.belongsTo(models.Categories);
        Expenditures.belongsTo(models.Users);
        Expenditures.belongsTo(models.Budgets);

      }
    }
  });
  return Expenditures;
};

