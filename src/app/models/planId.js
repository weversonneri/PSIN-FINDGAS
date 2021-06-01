// eslint-disable-next-line
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlanId extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlanId.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  PlanId.init({
    preapproval_plan_id: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PlanId',
    tableName: 'plan_id',
  });
  return PlanId;
};
