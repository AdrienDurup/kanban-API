const {
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require('../db');

class Label extends Model {};

Label.init({
    name: DataTypes.TEXT,
    color: DataTypes.TEXT,
}, {
    sequelize,
    tableName: "label"
});

module.exports = Label;