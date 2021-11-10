const { Model, DataTypes } = require("sequelize");
const sequelize=require("../database");

class Card extends Model { }

Card.init(
    {
        name: {
            type: DataTypes.STRING,

        }
    },
    {
        sequelize,
        tableName: 'card',
    }
);

module.exports = { Card };