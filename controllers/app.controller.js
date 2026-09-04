import { StudentService } from "../services/app.service.js";

export class StudentController {
    constructor(studentService = new StudentService()) {
        this.studentService = studentService;
    }

    async getStudents(req, res) {
        try {
            const students = await this.studentService.getStudents();

            return res.status(200).json({
                message: "Students returned successfully",
                students
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Failed to fetch students"
            });
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

            const student = await this.studentService.getStudentById(id);

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
            console.error(error);

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

            if (name !== name.trim() || course !== course.trim()) {
                return res.status(400).json({
                    message: "Please complete the fields"
                });
            }

            if (!(/^[a-zA-Z'-]+(\s[a-zA-Z'-]+)*$/.test(name))) {
                return res.status(400).json({
                    message: "Bad request"
                });
            }

            const student = await this.studentService.createStudent(name, course);
            return res.status(201).json({
                message: "Student created successfully",
                student
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Failed to create student"
            });
        }
    }

    async updateStudent(req, res) {
        try {
            const { id } = req.params;
            const studentData = req.body;

            if (Number.isNaN(Number(id))) {
                return res.status(400).json({
                    message: "Invalid ID"
                });
            }

            if (studentData === undefined) {
                return res.status(400).json({
                    message: "Bad request"
                });
            }

            if (Object.keys(studentData).length === 0) {
                return res.status(400).json({
                    message: "Bad request"
                });
            }

            if (studentData.name !== studentData.name?.trim() || studentData.course !== studentData.course?.trim()) {
                return res.status(400).json({
                    message: "Bad request"
                });
            }

            if (studentData.name === "" || studentData.course === "") {
                return res.status(400).json({
                    message: "Bad request"
                });
            }

            if (studentData.name !== undefined && !/^[a-zA-Z'-]+(\s[a-zA-Z'-]+)*$/.test(studentData.name)) {
                return res.status(400).json({
                    message: "Bad request"
                });
            }

            const updatedStudent = await this.studentService.updateStudent(studentData, id);

            if (!updatedStudent) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            return res.status(200).json({
                message: "Student updated successfully",
                updatedStudent
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Failed to update student"
            });
        }
    }

    async deleteStudent(req, res) {
        try {
            const { id } = req.params;

            if (Number.isNaN(Number(id))) {
                return res.status(400).json({
                    message: "Invalid ID"
                });
            }

            const student = await this.studentService.deleteStudent(id);

            if (student === undefined) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            return res.status(200).json({
                message: "Student deleted successfully",
                student
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                message: "Failed to delete student"
            });
        }
    }
}