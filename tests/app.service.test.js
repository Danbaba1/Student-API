import { StudentService } from '../services/app.service.js';

let studentService;

beforeEach(() => {
    studentService = new StudentService();
});

describe('it should return an array', () => {
    test('an array should be returned', async () => {
        const result = await studentService.getStudents();
        expect(result).toBeInstanceOf(Array);
    });
});

describe('it should return all the students', () => {
    test('all the students should be returned', async () => {
        const result = await studentService.getStudents();
        expect(result).toEqual([
            {
                "id": 1,
                "name": "Daniel",
                "course": "Computer Science"
            },
            {
                "id": 2,
                "name": "Sarah",
                "course": "Engineering"
            }
        ]);
    });
});

describe('it should return the correct student with an existing id', () => {
    test('the correct student with the existing id should be returned', async () => {
        const id = 1;
        const result = await studentService.getStudentById(id);
        expect(result).toEqual({
            "id": 1,
            "name": "Daniel",
            "course": "Computer Science"
        });
    });
});

describe('it should return undefined with a non-existing id', () => {
    test('undefined should be returned with a non-existing id', async () => {
        const id = 999;
        const result = await studentService.getStudentById(id);
        expect(result).toBeUndefined();
    });
});

describe('it should return the newly created student', () => {
    test('the newly created student should be returned', async () => {
        const name = "John";
        const course = "Physics";
        const newStudent = await studentService.createStudent(name, course);
        expect(newStudent).toEqual({
            "id": 3,
            "name": "John",
            "course": "Physics"
        });
    });
});

describe('it should update the students array with the new student', () => {
    test('the new student should be added to the array', async () => {
        const name = "John";
        const course = "Physics";
        const newStudent = await studentService.createStudent(name, course);
        const students = await studentService.getStudents();
        expect(students).toContain(newStudent);
    });
});

describe("it should return undefined when I try to update a student that doesn't exist", () => {
    test('should return undefined when trying to update a non-existent student', async () => {
        const id = 999;
        const studentData = { name: "John" };
        const updatedStudent = await studentService.updateStudent(studentData, id);
        expect(updatedStudent).toBeUndefined();
    });
});

describe("it should return the updated student when I update an existing student", () => {
    test('should return updated student when I update an existing student', async () => {
        const id = 1;
        const studentData = { name: "John", course: "Physics" }
        const updatedStudent = await studentService.updateStudent(studentData, id);
        const students = await studentService.getStudents();
        expect(students).toContain(updatedStudent);
        expect(updatedStudent).toEqual({
            "id": 1,
            "name": "John",
            "course": "Physics"
        });
    });
});

describe("it should return the updated student when I update only the name of an existing student", () => {
    test('should return updated student when I update only the name of an existing student', async () => {
        const id = 1;
        const studentData = { name: "John" }
        const student = await studentService.getStudentById(id);
        const updatedStudent = await studentService.updateStudent(studentData, id);
        const students = await studentService.getStudents();
        expect(students).toContain(updatedStudent);
        expect(updatedStudent).toEqual({
            "id": 1,
            "name": "John",
            "course": student.course
        });
    });
});

describe("it should return the updated student when I update only the course of an existing student", () => {
    test('should return updated student when I update only the course of an existing student', async () => {
        const id = 1;
        const studentData = { course: "Physics" }
        const student = await studentService.getStudentById(id);
        const updatedStudent = await studentService.updateStudent(studentData, id);
        const students = await studentService.getStudents();
        expect(students).toContain(updatedStudent);
        expect(updatedStudent).toEqual({
            "id": 1,
            "name": student.name,
            "course": "Physics"
        });
    });
});

describe('it should return undefined when deleting a non-existent student', () => {
    test('undefined should be returned when deleting a non-existent student', async () => {
        const id = 999;
        const deletedStudent = await studentService.deleteStudent(id);
        expect(deletedStudent).toBeUndefined();
    });
});

describe('it should delete an existing student and return the deleted student', () => {
    test('deleted student should be returned when deleting an existing student', async () => {
        const id = 1;
        const deletedStudent = await studentService.deleteStudent(id);
        const student = await studentService.getStudentById(id);
        const students = await studentService.getStudents();
        expect(students).toEqual([
            {
                "id": 2,
                "name": "Sarah",
                "course": "Engineering"
            }
        ]);
        expect(student).toBeUndefined();
        expect(deletedStudent).toEqual({
            "id": 1,
            "name": "Daniel",
            "course": "Computer Science"
        });
    });
});