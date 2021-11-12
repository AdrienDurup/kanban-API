require('dotenv').config();

const {
    List,
    Card
} = require('./app/models');

const run = async () => {
    try {
        let lists = await List.findAll({
            include: [{
                association: 'cards',
                include: [{
                    association: 'labels'
                }]
            }]
        });

        lists.forEach((list) => {
            let str = `La liste ${list.name} contient les cartes : \n`;
            list.cards.forEach((card) => {
                str += `\t - "${card.content}" avec les labels : ${card.labels.map(label => `"${label.name}"`)}\n`;
            });
            console.log(str);
        })
    } catch (error) {
        console.trace(error);
    }
};


run();


// .map => Transformer des tableaux 
// const tab = [{
//     a: 11
// }, {
//     a: 15
// }];

// const tab2 = tab.map(elm => {
//     return { b: elm.a};
// });

// //tab -> [{ b: 11}, { b: 15}];