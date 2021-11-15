/* Contient toutes les options pour les requetes sequelize */
const options = {
    "List": {
        findOrCreate: false,
        findAll: {
            include: {
                association: 'cards',
                include: {
                    association: 'labels'
                }
            },
            order: [
                ['position', 'ASC'],
                ['cards', 'position', 'ASC']
            ]
        },
        findOne: {
            include: {
                association: 'cards',
                include: {
                    association: 'labels'
                }
            },
            order: [
                ['cards', 'position', 'ASC']
            ]
        },
    },
    "Card": {
        findOrCreate: false,
        findAll: {
            include: ['list', 'labels'],
            order: [
                ['position','ASC']
            ]
        },
        findOne: {
            include: 'labels'
        }
    },
    "Label": {
        findOrCreate: function (reqObj) {
            return {
                where: {
                    name: reqObj.name
                },
                defaults: reqObj
            };
        }
        ,
        findAll: {
            include: 'cards',
        },
        findOne: {
            include: 'cards',
        }
    }
}

module.exports = { options };