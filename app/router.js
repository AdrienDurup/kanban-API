const express = require('express');
const listController = require('./controllers/listController');

const router = express.Router();

/* ICI */

router.get('/lists', listController.getAll);
router.get('/lists/:id', listController.getOne);
router.post('/lists', listController.createOne);
router.patch('/lists/:id', listController.updateOne);
router.delete('/lists/:id', listController.deleteOne);

module.exports = router;