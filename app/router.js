const express = require("express");
const { listController, restController,cardController,labelController,cardHasLabelController } = require("./controller");
const router = express.Router();
//router.use(restController.getRoute);
// router.get("/rest/:object", restController.findAll);
// router.get("/rest/:object/:id",restController.findOne);
// router.post("/rest/:object/",restController.create);
// router.patch("/rest/:object/:id",restController.update);
// router.delete("/rest/:object/:id",restController.delete);

// router.get("/rest/:object", restController.create);

router.get("/lists", listController.findAll);
router.get("/lists/:id", listController.findOne);
router.post("/lists/", listController.create);
router.patch("/lists/:id", listController.update);
router.delete("/lists/:id", listController.delete);

router.get("/cards", cardController.findAll);
router.get("/cards/:id", cardController.findOne);
router.post("/cards/", cardController.create);
router.patch("/cards/:id", cardController.update);
router.delete("/cards/:id", cardController.delete);

router.get("/labels", labelController.findAll);
router.get("/labels/:id", labelController.findOne);
router.post("/labels/", labelController.create);
router.patch("/labels/:id", labelController.update);
router.delete("/labels/:id", labelController.delete);

router.post("/cardlabel/", cardHasLabelController.create);
router.delete("/cardlabel/:id", cardHasLabelController.delete);

module.exports = { router };