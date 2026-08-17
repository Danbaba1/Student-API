export class StudentService {
    constructor() {
        this.students = [
            {
                id: 1,
                name: "Daniel",
                course: "Computer Science"
            },
            {
                id: 2,
                name: "Sarah",
                course: "Engineering"
            }
        ];
    }

    async getStudents() {
        return this.students;
    }

    async getStudentById(id) {
        const student = this.students.find((student) => Number(id) === student.id);
        return student;
    }

    async createStudent(name, course) {
        const id = this.students.length + 1;

        const student = { id, name, course };
        this.students.push(student);
        return student;
    }

    async updateStudent(studentData, id) {
        const student = await this.getStudentById(id);

        if (!student) {
            return undefined;
        }

        student.name = studentData.name ? studentData.name : student.name;
        student.course = studentData.course ? studentData.course : student.course;

        return student;
    }

    async deleteStudent(id) {
        const student = await this.getStudentById(id);

        if (!student) {
            return undefined;
        }

        const index = this.students.findIndex((student) => Number(id) === student.id);

        const deletedStudents = this.students.splice(index, 1);

        return deletedStudents[0];
    }
}
