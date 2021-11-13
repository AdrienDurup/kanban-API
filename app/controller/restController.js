const {
    Card,
    Label,
    List
} = require("../models");


const restController = {
    getClassName:(str)=>{
            let name = str;
            const firstLetterUpper = name.slice(0, 1).toUpperCase();
            name = name.replace(/./, firstLetterUpper);
            return name;
    },
    // findAll: async (req, res) => {
    //     console.log("test findall");
    //     try {
    //         let cards = await Card.findAll({
    //             include: [{
    //                 association: 'cards',
    //                 include: [{
    //                     association: 'labels'
    //                 }]
    //             }]
    //         });
    //         console.log(cards);
    //         res.json(cards);
    //     } catch (error) {
    //         console.trace(error);
    //         res.json({error:error.message});
    //     }
    // },
    // findOne: async (req, res) => {
    //     const id = req.params.id;
    //     try {
    //         let card = await Card.findByPk(id, {
    //             include: [{
    //                 association: 'cards',
    //                 include: [{
    //                     association: 'labels'
    //                 }]
    //             }]
    //         });
    //         console.log(card);
    //         res.json(card);
    //     } catch (error) {
    //         console.trace(error);
    //         res.json({error:error.message});
    //     }
    // },
    create: async (req, res) => {
        console.log("CREATE");
        const objectName=req.params.object;
        let MyClass=class {};
        console.log(MyClass.constructor.name);
        Object.defineProperty(MyClass,"name",{value:restController.getClassName(objectName),writable:false});
        console.log(MyClass.constructor.name);
        console.log("test class : ",);
        console.log(req.body.name);
        const cardToCreate = {
            name: req.body.name,
        }
        try {
            let card = await Card.findOrCreate(
                {
                    where: {
                        name: cardToCreate.name
                    },
                    defaults: cardToCreate
                }
            );
            console.log("CREATED ?", card[1]);
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.json({error:error.message});
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
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
        const id = req.params.id;
        try {
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


module.exports = {
    restController
};