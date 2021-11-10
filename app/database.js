//ce module va uniquement gérer la connexion à la BDD en passant par Sequelize

const {Sequelize} = require('sequelize');

//on instancie le client de connexion 
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        // on ajoute une propriété pour déactiver l'ajout automatique de 2 champs qu'on n'utilise pas dans notre projet :
        //- createdAt
        //- updatedAt
        // timestamps: false,
        underscored: true
    }
});

module.exports = sequelize;