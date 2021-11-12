require("dotenv").config();
const express = require('express');
//const session = require('express-session');

const app = express();
const port = process.env.OK_PORT;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.use(async (req, res, next) => {
    const {
        List,
        Card,
        Label
    } = require("./app/model");
    const myList = await List.findByPk(1);
    console.log(myList);
    next();
});