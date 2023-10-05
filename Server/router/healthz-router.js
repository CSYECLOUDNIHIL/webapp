const express = require("express");
const healthzController = require('../controller/healthz-controller.js');
const assignmentController = require('../controller/assignment-controller.js');

const router = express.Router();

const queryParameter = async  (request,response,next) => {
    if (Object.keys(request.query).length > 0) {
        response.status(400).send();
      } else {
        next();
      }
}
 

router.route('/')
    .post(healthzController.post)
    .put(healthzController.update)
    .all(queryParameter)
    .patch(healthzController.update)
    .delete(healthzController.deleteRecord)
    .get(healthzController.index);

router.route('/v1/assignments')
    .post(assignmentController.post)
    .all(queryParameter)
    .get(assignmentController.index);

router.route('/v1/assignments/:id')
    .put(assignmentController.update)
    .all(queryParameter)
    .patch(assignmentController.updatenotallowed)
    .delete(assignmentController.deleteRecord)
    .get(assignmentController.getbyone);

module.exports = router;
