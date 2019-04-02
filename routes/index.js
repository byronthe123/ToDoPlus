const express = require('express');
const jwt = require('express-jwt');
const jwkRsa = require('jwks-rsa');
const User = require('../models/User');
const notifier = require('node-notifier');
const path = require('path');
require('dotenv').config();

const router = express.Router();
const userController = require("../controller/userController");

// jwt
const checkJwt = jwt({
    secret: jwkRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI
    }),    // validate audience and issuer:
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    algorithms: ['RS256']
});

// all routes mapped against /api
router.route('/user')
    .post(userController.login);

router.route('/addProject')
    .post(checkJwt, userController.addProject);

router.route('/project/delete')
    .post(checkJwt, userController.deleteProject);

router.route('/project/update')
    .put(checkJwt, userController.updateProject);

router.route('/project/complete')
    .put(checkJwt, userController.completeProject);

router.route('/project/addTask')
    .post(checkJwt, userController.addTask);

router.route('/project/task/update')
    .put(checkJwt, userController.updateTask);

router.route('/project/task/delete')
    .post(checkJwt, userController.deleteTask);

router.route('/project/task/complete')
    .put(checkJwt, userController.completeTask);

router.route('/project/task/setDueDate')
    .put(checkJwt, userController.setTaskDueDate);

router.route('/project/task/addSubtask')
    .post(checkJwt, userController.addSubtask);

router.route('/project/task/subtask/update')
    .put(checkJwt, userController.updateSubtask);

router.route('/project/task/subtask/complete')
    .put(checkJwt, userController.completeSubtask);

router.route('/project/task/subtask/delete')
    .post(checkJwt, userController.deleteSubtask);

router.route('/project/task/updateEntryProductiveTime')
    .post(checkJwt, userController.updateEntryProductiveTime);

router.route('/profile/updateTodaysProductiveTime')
    .post(checkJwt, userController.updateTodaysProductiveTime);

router.route('/profile/setProductivityGoal')
    .post(checkJwt, userController.setProductivityGoal);

router.route('/profile/setWeeklyProductivityGoal')
    .post(checkJwt, userController.setWeeklyProductivityGoal);


module.exports = router;