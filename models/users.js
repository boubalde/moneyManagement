// Users models (table)


module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    first_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
     last_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
     email_address:{
      type: DataTypes.STRING,
      allowNull: false,
    },
     password:{
      type: DataTypes.STRING,
      allowNull: false,
    },

   {
      // We're saying that we want our Users to have categories
    classMethods: {
        associate: function(models) {
          // Associating Users with categories
          // When an Users is deleted, also delete any associated categories
          Users.hasMany(models.Categories, {
            onDelete: "cascade"
          });
          Users.hasMany(models.Budgets, {
            onDelete: "cascade"
          });
          Users.hasMany(models.Expenditures, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Users;