let students = [];

let username = "";
let password = "";


// ================= REGISTER =================

function registerUser() {

    username =
        document.getElementById("registerUsername").value;

    password =
        document.getElementById("registerPassword").value;


    if (username === "" || password === "") {

        document.getElementById("registerMessage").innerText =
            "Please fill all fields.";

        return;
    }


    document.getElementById("registerMessage").innerText =
        "Registration Successful! Now Login.";


    document.getElementById("registerUsername").value = "";
    document.getElementById("registerPassword").value = "";


    showLogin();
}



// ================= LOGIN =================

function showLogin() {

    document.getElementById("registerBox").style.display =
        "none";

    document.getElementById("loginBox").style.display =
        "block";
}


function showRegister() {

    document.getElementById("loginBox").style.display =
        "none";

    document.getElementById("registerBox").style.display =
        "block";
}



function login() {

    let user =
        document.getElementById("loginUsername").value;

    let pass =
        document.getElementById("loginPassword").value;


    if (user === username && pass === password) {

        document.getElementById("authPage").style.display =
            "none";

        document.getElementById("dashboard").style.display =
            "block";

        showSection("studentSection");

        updateAgile();

    } else {

        document.getElementById("loginMessage").innerText =
            "Invalid Username or Password!";

    }
}



// ================= LOGOUT =================

function logout() {

    document.getElementById("dashboard").style.display =
        "none";

    document.getElementById("authPage").style.display =
        "flex";

    showLogin();
}



// ================= SECTIONS =================

function showSection(section) {

    let sections =
        document.querySelectorAll(".section");


    sections.forEach(function(item) {

        item.style.display = "none";

    });


    document.getElementById(section).style.display =
        "block";

}



// ================= ADD STUDENT =================

function addStudent() {

    let id =
        document.getElementById("studentId").value;

    let name =
        document.getElementById("studentName").value;

    let course =
        document.getElementById("studentCourse").value;

    let email =
        document.getElementById("studentEmail").value;


    if (id === "" ||
        name === "" ||
        course === "" ||
        email === "") {

        alert("Please fill all student details.");

        return;
    }


    students.push({

        id: id,
        name: name,
        course: course,
        email: email

    });


    alert("Student Added Successfully!");


    clearForm();

    displayStudents();

    updateAgile();

}



// ================= DISPLAY STUDENTS =================

function displayStudents() {

    let list =
        document.getElementById("studentList");


    list.innerHTML = "";


    students.forEach(function(student, index) {

        let card =
            document.createElement("div");


        card.className = "student-card";


        card.innerHTML = `

            <h3>👤 ${student.name}</h3>

            <p>
                <strong>ID:</strong>
                ${student.id}
            </p>

            <p>
                <strong>Course:</strong>
                ${student.course}
            </p>

            <p>
                <strong>Email:</strong>
                ${student.email}
            </p>


            <div class="card-buttons">

                <button
                    class="edit"
                    onclick="editStudent(${index})">

                    ✏️ Edit

                </button>


                <button
                    class="delete"
                    onclick="deleteStudent(${index})">

                    🗑️ Delete

                </button>

            </div>
        `;


        list.appendChild(card);

    });


    if (students.length === 0) {

        list.innerHTML =
            '<p class="empty">No students registered yet.</p>';

    }

}



// ================= EDIT =================

function editStudent(index) {

    let student = students[index];


    document.getElementById("studentId").value =
        student.id;

    document.getElementById("studentName").value =
        student.name;

    document.getElementById("studentCourse").value =
        student.course;

    document.getElementById("studentEmail").value =
        student.email;


    students.splice(index, 1);


    displayStudents();

    updateAgile();


    alert(
        "Student details loaded. Click Add Student to save changes."
    );

}



// ================= DELETE =================

function deleteStudent(index) {

    if (
        confirm(
            "Are you sure you want to delete this student?"
        )
    ) {

        students.splice(index, 1);

        displayStudents();

        updateAgile();

        alert("Student Deleted Successfully!");

    }

}



// ================= CLEAR FORM =================

function clearForm() {

    document.getElementById("studentId").value = "";

    document.getElementById("studentName").value = "";

    document.getElementById("studentCourse").value = "";

    document.getElementById("studentEmail").value = "";

}



// ================= AGILE UPDATE =================

function updateAgile() {

    let count = students.length;


    /*
       ================= SCRUM =================
    */


    let registration =
        document.getElementById("scrumRegistration");

    let add =
        document.getElementById("scrumAdd");


    if (count > 0) {

        registration.classList.add("completed-task");

        registration.innerHTML =
            "<span>PB1 - Registration ✓</span><b>Completed</b>";


        add.classList.add("completed-task");

        add.innerHTML =
            "<span>PB3 - Add Student ✓</span><b>Completed</b>";


        document.getElementById("reviewRegistration").innerText =
            "✓ Registration";

        document.getElementById("reviewAdd").innerText =
            "✓ Add Student";


        document.getElementById("sprintStatus").innerText =
            "Sprint 1: Student development completed";


        document.getElementById("scrumIssue").innerText =
            "No Issue";

    }


    /*
       ================= KANBAN =================
    */


    if (count > 0) {

        document.getElementById("todoRegistration")
            .style.display = "none";


        document.getElementById("todoAdd")
            .style.display = "none";


        document.getElementById("progressTask")
            .innerText =
            "Student Development ✓";


        document.getElementById("testingTask")
            .innerText =
            "Student Testing ✓";


        document.getElementById("completedTasks")
            .innerHTML = `

                <div class="kanban-card">
                    Registration ✓
                </div>

                <div class="kanban-card">
                    Login ✓
                </div>

                <div class="kanban-card">
                    Add Student ✓
                </div>

            `;

    }


    /*
       ================= XP =================
    */


    if (count > 0) {

        document.getElementById("xpTest").innerText =
            "✓ Test Passed - Student Module";

        document.getElementById("ciStatus").innerText =
            "✓ Code → Commit → Build → Testing → Deploy";

    }

}