import { jest } from '@jest/globals';

let consoleErrorSpy;

const getStudents = jest.fn();
const getStudentById = jest.fn();
const createStudent = jest.fn();
const updateStudent = jest.fn();
const deleteStudent = jest.fn();

beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });

    jest.clearAllMocks();
});

afterEach(() => {
    consoleErrorSpy.mockRestore();
});

jest.unstable_mockModule('../services/app.service.js', () => ({
    StudentService: jest.fn().mockReturnValue({
        getStudents,
        getStudentById,
        createStudent,
        updateStudent,
        deleteStudent
    })
}));

const { StudentController } = await import('../controllers/app.controller.js');

const createMockResponse = () => {
    const res = {};

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    return res;
}

test('should return all students', async () => {
    const students = [
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
    ];

    const controller = new StudentController();
    const res = createMockResponse();

    getStudents.mockResolvedValue(students);

    await controller.getStudents({}, res);

    expect(getStudents).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
        message: "Students returned successfully",
        students
    });
});

test('should return 500 when fetching students fails', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    getStudents.mockRejectedValue(new Error('Failed to fetch students'));

    await controller.getStudents({}, res);

    expect(getStudents).toHaveBeenCalled();

    expect(res.status).toBeCalledWith(500);

    expect(res.json).toBeCalledWith({
        message: "Failed to fetch students"
    });

});

test("should return the student when a valid existing id is provided", async () => {
    const student = {
        "id": 1,
        "name": "Daniel",
        "course": "Computer Science"
    };

    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        }
    }

    getStudentById.mockResolvedValue(student);

    await controller.getStudentById(req, res);

    expect(getStudentById).toHaveBeenCalledWith(1);

    expect(res.status).toBeCalledWith(200);

    expect(res.json).toBeCalledWith({
        message: "Student returned successfully",
        student
    });
});

test('should return 404 when student does not exist', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 999
        }
    }

    getStudentById.mockResolvedValue(undefined);

    await controller.getStudentById(req, res);

    expect(getStudentById).toHaveBeenCalledWith(999);

    expect(res.status).toBeCalledWith(404);

    expect(res.json).toBeCalledWith({
        message: "Student not found"
    });
});

test('should return 400 when id is invalid', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: "abc"
        }
    }

    await controller.getStudentById(req, res);

    expect(getStudentById).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Invalid ID"
    });
});

test('should return 500 when fetching student fails', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 0
        }
    }

    getStudentById.mockRejectedValue(new Error("Failed to fetch student"));

    await controller.getStudentById(req, res);

    expect(getStudentById).toHaveBeenCalledWith(0);

    expect(res.status).toBeCalledWith(500);

    expect(res.json).toBeCalledWith({
        message: "Failed to fetch student"
    });
});

test('should return 201 when a student is created', async () => {
    const student = {
        id: 3,
        name: "John",
        course: "Physics"
    }
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        body: {
            name: "John",
            course: "Physics"
        }
    }

    createStudent.mockResolvedValue(student);

    await controller.createStudent(req, res);

    expect(createStudent).toHaveBeenCalledWith(req.body.name, req.body.course);

    expect(res.status).toBeCalledWith(201);

    expect(res.json).toBeCalledWith({
        message: "Student created successfully",
        student
    });
});

test('should return 500 when creating student fails', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        body: {
            name: "John",
            course: "Physics"
        }
    }

    createStudent.mockRejectedValue(new Error("Failed to create student"));

    await controller.createStudent(req, res);

    expect(createStudent).toHaveBeenCalledWith(req.body.name, req.body.course);

    expect(res.status).toBeCalledWith(500);

    expect(res.json).toBeCalledWith({
        message: "Failed to create student"
    });
});

test('should return 400 when an incomplete field is provided', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        body: {
            name: "John"
        }
    }

    await controller.createStudent(req, res);

    expect(createStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Please complete the fields"
    });
});

test('should return 400 when there is a white-space', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        body: {
            name: " John",
            course: " Physics"
        }
    }

    await controller.createStudent(req, res);

    expect(createStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Please complete the fields"
    });
});

test('should return 200 for a successful update', async () => {
    const updatedStudent = {
        "id": 1,
        "name": "John",
        "course": "Computer Science"
    }

    const req = {
        params: {
            id: 1
        },
        body: {
            name: "John"
        }
    }

    const controller = new StudentController();
    const res = createMockResponse();

    updateStudent.mockResolvedValue(updatedStudent);

    await controller.updateStudent(req, res);

    expect(updateStudent).toHaveBeenCalledWith(req.body, req.params.id);

    expect(res.status).toBeCalledWith(200);

    expect(res.json).toBeCalledWith({
        message: "Student updated successfully",
        updatedStudent
    });
});

test('should return 400 when the ID is invalid', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: "abc"
        },
        body: {
            name: "John"
        }
    }

    await controller.updateStudent(req, res);

    expect(updateStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Invalid ID"
    });
});

test('should return 400 when the request body is undefined', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        }
    }

    await controller.updateStudent(req, res);

    expect(updateStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Bad request"
    });
});

test('should return 400 when the request body object is empty', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        },
        body: {

        }
    }

    await controller.updateStudent(req, res);

    expect(updateStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Bad request"
    });
});

test('should return 400 when the name contains leading/trailing whitespace', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        },
        body: {
            name: " John"
        }
    }

    await controller.updateStudent(req, res);

    expect(updateStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Bad request"
    });
});

test('should return 400 when the course contains leading/trailing whitespace', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        },
        body: {
            course: " Physics"
        }
    }

    await controller.updateStudent(req, res);

    expect(updateStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Bad request"
    });
});

test('should return 400 when the name is an empty string', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        },
        body: {
            name: ""
        }
    }

    await controller.updateStudent(req, res);

    expect(updateStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Bad request"
    });
});

test('should return 400 when the course contains is an empty string', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        },
        body: {
            course: ""
        }
    }

    await controller.updateStudent(req, res);

    expect(updateStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Bad request"
    });
});

test('should return 404 when the service returns undefined', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 999
        },
        body: {
            name: "John"
        }
    }

    updateStudent.mockResolvedValue(undefined);

    await controller.updateStudent(req, res);

    expect(updateStudent).toHaveBeenCalledWith(req.body, req.params.id);

    expect(res.status).toBeCalledWith(404);

    expect(res.json).toBeCalledWith({
        message: "Student not found"
    });
});

test('should return 500 when updateStudent rejects', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        },
        body: {
            name: "John"
        }
    }

    updateStudent.mockRejectedValue(new Error("Failed to update student"));

    await controller.updateStudent(req, res);

    expect(updateStudent).toHaveBeenCalledWith(req.body, req.params.id);

    expect(res.status).toBeCalledWith(500);

    expect(res.json).toBeCalledWith({
        message: "Failed to update student"
    });
});

test('should call updateStudent when id is 0 (not treated as invalid)', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 0
        },
        body: {
            name: "John"
        }
    }

    updateStudent.mockRejectedValue(new Error("Failed to update student"));

    await controller.updateStudent(req, res);

    expect(updateStudent).toHaveBeenCalledWith(req.body, req.params.id);

    expect(res.status).toBeCalledWith(500);

    expect(res.json).toBeCalledWith({
        message: "Failed to update student"
    });
});

test('should return 400 when deleting a student with an invalid ID', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: "abc"
        }
    }

    await controller.deleteStudent(req, res);

    expect(deleteStudent).not.toHaveBeenCalled();

    expect(res.status).toBeCalledWith(400);

    expect(res.json).toBeCalledWith({
        message: "Invalid ID"
    });
});

test('should return 404 when deleting student with a non-existing ID', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 999
        }
    }

    deleteStudent.mockResolvedValue(undefined);

    await controller.deleteStudent(req, res);

    expect(deleteStudent).toHaveBeenCalledWith(req.params.id);

    expect(res.status).toBeCalledWith(404);

    expect(res.json).toBeCalledWith({
        message: "Student not found"
    });
});

test('should return 200 when deleting a student with an existing ID', async () => {
    const student = {
        "id": 1,
        "name": "Daniel",
        "course": "Computer Science"
    }

    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        }
    }

    deleteStudent.mockResolvedValue(student);

    await controller.deleteStudent(req, res);

    expect(deleteStudent).toHaveBeenCalledWith(req.params.id);

    expect(res.status).toBeCalledWith(200);

    expect(res.json).toBeCalledWith({
        message: "Student deleted successfully",
        student
    });
});

test('should return 500 when deleting student fails', async () => {
    const controller = new StudentController();
    const res = createMockResponse();

    const req = {
        params: {
            id: 1
        }
    }

    deleteStudent.mockRejectedValue(new Error("Failed to delete student"));

    await controller.deleteStudent(req, res);

    expect(deleteStudent).toHaveBeenCalledWith(req.params.id);

    expect(res.status).toBeCalledWith(500);

    expect(res.json).toBeCalledWith({
        message: "Failed to delete student"
    });
});