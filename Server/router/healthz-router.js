const express = require("express");
const healthzController = require('../controller/healthz-controller.js');
const assignmentController = require('../controller/assignment-controller.js');

const router = express.Router();

router.route('/')
    .post(healthzController.post)
    .put(healthzController.update)
    .patch(healthzController.update)
    .delete(healthzController.deleteRecord)
    .get(healthzController.index);

router.route('/v1/assignments')
    .post(assignmentController.post)
    .get(assignmentController.index);

router.route('/v1/assignments/:id')
    .put(assignmentController.update)
    .patch(assignmentController.update)
    .delete(assignmentController.deleteRecord)
    .get(assignmentController.getbyone);

module.exports = router;
