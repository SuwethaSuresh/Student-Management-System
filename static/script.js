let students = [];

let editingStudentId = null;


// Load students when page opens

loadStudents();


// Show message

function showMessage(message, type) {

    let messageBox = document.getElementById("message");

    messageBox.innerText = message;

    messageBox.style.display = "block";


    if (type === "success") {

        messageBox.style.backgroundColor = "#d4edda";

        messageBox.style.color = "#155724";

    }

    else {

        messageBox.style.backgroundColor = "#f8d7da";

        messageBox.style.color = "#721c24";

    }


    setTimeout(function() {

        messageBox.style.display = "none";

    }, 3000);

}


// Load students from Python

function loadStudents() {

    fetch("/api/students")

        .then(function(response) {

            return response.json();

        })

        .then(function(data) {

            students = data;

            displayStudents();

            updateDashboard();

        })

        .catch(function(error) {

            showMessage("Could not load students.", "error");

        });

}


// Add or update student

document.getElementById("studentForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        let studentId =
            document.getElementById("studentId").value.trim();

        let name =
            document.getElementById("name").value.trim();

        let email =
            document.getElementById("email").value.trim();

        let department =
            document.getElementById("department").value;

        let year =
            document.getElementById("year").value;


        // Frontend validation

        if (studentId === "") {

            showMessage("Student ID is required.", "error");

            return;

        }


        if (name === "") {

            showMessage("Name is required.", "error");

            return;

        }


        if (email === "") {

            showMessage("Email is required.", "error");

            return;

        }


        if (department === "") {

            showMessage("Please select a department.", "error");

            return;

        }


        if (year === "") {

            showMessage("Please select a year.", "error");

            return;

        }


        let studentData = {

            student_id: studentId,

            name: name,

            email: email,

            department: department,

            year: year

        };


        if (editingStudentId !== null) {

            updateStudent(studentData);

        }

        else {

            addStudent(studentData);

        }

    }
);


// Add student

function addStudent(studentData) {

    fetch("/api/students", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(studentData)

    })

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        if (data.message === "Student added successfully.") {

            showMessage(data.message, "success");

            document.getElementById("studentForm").reset();

            loadStudents();

        }

        else {

            showMessage(data.message, "error");

        }

    })

    .catch(function(error) {

        showMessage("Something went wrong.", "error");

    });

}


// Display students

function displayStudents() {

    let tableBody =
        document.getElementById("studentTableBody");

    tableBody.innerHTML = "";


    let searchText =
        document.getElementById("searchInput").value.toLowerCase();


    let department =
        document.getElementById("filterDepartment").value;


    for (let i = 0; i < students.length; i++) {

        let student = students[i];


        let name =
            student.name.toLowerCase();

        let studentId =
            student.student_id.toLowerCase();


        let matchesSearch =
            name.includes(searchText) ||
            studentId.includes(searchText);


        let matchesDepartment =
            department === "" ||
            student.department === department;


        if (matchesSearch && matchesDepartment) {

            let row = document.createElement("tr");


            addCell(row, student.student_id);

            addCell(row, student.name);

            addCell(row, student.email);

            addCell(row, student.department);

            addCell(row, student.year);


            let actionCell = document.createElement("td");


            let editButton = document.createElement("button");

            editButton.innerText = "Edit";

            editButton.className = "edit-button";

            editButton.onclick = function() {

                editStudent(student.student_id);

            };


            let deleteButton = document.createElement("button");

            deleteButton.innerText = "Delete";

            deleteButton.className = "delete-button";

            deleteButton.onclick = function() {

                deleteStudent(student.student_id);

            };


            actionCell.appendChild(editButton);

            actionCell.appendChild(deleteButton);


            row.appendChild(actionCell);

            tableBody.appendChild(row);

        }

    }

}


// Add a cell to a table row

function addCell(row, value) {

    let cell = document.createElement("td");

    cell.innerText = value;

    row.appendChild(cell);

}


// Edit student

function editStudent(studentId) {

    for (let i = 0; i < students.length; i++) {

        if (students[i].student_id === studentId) {

            document.getElementById("studentId").value =
                students[i].student_id;

            document.getElementById("name").value =
                students[i].name;

            document.getElementById("email").value =
                students[i].email;

            document.getElementById("department").value =
                students[i].department;

            document.getElementById("year").value =
                students[i].year;


            editingStudentId = studentId;


            document.getElementById("studentId").disabled = true;


            document.getElementById("formTitle").innerText =
                "Edit Student";


            document.getElementById("submitButton").innerText =
                "Update Student";


            document.getElementById("cancelButton").style.display =
                "block";


            window.scrollTo(0, 0);


            break;

        }

    }

}


// Update student

function updateStudent(studentData) {

    fetch("/api/students/" + editingStudentId, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(studentData)

    })

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        if (data.message === "Student updated successfully.") {

            showMessage(data.message, "success");

            cancelEdit();

            loadStudents();

        }

        else {

            showMessage(data.message, "error");

        }

    })

    .catch(function(error) {

        showMessage("Something went wrong.", "error");

    });

}


// Delete student

function deleteStudent(studentId) {

    let answer = confirm(
        "Are you sure you want to delete this student?"
    );


    if (answer === false) {

        return;

    }


    fetch("/api/students/" + studentId, {

        method: "DELETE"

    })

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        showMessage(data.message, "success");

        loadStudents();

    })

    .catch(function(error) {

        showMessage("Could not delete student.", "error");

    });

}


// Cancel editing

function cancelEdit() {

    editingStudentId = null;


    document.getElementById("studentForm").reset();


    document.getElementById("studentId").disabled = false;


    document.getElementById("formTitle").innerText =
        "Add Student";


    document.getElementById("submitButton").innerText =
        "Add Student";


    document.getElementById("cancelButton").style.display =
        "none";

}


// Update dashboard

function updateDashboard() {

    let total = students.length;

    let eceCount = 0;

    let cseCount = 0;

    let itCount = 0;


    for (let i = 0; i < students.length; i++) {

        if (students[i].department === "ECE") {

            eceCount++;

        }


        if (students[i].department === "CSE") {

            cseCount++;

        }


        if (students[i].department === "IT") {

            itCount++;

        }

    }


    document.getElementById("totalStudents").innerText =
        total;

    document.getElementById("eceStudents").innerText =
        eceCount;

    document.getElementById("cseStudents").innerText =
        cseCount;

    document.getElementById("itStudents").innerText =
        itCount;

}