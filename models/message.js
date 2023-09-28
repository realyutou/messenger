'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Message.init({
    text: DataTypes.STRING,
    time: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    roomId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages',
    underscored: true
  })
  return Message
}
