import express from "express";
import * as healthzController from '../controller/healthz-controller.js';
import * as assignmentController from '../controller/assignment-controller.js';

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



export default router;