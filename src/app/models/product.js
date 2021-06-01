// eslint-disable-next-line
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.VendorData, {
        foreignKey: 'vendor_id',
      });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    vendor_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
  });
  return Product;
};
