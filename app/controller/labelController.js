const {
    Card,
    Label,
    List
} = require("../models");


const labelController = {
    findAll: async (req, res) => {
        console.log("test findall");
        try {
            let lists = await List.findAll({
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'labels'
                    }]
                }]
            });
            console.log(lists);
            res.json(lists);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    findOne: async (req, res) => {
        const id = req.params.id;
        try {
            let list = await List.findByPk(id, {
                include: [{
                    association: 'cards',
                    include: [{
                        association: 'labels'
                    }]
                }]
            });
            console.log(list);
            res.json(list);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    create: async (req, res) => {
        console.log("CREATE");
        console.log(req.body.name);
        const listToCreate = {
            name: req.body.name,
        }
        try {
            let list = await List.findOrCreate(
                {
                    where: {
                        name: listToCreate.name
                    },
                    defaults: listToCreate
                }
            );
            console.log("CREATED ?", list[1]);
            res.json(list);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
            let updateResult = await List.update(data,
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
        const id = req.params.id;
        try {
            let deleteInfo = await List.destroy({
                where: {id}
            });
            res.json(deleteInfo);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
};


module.exports = {
    labelController
};