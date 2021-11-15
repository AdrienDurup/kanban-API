const model = require("../models");
const { options } = require("./restController.options");

const restController = {
    getClass: (str) => {
        //on reconstruit le nom de classe cherché
        let name = str;
        const firstLetterUpper = name.slice(0, 1).toUpperCase();
        name = name.replace(/./, firstLetterUpper);
        //on récupère la classe
        console.log("myclass", name, model);
        const MyClass = model[name];
        return MyClass;
    },
    findAll: async (req, res) => {
        console.log("test findall");
        const objectName = req.params.object;
        /* on récupère la classe */
        const MyClass = restController.getClass(objectName);
        console.log(options);
        try {
            let cards = await MyClass.findAll(
                /* on fournit les options pour cette méthode pour la classe demandée, stockées dans le module "options" */
                options[MyClass.name].findAll
            );
            console.log(cards);
            res.json(cards);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
    findOne: async (req, res) => {
        const id = req.params.id;
        const objectName = req.params.object;
        /* on récupère la classe */
        const MyClass = restController.getClass(objectName);
        try {
            /* on fournit les options pour cette méthode pour la classe demandée, stockées dans le module "options" */
            let card = await MyClass.findByPk(id, options[MyClass.name].findOne);
            console.log(card);
            res.json(card);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            console.log("CREATE");
            const objectName = req.params.object;
            const MyClass = restController.getClass(objectName);
            /* cet objet contionedra le résultat de la requete Sequelize */
            let obj;
            /* on teste si MyClass doit faire findOrCreate plutot que create en vérifiant la définition de la méthode
             findOrCreate() dans les options de la classe */
            if(options[MyClass.name].findOrCreate){
                /* On génère l’objet d’options en fonction de req.body */
                const FOCOptions=options[MyClass.name].findOrCreate(req.body);
                obj = await MyClass.findOrCreate(FOCOptions);
            }else{
                obj = await MyClass.create(req.body);
            };
            console.log("CREATED ?", obj);
            res.json(obj);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const objectName = req.params.object;
            const MyClass = restController.getClass(objectName);
            let updateResult = await MyClass.update(data,
                {
                    where: { id }
                }
            );
            res.json(updateResult);
        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const objectName = req.params.object;
            const MyClass = restController.getClass(objectName);
            let deleteInfo = await MyClass.destroy({
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
    restController
};