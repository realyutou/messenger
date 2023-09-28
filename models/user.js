'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.Announcement, { foreignKey: 'userId' })
      User.belongsToMany(User, {
        through: models.Directory,
        foreignKey: 'hostId',
        as: 'Friends'
      })
      User.belongsToMany(User, {
        through: models.Directory,
        foreignKey: 'guestId',
        as: 'Hosts'
      })
      User.hasMany(models.Message, { foreignKey: 'userId' })
    }
  }
  User.init({
    email: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    introduction: DataTypes.STRING,
    text: DataTypes.STRING,
    birthday: DataTypes.STRING,
    gender: DataTypes.STRING,
    job: DataTypes.STRING,
    location: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
