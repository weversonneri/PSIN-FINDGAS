// eslint-disable-next-line
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class VendorData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VendorData.belongsTo(models.User, {
        foreignKey: 'user_id',
      });

      VendorData.hasMany(models.Product, {
        foreignKey: 'vendor_id',
      });
    }
  }
  VendorData.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    latitude: {
      type: DataTypes.DECIMAL,
      defaultValue: '0',
    },
    longitude: {
      type: DataTypes.DECIMAL,
      defaultValue: '0',
    },
    user_id: DataTypes.INTEGER,
    gasprice: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'VendorData',
    tableName: 'vendor_data',
  });
  return VendorData;
};
