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
  "student":
    {
      "id":1, 
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

## Installation and Setup
- Clone the GitHub repository: `git clone https://github.com/Danbaba1/Student-API.git`
- Enter the directory: `cd Student-API`
- Install the dependencies: `npm install`
- Start the server: `npm run dev`
- The API will run at: `localhost:3000/students`
