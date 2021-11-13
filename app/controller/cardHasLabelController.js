const {
    Card,
    Label
} = require("../models");


const cardHasLabelController = {
    create: async (req, res) => {
        const label_id = req.body.label_id;
        const card_id = req.body.card_id;
        try {
            const label = await Label.findByPk(label_id);
            const result=await label.addCard(card_id);
            console.log("CREATED ? ",result);

            res.json(result);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const label_id = req.body.label_id;
        const card_id = req.body.card_id;
        try {
            const label = await Label.findByPk(label_id);
            const result=await label.removeCard(card_id);
            console.log("DESTROYED ? ",result);
            res.json(result);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
};


module.exports = {
    cardHasLabelController
};