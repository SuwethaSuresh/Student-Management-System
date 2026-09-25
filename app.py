from flask import Flask, render_template, request, jsonify
import sqlite3

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


# Home page
@app.route("/")
def home():
    return render_template("index.html")


# Get all students
@app.route("/api/students", methods=["GET"])
def get_students():

    connection = get_db_connection()

    students = connection.execute(
        "SELECT * FROM students"
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

    student_id = data["student_id"]
    name = data["name"]
    email = data["email"]
    department = data["department"]
    year = data["year"]

    connection = get_db_connection()

    try:

        connection.execute("""
            INSERT INTO students
            (student_id, name, email, department, year)
            VALUES (?, ?, ?, ?, ?)
        """, (student_id, name, email, department, year))

        connection.commit()
        connection.close()

        return jsonify({
            "message": "Student added successfully"
        })

    except sqlite3.IntegrityError:

        connection.close()

        return jsonify({
            "message": "Student ID already exists"
        }), 400


# Update a student
@app.route("/api/students/<student_id>", methods=["PUT"])
def update_student(student_id):

    data = request.get_json()

    name = data["name"]
    email = data["email"]
    department = data["department"]
    year = data["year"]

    connection = get_db_connection()

    connection.execute("""
        UPDATE students
        SET name = ?, email = ?, department = ?, year = ?
        WHERE student_id = ?
    """, (name, email, department, year, student_id))

    connection.commit()
    connection.close()

    return jsonify({
        "message": "Student updated successfully"
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
        "message": "Student deleted successfully"
    })


# Create database table when the program starts
create_table()


if __name__ == "__main__":
    app.run(debug=True)