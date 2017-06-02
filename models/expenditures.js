// Users models (table)

// The Users has a Users_name attribute of type DataTypes.String
// and a devoured attribute that is false by default

module.exports = function(sequelize, DataTypes) {
  var Expenditures = sequelize.define("Expenditures", {
    expediture_id: {
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
    // budget_id:{
    //   type: DataTypes.UUID,
    // }
     date:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW },
    },
    amt_spent:{
      type: DataTypes.INTEGER,
    },
    {
      // We're saying that we want our category to have expenditures
    classRequired: {
        associate: function(models) {
          // An category (foreignKey) is required or an expenditure can't be made
          Expenditures.belongsTo(models.Categories, {
            foreignKey: {
              allowNull: false
    };
  return Expenditures;