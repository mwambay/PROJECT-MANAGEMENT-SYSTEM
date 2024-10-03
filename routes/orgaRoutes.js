const express = require('express');

const router = express.Router();

const orgaController = require('../controllers/orgaController');

router.get('/', orgaController.getWelcome);
router.get('/dashboard', orgaController.getDashboard);
router.get('/dashboard_member', orgaController.getDashboardMember);
router.get('/login', orgaController.getLogin);
router.post('/login_process', orgaController.postLoginProcess);
router.get('/join_orga', orgaController.getJoinOrga);
router.post('/login_as_member', orgaController.postLoginAsMember);
router.post('/login_as_admin', orgaController.postLoginAsAdmin);
router.get('/create_orga', orgaController.getCreateOrga);

module.exports = router;