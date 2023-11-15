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


const idCheck = async  (request,response,next) => {
  const id = request.params.id;
  if (id != id.trim()) {
      await responseHeaders(response);
      response.status(400).send();
    } else {
      next();
    }
}


router.route('/assignments')
    .post(queryParameter,credentialsnoAuth,assignmentController.post)
    .get(queryParameter,credentialsnoAuth,assignmentController.index);

router.route('/assignments/:id')
    .put(queryParameter,credentialsnoAuth,idCheck,assignmentController.update)
    .patch(queryParameter,credentialsnoAuth,idCheck,assignmentController.updatenotallowed)
    .delete(queryParameter,credentialsnoAuth,idCheck,assignmentController.deleteRecord)
    .get(queryParameter,credentialsnoAuth,idCheck,assignmentController.getbyone);

module.exports = router;
