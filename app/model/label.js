const {
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require('../database');

class Label extends Model {};

Label.init({
    name: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    tableName: 'label',
});

module.exports = {Label};