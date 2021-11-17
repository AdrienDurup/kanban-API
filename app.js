require("dotenv").config();
const express = require('express');
const cors=require("cors");
const { router } = require("./app/router");
const bodySanitizer = require("./app/middlewares/body-sanitizer");
//const session = require('express-session');

const port = process.env.OK_PORT;

const corsOptions={
    //origin:"file:///var/www/html/XIII/s06/okanban/oKanBanFront/"
}

const app = express();

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodySanitizer);

app.use(router);



app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
