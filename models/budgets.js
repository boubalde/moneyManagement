// Budgets models



module.exports = function(sequelize, DataTypes) {
  var Budgets = sequelize.define("Budgets", {
    id: {
      type: DataTypes.INTEGER(11),
      //defaultValue:DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    start_date: {
      type: DataTypes.DATEONLY,
    },
    end_date: {
      type: DataTypes.DATEONLY,
    },
    amt_budgeted: {
      type: DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate: function(models) {
        Budgets.belongsTo(models.Categories);
        Budgets.belongsTo(models.Users);
        Budgets.hasMany(models.Expenditures);

      }
    }
  });
  return Budgets;
};
