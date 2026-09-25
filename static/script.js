let students = [];

let editingStudentId = null;


// Load students when page opens

loadStudents();


// Get students from Python

function loadStudents() {

    fetch("/api/students")

        .then(function(response) {

            return response.json();

        })

        .then(function(data) {

            students = data;

            displayStudents();

            updateDashboard();

        });

}


// Add or update student

document.getElementById("studentForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        let studentId =
            document.getElementById("studentId").value;

        let name =
            document.getElementById("name").value;

        let email =
            document.getElementById("email").value;

        let department =
            document.getElementById("department").value;

        let year =
            document.getElementById("year").value;


        let studentData = {

            student_id: studentId,

            name: name,

            email: email,

            department: department,

            year: year

        };


        // If editing

        if (editingStudentId !== null) {

            updateStudent(studentData);

        }

        // If adding

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

        alert(data.message);

        if (data.message === "Student added successfully") {

            document.getElementById("studentForm").reset();

            loadStudents();

        }

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


            row.innerHTML = `

                <td>${student.student_id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.department}</td>

                <td>${student.year}</td>

                <td>

                    <button
                        class="edit-button"
                        onclick="editStudent('${student.student_id}')">

                        Edit

                    </button>


                    <button
                        class="delete-button"
                        onclick="deleteStudent('${student.student_id}')">

                        Delete

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        }

    }

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

        alert(data.message);

        cancelEdit();

        loadStudents();

    });

}


// Delete student

function deleteStudent(studentId) {

    let answer =
        confirm("Are you sure you want to delete this student?");


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

        alert(data.message);

        loadStudents();

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

    document.getElementById("totalStudents").innerText =
        students.length;


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


    document.getElementById("eceStudents").innerText =
        eceCount;


    document.getElementById("cseStudents").innerText =
        cseCount;


    document.getElementById("itStudents").innerText =
        itCount;

}