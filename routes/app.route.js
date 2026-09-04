import { StudentController } from "../controllers/app.controller.js";
import express from 'express';

export function createRouter(studentController = new StudentController()) {
    const router = express.Router();

    router.get('/', studentController.getStudents.bind(studentController));
    router.get('/:id', studentController.getStudentById.bind(studentController));
    router.post('/', studentController.createStudent.bind(studentController));
    router.patch('/:id', studentController.updateStudent.bind(studentController));
    router.delete('/:id', studentController.deleteStudent.bind(studentController));

    return router;
}
