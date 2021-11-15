const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const router = require('./app/router');

const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on ${PORT} ...`);
})