const {
    Card
} = require('../models');

const cardController = {
    getAllInList: async (req, res) => {
        try {
            const listId = Number(req.params.id);

            // On récupère toutes les cartes ou list_id est egal à listId (valeur passé en param)
            const cards = await Card.findAll({
                where: {
                    list_id: listId
                },
                include: 'labels',
                order: [
                    ['position', 'ASC'],
                ]
            });

            // Et on retourne la valeur a l'utilisateur
            res.json(cards);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const cards = await Card.findAll({
                include: 'labels',
                order: [
                    ['position', 'ASC'],
                ]
            });

            res.json(cards);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    getOne: async (req, res) => {
        try {
            const cardId = Number(req.params.id);

            const card = await Card.findByPk(cardId, {
                include: 'labels',
                order: [
                    ['position', 'ASC'],
                ]
            });

            if (card) {
                res.json(card);
            } else {
                res.status(404).json(`Can't find card with id ${cardId}`)
            }
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    createOne: async (req, res) => {
        try {
            const {
                content,
                color,
                position,
            } = req.body;

            if (!name) {
                res.status(400).json('name cannot be empty');
            }

            const newCard = await Card.create({
                content,
                color,
                position,
            });

            res.json(newCard);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    updateOne: async (req, res) => {
        try {
            // Comme pour le GET je récupère une carde
            const cardId = Number(req.params.id);
            const card = await Card.findByPk(cardId);

            // Si je n'ai pas de carde, alors j'interrompt l'execution de la fonction
            if (!card) {
                return res.status(404).json(`Can't find card with id ${cardId}`)
            }

            // Comme pour le create je récupère les valeurs depuis le body de la requete
            const {
                content,
                color,
                position,
            } = req.body;

            // Si j'ai un nouveau nom je remplace au niveau de la carde
            if (content) card.content = content;
            if (color) card.color = color;
            // Idem pour la position
            if (position) card.position = position;

            // Et puis on sauvegarde ! 
            await card.save();

            res.json(card);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    deleteOne: async (req, res) => {
        try {
            // Comme pour le GET je récupère une carde
            const cardId = Number(req.params.id);
            const card = await Card.findByPk(cardId);

            // ET JE DESTROYYYy !!!! LA LISTE
            await card.destroy();
            res.json('OK');
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = cardController;