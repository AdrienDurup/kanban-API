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
            const result=await label.addCards(card_id);
            console.log("CREATED ? ",result);

            res.json(result);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            let deleteInfo = await Label.destroy({
                where: { id }
            });
            res.json(deleteInfo);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
};


module.exports = {
    cardHasLabelController
};