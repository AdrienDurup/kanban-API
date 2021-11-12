const { Model, DataTypes } = require("sequelize");
const sequelize=require("../database");

class Card extends Model { }

Card.init(
    {
        name: {
            type: DataTypes.STRING,

        },
        color:{
            type: DataTypes.STRING,

        },
        position:{
            type: DataTypes.INTEGER,

        }
    },
    {
        sequelize,
        tableName: 'card',
    }
);

module.exports = { Card };