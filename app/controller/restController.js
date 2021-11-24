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
        try {
            const objectName = req.params.object;
            /* on récupère la classe */
            const MyClass = restController.getClass(objectName);
            if (!MyClass) {
                res.status(404).json(`"${objectName}" n’est pas un élément valide.`);
                return;
            };
            console.log(options);
            let object = await MyClass.findAll(
                /* on fournit les options pour cette méthode pour la classe demandée, stockées dans le module "options" */
                options[MyClass.name].findAll
            );
            if (object.length !== 0) {
                console.log(object);
                res.json(object);
            } else {
                res.status(404).json(`Aucun élément de type "${objectName}" dans la base de données.`);
                // res.status(404).json(errors[MyClass.name].findAll.e404);
            };

        } catch (error) {
            console.trace(error);
            res.json({ error: error.message });
        }
    },
    findOne: async (req, res) => {
        try {
            const id = req.params.id;
            const objectName = req.params.object;
            /* on récupère la classe */
            const MyClass = restController.getClass(objectName);
            if (!MyClass) {
                res.status(404).json(`"${objectName}" n’est pas un élément valide.`);
                return;
            };
            /* on fournit les options pour cette méthode pour la classe demandée, stockées dans le module "options" */
            let object = await MyClass.findByPk(id, options[MyClass.name].findOne);
            if (object) {
                console.log(object);
                res.json(object);
            } else {
                res.status(404).json(`Élément de type "${objectName}" introuvable.`);
            };
        } catch (error) {
            console.status(500).trace(error);
            res.json({ error: error.message });
        }
    },
    create: async (req, res) => {
        try {
            console.log("CREATE");
            const objectName = req.params.object;
            const MyClass = restController.getClass(objectName);

            /* On teste si la classe existe */
            if (!MyClass) {
                res.status(404).json(`"${objectName}" n’est pas un élément valide.`);
                return;
            };
            /* On teste si les champs requis sont présents */
            for (el of options[MyClass.name].required) {
                if (!req.body[el]) {
                    res.status(404).json(`le champ ${el} est requis pour la création d’un élément ${objectName}.`);
                    return;
                };
            };
            /* cet objet contiendra le résultat de la requete Sequelize */
            let obj;
            /* on teste si MyClass doit faire findOrCreate plutot que create en vérifiant la définition de la méthode
             findOrCreate() dans les options de la classe */
            if (options[MyClass.name].findOrCreate) {
                /* On génère l’objet d’options en fonction de req.body */
                const FOCOptions = options[MyClass.name].findOrCreate(req.body);
                obj = await MyClass.findOrCreate(FOCOptions);
            } else {
                obj = await MyClass.create(req.body);
            };
            console.log("CREATED ?", obj);
            res.json(obj);
        } catch (error) {
            console.trace(error);
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const objectName = req.params.object;
            /* on récupère la classe */
            const MyClass = restController.getClass(objectName);
            if (!MyClass) {
                res.status(404).json(`"${objectName}" n’est pas un élément valide.`);
                return;
            };
            let updateResult = await MyClass.update(data,
                {
                    where: { id }
                }
            );
            res.json(updateResult);
        } catch (error) {
            console.trace(error);
            res.status(500).json({ error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const objectName = req.params.object;
            /* on récupère la classe */
            const MyClass = restController.getClass(objectName);
            if (!MyClass) {
                res.status(404).json(`"${objectName}" n’est pas un élément valide.`);
                return;
            };
            let deleteInfo = await MyClass.destroy({
                where: { id }
            });
            res.json(deleteInfo);
        } catch (error) {
            console.trace(error);
            res.status(500).json({ error: error.message });
        }
    },
    createAssociation: async (req, res) => {
        try {
            /* On récupère les données des routes paramétrées : les class et les id */
            const sourceClass = restController.getClass(req.params.source);
            const targetClass = restController.getClass(req.params.target);
            /* On teste si les classes existent */
            if (!sourceClass || !targetClass) {
                res.status(404).json(`"${objectName}" n’est pas un élément valide.`);
                return;
            };
            const source_id = req.params.source_id;
            const target_id = req.params.target_id;
            // const sourceField=req.params.source;
            // const targetField=req.params.target;

            console.log(sourceClass);
            /* On récupère le nom de la méthode sequelize qui sert à vérifier si une association existe entre deux entrées de table */
            const hasMethodName = `has${targetClass.name}`;
            /* on récupère les deux objets nécessaires à l’association */
            let sourceObj = sourceClass.findByPk(source_id);
            let targetObj = targetClass.findByPk(target_id);
            [sourceObj, targetObj] = await Promise.all([sourceObj, targetObj]);
            /* si l’un des deux n’existe pas, 404 */
            if(!sourceObj||!targetObj){
                res.status(404).json(`Au moins un des éléments à associer n’est pas valide.`);
                return;
            }
            if (await sourceObj[hasMethodName](targetObj)) {//pour vérifier si une association existe via sequelize en utilisant la methode sequelize "hasNameoftheclasstocheck"
                console.log("ASSOCIATION EXISTS");
                throw new Error("ASSOCIATION EXISTS ALREADY");
            };
            /* on appelle la méthode dynamique */
            const addMethodName = `add${targetClass.name}`;//pour ajouter une associaton via sequelize en utilisant la methode sequelize "addNameoftheclasstoadd"
            /* on appelle la méthode dynamique */
            const result = await sourceObj[addMethodName](target_id);
            console.log("ASSOCIATION CREATED ? ", result);

            res.json(result);
        } catch (error) {
            console.trace("ERROR : " + error);
            res.status(500).json({ error: error.message });
        }
    },
    deleteAssociation: async (req, res) => {
        try {
            const sourceName=req.params.source;
            /* On récupère les données des routes paramétrées : les class et les id */
            const sourceClass = restController.getClass(req.params.source);
            const targetClass = restController.getClass(req.params.target);
            /* On teste si les classes existent */
            if (!sourceClass || !targetClass) {
                res.status(404).json(`Au moins un des types d’élément n’est pas valide.`);
                return;
            };
            const source_id = req.params.source_id;
            const target_id = req.params.target_id;
            const object1 = await sourceClass.findByPk(source_id);
            /* on teste si l’objet source existe */
            if (!object1) {
                res.status(404).json(`L’élément "${sourceName}" avec l’id ${source_id} n’est pas un élément valide.`);
                return;
            };
            const removeMethodName = `remove${targetClass.name}`;//pour supprimer une associaton via sequelize en utilisant la methode sequelize "removeNameoftheclasstoremove"
            /* on appelle la méthode dynamique */
            const result = await object1[removeMethodName](target_id);
            console.log("ASSOCIATION DESTROYED ? ", result);
            res.json(result);
        } catch (error) {
            console.trace(error);
            res.status(500).json({ error: error.message });
        }
    },
};


module.exports = {
    restController
};