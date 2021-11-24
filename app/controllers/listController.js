const {
    List
} = require('../models');

const listController = {
    getAll: async (req, res) => {
        try {
            const lists = await List.findAll({
                include: {
                    association: 'cards',
                    include: ['labels']
                },
                order: [
                    ['position', 'ASC'],
                    ['cards', 'position', 'ASC']
                ]
            });

            res.json(lists);
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    getOne: async (req, res) => {
        try {
            const listId = Number(req.params.id);

            const list = await List.findByPk(listId, {
                include: {
                    association: 'cards',
                    include: ['labels']
                },
                order: [
                    ['cards', 'position', 'ASC']
                ]
            });

            if (list) {
                res.json(list);
            } else {
                res.status(404).json(`Can't find list with id ${listId}`)
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
                position
            } = req.body;

            if (!name) {
                res.status(400).json('name cannot be empty');
            }

            const newList = await List.create({
                name,
                position
            });

            res.json(newList);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    updateOne: async (req, res) => {
        try {
            // Comme pour le GET je récupère une liste
            const listId = Number(req.params.id);
            const list = await List.findByPk(listId);

            // Si je n'ai pas de liste, alors j'interrompt l'execution de la fonction
            if (!list) {
                return res.status(404).json(`Can't find list with id ${listId}`)
            }

            // Comme pour le create je récupère les valeurs depuis le body de la requete
            const {
                name,
                position
            } = req.body;

            // Si j'ai un nouveau nom je remplace au niveau de la liste
            if (name) list.name = name;
            // Idem pour la position
            if (position) list.position = position;

            // Et puis on sauvegarde ! 
            await list.save();

            res.json(list);

        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    },
    deleteOne: async (req, res) => {
        try {
            // Comme pour le GET je récupère une liste
            const listId = Number(req.params.id);
            const list = await List.findByPk(listId);

            // ET JE DESTROYYYy !!!! LA LISTE
            await list.destroy();
            res.json('OK');
        } catch (error) {
            console.trace(error);
            res.status(500).json(error.toString());
        }
    }
};

module.exports = listController;