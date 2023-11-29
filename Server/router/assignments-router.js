const express = require("express");
const healthzController = require('../controller/healthz-controller.js');
const assignmentController = require('../controller/assignment-controller.js');
const { responseHeaders } = require('../response/response-methods.js');
const validator = require('validator');
const validUrl = require('valid-url');
const fetch = require('node-fetch');


const router = express.Router();

const isURLValid = async  (request,response,next) => {
  const url = request.body.submission_url.split('.');
  const fileName = url[url.length - 1];
  try {
    const validURL = await fetch(request.body.submission_url)
    if (validURL.ok == true && fileName === 'zip') {
      next();
    } else {
      response.status(400).send();
    }

  }
  catch(error) {
    response.status(400).send();
  } 

}

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


router.route('/assignments/:id/submission')
    .post(queryParameter,credentialsnoAuth,idCheck,isURLValid,assignmentController.submissionPost)
    .delete(queryParameter,credentialsnoAuth,idCheck,isURLValid,assignmentController.submissionPost)
    .patch(queryParameter,credentialsnoAuth,idCheck,isURLValid,assignmentController.submissionPost)
    .put(queryParameter,credentialsnoAuth,idCheck,isURLValid,assignmentController.submissionPost)
    .get(queryParameter,credentialsnoAuth,idCheck,isURLValid,assignmentController.submissionPost)

module.exports = router;
