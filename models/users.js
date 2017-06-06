// Users models


module.exports = function(sequelize, Sequelize) {
var Users = sequelize.define("Users", {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        username: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false

        },
        last_login: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
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

