from flask import Flask, render_template, request, jsonify
import sqlite3
import re

app = Flask(__name__)


# Connect to the database
def get_db_connection():
    connection = sqlite3.connect("students.db")
    connection.row_factory = sqlite3.Row
    return connection


# Create the students table
def create_table():
    connection = get_db_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS students (
            student_id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            department TEXT NOT NULL,
            year INTEGER NOT NULL
        )
    """)

    connection.commit()
    connection.close()


# Check whether the email is valid
def is_valid_email(email):
    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    return re.match(pattern, email) is not None


# Check whether the student ID is valid
def is_valid_student_id(student_id):
    pattern = r"^[A-Za-z0-9]+$"
    return re.match(pattern, student_id) is not None


# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Get all students
@app.route("/api/students", methods=["GET"])
def get_students():

    connection = get_db_connection()

    students = connection.execute(
        "SELECT * FROM students ORDER BY student_id"
    ).fetchall()

    connection.close()

    student_list = []

    for student in students:

        student_list.append({
            "student_id": student["student_id"],
            "name": student["name"],
            "email": student["email"],
            "department": student["department"],
            "year": student["year"]
        })

    return jsonify(student_list)


# Add a student
@app.route("/api/students", methods=["POST"])
def add_student():

    data = request.get_json()

    student_id = data.get("student_id", "").strip()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    department = data.get("department", "").strip()
    year = data.get("year", "").strip()


    # Check empty fields
    if not student_id or not name or not email or not department or not year:

        return jsonify({
            "message": "All fields are required."
        }), 400


    # Validate Student ID
    if not is_valid_student_id(student_id):

        return jsonify({
            "message": "Student ID should contain only letters and numbers."
        }), 400


    # Validate name
    if not name.replace(" ", "").isalpha():

        return jsonify({
            "message": "Name should contain only letters."
        }), 400


    # Validate email
    if not is_valid_email(email):

        return jsonify({
            "message": "Please enter a valid email address."
        }), 400


    # Validate department
    departments = ["ECE", "CSE", "IT", "EEE", "MECH"]

    if department not in departments:

        return jsonify({
            "message": "Please select a valid department."
        }), 400


    # Validate year
    if year not in ["1", "2", "3", "4"]:

        return jsonify({
            "message": "Please select a valid year."
        }), 400


    connection = get_db_connection()

    try:

        connection.execute("""
            INSERT INTO students
            (student_id, name, email, department, year)
            VALUES (?, ?, ?, ?, ?)
        """, (
            student_id,
            name,
            email,
            department,
            int(year)
        ))

        connection.commit()
        connection.close()

        return jsonify({
            "message": "Student added successfully."
        })

    except sqlite3.IntegrityError:

        connection.close()

        return jsonify({
            "message": "Student ID already exists."
        }), 400


# Update a student
@app.route("/api/students/<student_id>", methods=["PUT"])
def update_student(student_id):

    data = request.get_json()

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    department = data.get("department", "").strip()
    year = data.get("year", "").strip()


    # Check empty fields
    if not name or not email or not department or not year:

        return jsonify({
            "message": "All fields are required."
        }), 400


    # Validate name
    if not name.replace(" ", "").isalpha():

        return jsonify({
            "message": "Name should contain only letters."
        }), 400


    # Validate email
    if not is_valid_email(email):

        return jsonify({
            "message": "Please enter a valid email address."
        }), 400


    # Validate department
    departments = ["ECE", "CSE", "IT", "EEE", "MECH"]

    if department not in departments:

        return jsonify({
            "message": "Please select a valid department."
        }), 400


    # Validate year
    if year not in ["1", "2", "3", "4"]:

        return jsonify({
            "message": "Please select a valid year."
        }), 400


    connection = get_db_connection()

    connection.execute("""
        UPDATE students
        SET name = ?, email = ?, department = ?, year = ?
        WHERE student_id = ?
    """, (
        name,
        email,
        department,
        int(year),
        student_id
    ))

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Student updated successfully."
    })


# Delete a student
@app.route("/api/students/<student_id>", methods=["DELETE"])
def delete_student(student_id):

    connection = get_db_connection()

    connection.execute(
        "DELETE FROM students WHERE student_id = ?",
        (student_id,)
    )

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Student deleted successfully."
    })


# Create the database table
create_table()


if __name__ == "__main__":
    app.run(debug=True)