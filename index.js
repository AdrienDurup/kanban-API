const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors');
const router = require('./app/router');

const PORT = process.env.PORT || 5050;

const app = express();

// après avoir installer npm i cors
// on active le middleware pour y avoir accès de partout
app.use(cors()); // '*' -> Tous les domaines sont autorisés ! 

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const bodySanitizer = require('./app/middlewares/body-sanitizer');
app.use(bodySanitizer);

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} ...`);
})