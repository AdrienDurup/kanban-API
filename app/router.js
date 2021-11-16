const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const labelController = require('./controllers/labelController');

const router = express.Router();

/* Lists */

router.get('/lists', listController.getAll);
router.get('/lists/:id', listController.getOne);
router.post('/lists', listController.createOne);
router.patch('/lists/:id', listController.updateOne);
router.delete('/lists/:id', listController.deleteOne);

/* Cards */

router.get('/lists/:id/cards', cardController.getAllInList);
router.get('/cards', cardController.getAll);
router.get('/cards/:id', cardController.getOne);
router.post('/cards', cardController.createOne);
router.patch('/cards/:id', cardController.updateOne);
router.delete('/cards/:id', cardController.deleteOne);
router.post('/cards/:id/label', labelController.associateToCard);

router.get('/labels', labelController.getAll);
router.get('/labels/:id', labelController.getOne);
router.post('/labels', labelController.createOne);
router.patch('/labels/:id', labelController.updateOne);
router.delete('/labels/:id', labelController.deleteOne);

module.exports = router;