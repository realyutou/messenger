'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Announcement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Announcement.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Announcement.init({
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Announcement',
    tableName: 'Announcements',
    underscored: true
  })
  return Announcement
}
