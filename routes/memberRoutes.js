const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');


router.get('/', memberController.getDashboard)

module.exports = router;
