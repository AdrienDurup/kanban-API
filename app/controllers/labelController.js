const {
    Label,
    Card
} = require('../models');

const labelController = {
    getAll: async (req, res) => {
        try {
            const labels = await Label.findAll();

            res.json(labels);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    getOne: async (req, res) => {
        try {
            const labelId = Number(req.params.id);

            const label = await Label.findByPk(labelId);

            if (label) {
                res.json(label);
            } else {
                res.status(404).json(`Can't find label with id ${labelId}`)
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    createOne: async (req, res) => {
        try {
            const {
                name,
                color
            } = req.body;

            if (!name) {
                res.status(400).json('name cannot be empty');
            }

            const newLabel = await Label.create({
                name,
                color
            });

            res.json(newLabel);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    updateOne: async (req, res) => {
        try {
            // Comme pour le GET je récupère une labele
            const labelId = Number(req.params.id);
            const label = await Label.findByPk(labelId);

            // Si je n'ai pas de labele, alors j'interrompt l'execution de la fonction
            if (!label) {
                return res.status(404).json(`Can't find label with id ${labelId}`)
            }

            // Comme pour le create je récupère les valeurs depuis le body de la requete
            const {
                name,
                color
            } = req.body;

            // Si j'ai un nouveau nom je remplace au niveau de la labele
            if (name) label.name = name;
            // Idem pour la position
            if (color) label.color = color;

            // Et puis on sauvegarde ! 
            await label.save();

            res.json(label);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    deleteOne: async (req, res) => {
        try {
            // Comme pour le GET je récupère une labele
            const labelId = Number(req.params.id);
            const label = await Label.findByPk(labelId);

            // ET JE DESTROYYYy !!!! LA LISTE
            await label.destroy();
            res.json('OK');
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    associateToCard: async (req, res) => {
        try {
            // Quels params ? 
            const cardId = Number(req.params.id);
            const labelId = Number(req.body.label_id);

            // CARTE 
            let card = await Card.findByPk(cardId, {
                include: ['labels']
            });
            if (!card) {
                return res.status(404).json(`Can not find card with id ${cardId}`);
            }

            // LABEL 
            const label = await Label.findByPk(labelId);
            if (!label) {
                return res.status(404).json(`Can not find label with id ${labelId}`);
            }

            // On souhaite ajouter un label sur une carte

            // Magie de sequelize ! 
            await card.addLabel(label);

            // On doit récupérer a nouveau la carte pour voir la MaJ
            card = await Card.findByPk(cardId, {
                include: ['labels']
            });

            res.json(card);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    removeFromCard: async (req, res) => {
        try {
            const {
                card_id,
                label_id
            } = req.params;

            // CARTE 
            let card = await Card.findByPk(card_id, {
                include: ['labels']
            });
            if (!card) {
                return res.status(404).json(`Can not find card with id ${card_id}`);
            }

            // LABEL 
            const label = await Label.findByPk(label_id);
            if (!label) {
                return res.status(404).json(`Can not find label with id ${label_id}`);
            }

            // On souhaite ajouter un label sur une carte

            // Magie de sequelize ! 
            await card.removeLabel(label);

            // On doit récupérer a nouveau la carte pour voir la MaJ
            card = await Card.findByPk(card_id, {
                include: ['labels']
            });

            res.json(card);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = labelController;