import { StudentController } from "../controllers/app.controller.js";
import express from 'express';

const router = express.Router();

const studentController = new StudentController();

router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
router.post('/', studentController.createStudent);

export { router };
