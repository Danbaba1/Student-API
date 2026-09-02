# Student API

## Project Description

This is a REST API used for managing student records. It is built with Node.js and Express.

## Features

### Get Students

- **Method:** `GET`
- **Endpoint:** `/students`
- **Response:**

```json
{
  "message": "Students returned successfully",
  "students": [...]
}
```

### Get Student By ID

- **Method:** `GET`
- **Endpoint:** `/students/:id`
- **Response:**

```json
{
  "message": "Student returned successfully",
  "student": {
    "id": 1,
    "name": "Daniel",
    "course": "Computer Science"
  }
}
```

### Create Student

- **Method:** `POST`
- **Endpoint:** `/students`
- **JSON Body:**

```json
{
  "name": "John",
  "course": "Physics"
}
```

- **Response:**

```json
{
  "message": "Student created successfully",
  "student": {
    "id": 3,
    "name": "John",
    "course": "Physics"
  }
}
```

### Update Student

- **Method:** `PATCH`
- **Endpoint:** `/students/:id`
- **JSON Body:**

```json
{
  "name": "John",
  "course": "Physics"
}
```

- **Response:**

```json
{
  "message": "Student updated successfully",
  "updatedStudent": {
    "id": 1,
    "name": "John",
    "course": "Physics"
  }
}
```

### Delete Student

- **Method:** `DELETE`
- **Endpoint:** `/students/:id`
- **Response:**

```json
{
  "message": "Student deleted successfully",
  "student": {
    "id": 1,
    "name": "Daniel",
    "course": "Computer Science"
  }
}
```

## Installation and Setup

- Clone the GitHub repository: `git clone https://github.com/Danbaba1/Student-API.git`
- Enter the directory: `cd Student-API`
- Install the dependencies: `npm install`
- Start the server: `npm run dev`
- The API will run at: `http://localhost:3000/students`

## Testing

- To run the test: `npm test`
- To run the test coverage: `npm test -- --coverage`
  | Category | Statements | Branches | Functions | Lines |
  |-------------|:----------:|:--------:|:---------:|:-----:|
  | All files | 100% | 100% | 100% | 100% |
  | controllers | 100% | 100% | 100% | 100% |
  | services | 100% | 100% | 100% | 100% |

  | Metric      |        Result        |
  | ----------- | :------------------: |
  | Test Suites |  2 passed / 2 total  |
  | Tests       | 44 passed / 44 total |
