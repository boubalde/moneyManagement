// Expenditures models



module.exports = function(sequelize, DataTypes) {
  var Expenditures = sequelize.define("Expenditures", {
    id: {
      type: DataTypes.INTEGER(11),
      //defaultValue:DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    date_spent: {
      type: DataTypes.DATEONLY,
    },
    amt_spent: {
      type: DataTypes.INTEGER,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
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

