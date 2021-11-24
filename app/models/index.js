const List = require('./list');
const Card = require('./card');
const Label = require('./label');

// Les associations ...

// 1 LISTE -> N CARTES
List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'list_id'
});

Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id'
});

// N CARTES <-> N LABELS VIA card_has_label

Card.belongsToMany(Label, {
    as: 'labels',
    through: 'card_has_label',
    foreignKey: 'card_id',
    otherKey: 'label_id',
    timestamps: false,
});

Label.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_label',
    foreignKey: 'label_id',
    otherKey: 'card_id',
    timestamps: false,
});





module.exports = {
    List,
    Card,
    Label
};