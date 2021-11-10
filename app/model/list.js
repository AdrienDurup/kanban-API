const { Model, DataTypes } = require("sequelize");
const sequelize=require('../database');

class List extends Model { }

List.init(
    {
        name: {
            type: DataTypes.STRING,

        }
    },
    {
        sequelize,
        tableName: 'list',
    }
);

module.exports = { List };