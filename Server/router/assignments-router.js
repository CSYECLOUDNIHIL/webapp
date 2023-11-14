const express = require("express");
const healthzController = require('../controller/healthz-controller.js');
const assignmentController = require('../controller/assignment-controller.js');
const { responseHeaders } = require('../response/response-methods.js');
const router = express.Router();

const queryParameter = async  (request,response,next) => {
    if (Object.keys(request.query).length > 0) {
        response.status(400).send();
      } else {
        next();
      }
}


const credentialsnoAuth = async  (request,response,next) => {
  if (!request.headers.authorization) {
      await responseHeaders(response);
      response.status(401).send();
    } else {
      next();
    }
}

router.route('/assignments')
    .post(assignmentController.post)
    .all(queryParameter)
    .all(credentialsnoAuth)
    .get(assignmentController.index);

router.route('/assignments/:id')
    .put(assignmentController.update)
    .all(queryParameter)
    .all(credentialsnoAuth)
    .patch(assignmentController.updatenotallowed)
    .delete(assignmentController.deleteRecord)
    .get(assignmentController.getbyone);

module.exports = router;
