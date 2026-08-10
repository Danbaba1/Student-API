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
}
