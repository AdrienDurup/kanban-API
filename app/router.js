const express = require("express");
const router = express.Router();
const { restController } = require("./controller/restController");

//router.use(restController.getRoute);
router.get("/rest/:object", restController.findAll);
router.get("/rest/:object/:id",restController.findOne);
router.post("/rest/:object/",restController.create);
router.patch("/rest/:object/:id",restController.update);
router.delete("/rest/:object/:id",restController.delete);

router.get("/lists", restController.findAll);
router.get("/lists/:id",restController.findOne);
router.post("/lists/",restController.create);
router.patch("/lists/:id",restController.update);
router.delete("/lists/:id",restController.delete);