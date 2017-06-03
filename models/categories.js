// Categories models (table)


module.exports = function(sequelize, DataTypes) {
  var Categories = sequelize.define("Categories", {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
      primaryKey: true,
      allowNull: false
    },
    // user_id:{
    //   type: DataTypes.UUID,
    // },
    description:{
      type: DataTypes.TEXT,
    },
     img_source:{
      type: DataTypes.STRING,
    },
    {
      // We're saying that we want our User to have categories
    classRequired: {
        associate: function(models) {
          // An User (foreignKey) is required or a category can't be made
          Categories.belongsTo(models.Users, {
            foreignKey: {
              allowNull: false
    },
    {
      // We're saying that we want our Categories to have budgets, expenditures
    classMethods: {
        associate: function(models) {
        // Each category will have only one budget
          // When an Categories is deleted, also delete any associated budgets
          Categories.hasOne(models.Budgets, {
            onDelete: "cascade"
          });
          //  Categories.hasMany(models.Expenditures, {
          //   onDelete: "cascade"
          // });
    
        }
      }
    }
  );
  return Categories;
