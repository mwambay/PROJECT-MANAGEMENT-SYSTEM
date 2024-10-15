const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController');

router.get('/details/:id', projectController.detailsProjectFirst);
router.get('/details', projectController.detailsProjectSecand);
router.post('/add', projectController.addProject);
router.post('/add-task', projectController.addTask);
router.get('/delete-task/:id', projectController.deleteTask)
router.get('/delete-project/:id', projectController.deleteProject)
router.get('/finish-task/:id', projectController.finishedTask);
router.get('/report-task/:id', projectController.reportTask)
router.post('/update/:id', projectController.updateProject)
router.post('/update-members/:id', projectController.addMembers)
router.get('/delete-from-project/:id', projectController.deleteMemberFromProject);


module.exports = router;