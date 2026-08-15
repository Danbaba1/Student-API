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
