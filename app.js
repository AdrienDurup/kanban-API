require("dotenv").config();
const express = require('express');
const { router } = require("./app/router");
//const session = require('express-session');

const port = process.env.OK_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);



app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
