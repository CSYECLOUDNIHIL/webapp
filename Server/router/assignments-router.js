const express = require("express");
const healthzController = require('../controller/healthz-controller.js');
const assignmentController = require('../controller/assignment-controller.js');
const { responseHeaders } = require('../response/response-methods.js');
const fetch = require('node-fetch');


const router = express.Router();

const isURLValid = async  (request,response,next) => {
  try{
    const url = request.body.submission_url;
    const urlCheck = new URL(url);
    if ((urlCheck.protocol == 'http:' || urlCheck.protocol == 'https:') && urlCheck.pathname.endsWith('.zip')) {
      next();
    } else {
      response.status(400).send();
    }
  }
  catch(error) {
    response.status(400).send();
  }
}

const validateDate = async (request,response,next) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  const { deadline } = request.body;
  if(dateRegex.test(deadline)) {
    next()
  }
  else {
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
    .post(queryParameter,credentialsnoAuth,validateDate,assignmentController.post)
    .get(queryParameter,credentialsnoAuth,assignmentController.index);

router.route('/assignments/:id')
    .put(queryParameter,credentialsnoAuth,idCheck,validateDate,assignmentController.update)
    .patch(queryParameter,credentialsnoAuth,idCheck,assignmentController.updatenotallowed)
    .delete(queryParameter,credentialsnoAuth,idCheck,assignmentController.deleteRecord)
    .get(queryParameter,credentialsnoAuth,idCheck,assignmentController.getbyone);


router.route('/assignments/:id/submission')
    .post(queryParameter,credentialsnoAuth,idCheck,isURLValid,assignmentController.submissionPost)
    .delete(queryParameter,credentialsnoAuth,idCheck,assignmentController.updatenotallowed)
    .patch(queryParameter,credentialsnoAuth,idCheck,assignmentController.updatenotallowed)
    .put(queryParameter,credentialsnoAuth,idCheck,isURLValid,assignmentController.updatenotallowed)
    .get(queryParameter,credentialsnoAuth,idCheck,assignmentController.updatenotallowed)

module.exports = router;
