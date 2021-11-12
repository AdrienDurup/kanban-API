const {
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require('../db');

class Card extends Model {};

Card.init({
    content: DataTypes.TEXT,
    color: DataTypes.TEXT,
    list_id: DataTypes.INTEGER,
    position: DataTypes.INTEGER
}, {
    sequelize,
    tableName: "card"
});

module.exports = Card;