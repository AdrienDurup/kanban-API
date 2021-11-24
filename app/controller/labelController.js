const { Label} = require("../models");


const labelController = {
    findAll: async (req, res) => {
        console.log("test findall");
        try {
            let labels = await Label.findAll({
                include: 'cards',
            });
            console.log(labels);
            res.json(labels);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    findOne: async (req, res) => {
        const id = req.params.id;
        try {
            let label = await Label.findByPk(id, {
                include:'cards',
            });
            console.log(label);
            res.json(label);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    create: async (req, res) => {
        console.log("CREATE");
        console.log(req.body.name);
        const labelToCreate = {
            name: req.body.name,
        }
        try {
            let label = await Label.findOrCreate(
                {
                    where: {
                        name: labelToCreate.name
                    },
                    defaults: labelToCreate
                }
            );
            console.log("CREATED ?", label[1]);
            res.json(label);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
            let updateResult = await Label.update(data,
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
            let deleteInfo = await Label.destroy({
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