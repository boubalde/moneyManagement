// budgets models (table)


module.exports = function(sequelize, DataTypes) {
  var Budgets = sequelize.define("Budgets", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false
    },
    // category_id:{
    //   type: DataTypes.UUID,
    // },
    //  user_id:{
    //   type: DataTypes.UUID,
    // },
     start_date:{
      type: DataTypes.DATE,
    },
     end_date:{
      type: DataTypes.DATE,
    },
    amt_budgeted:{
      type: DataTypes.INTEGER,
    }

   
      // We're saying that we want our category to have a budget
   classRequired: {
      associate: function(models) {
          // An category (foreignKey) is required or a budget can't be made
          Budgets.belongsTo(models.Categories, {
            foreignKey: {
              allowNull: false
            },

  
      // We're saying that we want our Budgets to have expenditures, expenditures
  classMethods: {
        associate: function(models) {
          // Associating Budgets with expenditures
          // When an Budgets is deleted, also delete any associated expenditures
                Budgets.hasMany(models.Expenditures, {
            onDelete: "cascade"
          });
        
      }
    }
  
};
return Budgets;