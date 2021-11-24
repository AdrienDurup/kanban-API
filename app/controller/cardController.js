const {Card} = require("../models");


const cardController = {
    findAll: async (req, res) => {
        console.log("test findall");
        try {
            let cards = await Card.findAll({
                include: ['list','labels']
            });
            console.log(cards);
            if(cards){
            res.json(cards);
            }else{
                res.status(404).json({error:"Aucune carte trouvée."});
            };
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    findOne: async (req, res) => {
        try {
        const id = req.params.id;
            let card = await Card.findByPk(id, {
                include:'labels'
            });
            console.log(card);
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    create: async (req, res) => {
        console.log("CREATE");
        try {
        const cardToCreate = req.body;
            let card = await Card.create(
                cardToCreate
            );
            console.log("CREATED ?", card);
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    update: async (req, res) => {
        try {
        const id = req.params.id;
        const data = req.body;
            let updateResult = await Card.update(data,
                {
                    where:{id}
                }
                );
            res.json(updateResult);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    delete: async (req, res) => {
        try {
        const id = req.params.id;
            let deleteInfo = await Card.destroy({
                where: {id}
            });
            res.json(deleteInfo);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
};


module.exports = {cardController};