// Importer le package
const {
    Sequelize
} = require('sequelize');

// Initaliser Sequelize

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true, // le snake_case au lieu du camelCase
        // timestamps: true,  // On peut supposer underscored + timestamps = deux champs created_at et updated_at

        // OU
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    logging: false,
});

module.exports = sequelize;