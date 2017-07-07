// Users models

module.exports = function(sequelize, Sequelize) {
var Users = sequelize.define("Users", {

        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },

        firstname: {
            type: Sequelize.STRING,
            //notEmpty: true
            allowNull: false
        },

        lastname: {
            type: Sequelize.STRING,
            //notEmpty: true
            allowNull: false
        },

        username: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
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

