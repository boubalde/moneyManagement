// Budgets models



module.exports = function(sequelize, DataTypes) {
  var Budgets = sequelize.define("Budgets", {
    budget_id: {
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    budget_name: {
    type:DataTypes.STRING,
     },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
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
  console.log(Budgets);
  return Budgets;
};
