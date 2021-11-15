const options = {
    "List": {
        findOrCreate: false,
        findAll: {
            include: [{
                association: 'cards',
                include: [{
                    association: 'labels'
                }]
            }]
        },
        findOne: {
            include: [{
                association: 'cards',
                include: [{
                    association: 'labels'
                }]
            }]
        },
    },
    "Card": {
        findOrCreate: false,
        findAll: {
            include: ['list', 'labels']
        },
        findOne: {
            include: 'labels'
        }
    },
    "Label": {
        findOrCreate: function (reqObj) {
          return  {
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