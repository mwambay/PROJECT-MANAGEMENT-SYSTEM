const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

router.get('/details/:id', projectController.detailsProjectFirst);
router.get('/details', projectController.detailsProjectSecand);
router.post('/add', projectController.addProject);
router.post('/add-task', projectController.addTask);
module.exports = router;