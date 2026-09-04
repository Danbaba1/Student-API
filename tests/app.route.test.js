import request from 'supertest';
import { StudentService } from '../services/app.service.js';
import { StudentController } from '../controllers/app.controller.js';
import { createRouter } from '../routes/app.route.js';
import { createApp } from '../app.js';

let studentService;
let app;

beforeEach(() => {
    studentService = new StudentService();
    const controller = new StudentController(studentService);
    const router = createRouter(controller);
    app = createApp(router);
});

describe('Students API Endpoints', () => {
    describe('GET /students', () => {
        it('should return an array of students and a 200 status', async () => {
            const response = await request(app).get('/students').expect('Content-Type', 'application/json; charset=utf-8');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.students)).toBe(true);
            expect(response.body.message).toBe('Students returned successfully');
            expect(response.body.students[0].name).toBe('Daniel');
        });
    });

    describe('POST /students', () => {
        it('should create a new student', async () => {
            const response = await request(app)
                .post('/students')
                .send({ name: 'Michael', course: 'History' });

            expect(response.status).toBe(201);
        });
    });

    describe('GET /students/:id', () => {
        it('should return 404 for a non-existent student', async () => {
            const id = 999;
            const response = await request(app).get(`/students/${id}`).expect('Content-Type', 'application/json; charset=utf-8');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Student not found');
        });
    });

    describe('PATCH /students/:id', () => {
        it('should return 200 for successful update', async () => {
            const id = 1;
            const response = await request(app)
                .patch(`/students/${id}`)
                .send({ name: "John" });

            expect(response.status).toBe(200);

            expect(response.body.message).toBe('Student updated successfully');

            expect(response.body.updatedStudent.name).toBe('John');
        });

        it('should return 404 for updating a non-existent student', async () => {
            const id = 999;
            const response = await request(app)
                .patch(`/students/${id}`)
                .send({ name: 'John' });

            expect(response.status).toBe(404);

            expect(response.body.message).toBe('Student not found');
        });
    });

    describe('DELETE /students', () => {
        it('should return 200 for successful delete', async () => {
            const id = 1;
            const response = await request(app)
                .delete(`/students/${id}`);

            const result = await request(app)
                .get(`/students/${id}`);

            expect(response.status).toBe(200);

            expect(result.body.message).toBe('Student not found');

            expect(response.body.message).toBe('Student deleted successfully');
        });

        it('should return 404 for deleting non-existent student', async () => {
            const id = 999;
            const response = await request(app)
                .delete(`/students/${id}`);

            expect(response.status).toBe(404);

            expect(response.body.message).toBe('Student not found');
        });
    });
});
