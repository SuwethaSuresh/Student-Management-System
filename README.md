# Student Management System

A beginner-friendly full-stack Student Management System developed using **HTML, CSS, JavaScript, Python Flask, and SQLite**.

The application allows users to add, view, search, update, and delete student records through a simple web interface. Student data is stored permanently in an SQLite database.

## Features

- Add new students
- View all students
- Search students by name or Student ID
- Filter students by department
- Edit student details
- Delete student records
- Prevent duplicate Student IDs
- Validate student input
- Frontend and backend validation
- Dashboard showing:
  - Total Students
  - ECE Students
  - CSE Students
  - IT Students
- SQLite database for data storage
- REST-style API endpoints using Flask
- User-friendly success and error messages
- Responsive and simple user interface

## Technologies Used

- **HTML** – Structure of the web page
- **CSS** – Styling and responsive design
- **JavaScript** – Frontend functionality and API communication
- **Python** – Backend programming
- **Flask** – Python web framework
- **SQLite** – Database
- **Git** – Version control
- **GitHub** – Source code management

## Project Structure

    Student-Management-System/
    │
    ├── app.py
    ├── requirements.txt
    ├── README.md
    ├── .gitignore
    ├── students.db
    │
    ├── templates/
    │   └── index.html
    │
    ├── static/
    │   ├── style.css
    │   └── script.js
    │
    └── venv/

> `students.db` is automatically created when the application runs and is excluded from Git using `.gitignore`.

> `venv/` contains the Python virtual environment and is also excluded from Git.

## How the Application Works

The application follows a simple full-stack flow:

    User
      ↓
    HTML + CSS + JavaScript
      ↓
    JavaScript fetch() API requests
      ↓
    Flask Backend
      ↓
    SQLite Database

### Application Flow

1. The user enters student details in the web form.
2. JavaScript performs basic frontend validation.
3. JavaScript sends the data to the Flask backend using `fetch()`.
4. Flask validates the received data again.
5. Flask stores the student information in the SQLite database.
6. The backend sends a JSON response.
7. JavaScript updates the student list and dashboard.

## CRUD Operations

The application implements the four basic CRUD operations:

| Operation | Description |
|---|---|
| Create | Add a new student |
| Read | View all student records |
| Update | Edit existing student details |
| Delete | Remove a student record |

## Student Details

Each student record contains:

- Student ID
- Name
- Email
- Department
- Year

Supported departments:

- ECE
- CSE
- IT
- EEE
- MECH

Supported years:

- 1st Year
- 2nd Year
- 3rd Year
- 4th Year

## Database

The application uses **SQLite** to store student information.

The database contains a `students` table with the following columns:

| Column | Description |
|---|---|
| student_id | Unique Student ID |
| name | Student name |
| email | Student email address |
| department | Student department |
| year | Student year |

The Student ID is used as the **primary key**, which prevents duplicate student records.

## API Endpoints

The Flask backend provides the following API endpoints:

### Get All Students

    GET /api/students

Returns all student records from the database.

### Add Student

    POST /api/students

Adds a new student to the database.

### Update Student

    PUT /api/students/<student_id>

Updates the details of an existing student.

### Delete Student

    DELETE /api/students/<student_id>

Deletes a student record from the database.

## Validation

The application performs validation on both the frontend and backend.

Validation includes:

- Required fields
- Valid Student ID format
- Valid student name
- Valid email address
- Valid department
- Valid year
- Duplicate Student ID checking

Backend validation is used as an additional layer of protection even if frontend validation is bypassed.

## How to Run the Project

### 1. Clone the Repository

    git clone <your-github-repository-url>

### 2. Open the Project Folder

    cd Student-Management-System

### 3. Create a Virtual Environment

    python -m venv venv

### 4. Activate the Virtual Environment

For Windows PowerShell:

    .\venv\Scripts\activate

### 5. Install Required Packages

    pip install -r requirements.txt

### 6. Run the Flask Application

    python app.py

### 7. Open the Application

Open the following address in your browser:

    http://127.0.0.1:5000

The SQLite database `students.db` will be created automatically when the application starts.

## What I Learned

Through this project, I learned:

- How to build a basic full-stack web application
- HTML form creation
- CSS styling and responsive design
- JavaScript DOM manipulation
- JavaScript `fetch()` and API communication
- Python Flask backend development
- Creating Flask routes
- Handling GET, POST, PUT, and DELETE requests
- Working with JSON data
- Connecting Python with SQLite
- Writing SQL queries
- Implementing CRUD operations
- Input validation
- Error handling
- Using Git for version control
- Managing a project using GitHub

## Future Improvements

The project can be further improved by adding:

- Student login and authentication
- Admin dashboard
- Pagination
- Sorting student records
- Export student data to CSV
- Attendance management
- Marks management
- Profile photo upload
- More advanced dashboard statistics

## Author

**Suwetha S**
