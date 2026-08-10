import { StudentService } from "../services/app.service.js";

const studentService = new StudentService();

export class StudentController {
    async getStudents(req, res) {
        try {
            const students = await studentService.getStudents();

            return res.status(200).json({
                message: "Students returned successfully",
                students
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Failed to fetch students"
            })
        }
    }

    async getStudentById(req, res) {
        try {
            const { id } = req.params;

            if (Number.isNaN(Number(id))) {
                return res.status(400).json({
                    message: "Invalid ID"
                });
            }

            const student = await studentService.getStudentById(id);

            if (student === undefined) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            return res.status(200).json({
                message: "Student returned successfully",
                student
            });
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Failed to fetch student"
            });
        }
    }

    async createStudent(req, res) {
        try {
            const { name, course } = req.body;

            if (!name || !course) {
                return res.status(400).json({
                    message: "Please complete the fields"
                });
            }

            const student = await studentService.createStudent(name, course);
            return res.status(201).json({
                message: "Student created successfully",
                student
            });
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Failed to create student"
            });
        }
    }
}