# Student Management System

A simple full-stack Student Management System built using HTML, CSS, JavaScript, Python Flask, and SQLite. The project allows users to add, view, search, update, and delete student records through a simple web interface.

## Features

- Add new student records
- View all student records
- Search students by name or student ID
- Filter students by department
- Update student information
- Delete student records
- Basic form validation
- Display total number of students
- Store student information in a SQL database
- Simple and user-friendly interface

## Technologies Used

- HTML
- CSS
- JavaScript
- Python
- Flask
- SQLite

## Project Structure

Student-Management-System/

│

├── app.py

├── requirements.txt

├── .gitignore

├── README.md

│

├── templates/

│    └── index.html

│

├── static/

│    ├── style.css

│    └── script.js

│

└── database/

│    └── students.db

## How It Works

The frontend is created using HTML and CSS.

JavaScript handles user interactions such as adding, searching, updating, and deleting student records.

Python Flask is used as the backend to receive requests from the frontend and communicate with the database.

SQLite is used to store and manage student information.

## CRUD Operations

The application implements the four basic CRUD operations:

- Create - Add a new student
- Read - View student records
- Update - Edit existing student information
- Delete - Remove a student record

## Student Details

Each student record contains:

- Student ID
- Name
- Email
- Department
- Year

## How to Run

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Install Flask:

```bash
pip install flask
````

4. Run the application:

```bash
python app.py
```

5. Open the local URL displayed in the terminal in your web browser.

## What I Learned

* Creating web pages using HTML
* Styling webpages using CSS
* Handling user interactions using JavaScript
* Working with the JavaScript DOM
* Building a backend using Python Flask
* Connecting a web application with a SQL database
* Writing basic SQL queries
* Implementing CRUD operations
* Connecting frontend and backend

## Future Improvements

* Add student authentication
* Add attendance management
* Add student performance tracking
* Add advanced search and filtering
* Deploy the application online

## Author

**Suwetha S**
