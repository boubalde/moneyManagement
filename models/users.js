// Users models


module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
      id:{
      type: DataTypes.INTEGER(11),
      //defaultValue:DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email_address: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,  
    }
  }, {
    classMethods: {
      associate: function(models) {
        Users.hasMany(models.Categories);
        Users.hasMany(models.Budgets);
        Users.hasMany(models.Expenditures);
      }
    }

  });
  
  return Users;
};

