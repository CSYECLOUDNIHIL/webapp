const express = require("express");
const healthzController = require('../controller/healthz-controller.js');
const assignmentController = require('../controller/assignment-controller.js');
const { responseHeaders } = require('../response/response-methods.js');
const validator = require('validator');




const router = express.Router();

const isGitHubRepositoryUrlValid = (request,response,next) => {
  const githubRepoRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/archive\/refs\/tags\/v\d+\.\d+\.\d+\.zip$/;
  if (githubRepoRegex.test(request.body.submission_url) == true) {
    return next();
  }
  else {
    response.status(400).send();
  } 
};

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


const urlCheck = async  (request,response,next) => {
  const url = request.body.submission_url;
  
  if (!(validator.isURL(url) && url.includes('github.com'))) {
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
    .post(queryParameter,credentialsnoAuth,idCheck,isGitHubRepositoryUrlValid,assignmentController.submissionPost)

module.exports = router;
