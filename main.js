let firstName = document.getElementById('FName');
let lastName = document.getElementById('LName');
let dayAge = document.getElementById('Day');
let monthAge = document.getElementById('Month');
let yearAge = document.getElementById('Year');
let idNumber = document.getElementById('idNumber');
let School = document.getElementById('School');
let City = document.getElementById('City');
let divNum = document.getElementById('div2Num');
let tableStudent = document.getElementById('Tabbles');
let tableDetails = document.getElementById('tableDetails');
let btnAdd = document.getElementById('btn1');  // Assuming btn1 is 'Add' button
let btnUpdate = document.getElementById('btn2'); // Assuming btn2 is 'Update' button

let arrProjects = localStorage.Student ? JSON.parse(localStorage.Student) : [];
let currentIndex = null; // To track the student index for updating

// Function to create or update a student
function createOrUpdateStu() {
  if (firstName.value && lastName.value && dayAge.value && monthAge.value && yearAge.value && idNumber.value && School.value && City.value) {
    let studentData = {
      firstName: firstName.value,
      lastName: lastName.value,
      dayAge: dayAge.value,
      monthAge: monthAge.value,
      yearAge: yearAge.value,
      idNumber: idNumber.value,
      School: School.value,
      city: City.value,
    };
    
    if (currentIndex === null) {
      // Add new student
      arrProjects.push(studentData);
    } else {
      // Update existing student
      arrProjects[currentIndex] = studentData;
      currentIndex = null; // Reset index after updating
      btnAdd.classList.remove('addNone'); // Show 'Add' button
      btnUpdate.classList.add('addNone'); // Hide 'Update' button
    }

    localStorage.setItem("Student", JSON.stringify(arrProjects));
    clearData();
    addStu();
  } else {
    window.alert('Please fill all fields.');
  }
}

// Clear Data Function
function clearData() {
  firstName.value = '';
  lastName.value = '';
  dayAge.value = '';
  monthAge.value = '';
  yearAge.value = '';
  idNumber.value = '';
  School.value = '';
  City.value = '';
}

// Function to display all students
function addStu() {
  let tabl = ""; // Reset `tabl` to avoid appending old data
  if (arrProjects.length > 0) {
    divNum.innerHTML = `
      <h4 class="p-3 fw-bold text-center bg-dark text-warning">
        Number Of Students: <span class="text-light">${arrProjects.length}</span>
      </h4>
      <button type="button" class="btn btn-danger col-4 align-items-center rounded-pill w-100" onclick="removeings()">Remove all</button>
    `;
    tableStudent.innerHTML = `
      <hr class="text-light" />
      <div class="row align-items-center mt-4 justify-content-between">
        <p class="fw-500 text-primary col-1 text-center align-items-center p-3 ms-2">Id</p>
        <p class="fw-500 text-primary col-4 text-center align-items-center p-3 ms-2">Student Name</p>
        <p class="fw-500 text-primary col-4 text-center align-items-center p-3 ms-2">Details</p>
      </div>
    `;

    for (let i = 0; i < arrProjects.length; i++) {
      let modalId = `exampleModalCenter${i}`;

      tabl += `
        <div class="row align-items-center mt-4 justify-content-between">
          <p class="text-light col-1 text-center align-items-center p-3 ms-2">${i + 1}</p>
          <p class="text-light col-4 align-items-center p-3 ms-2">${arrProjects[i].firstName + " " + arrProjects[i].lastName}</p>
          <button id="btnShowMore${i}" type="button" class="btn btn-primary col-4 align-items-center rounded-pill" data-bs-toggle="modal" data-bs-target="#${modalId}">Show more</button>

          <!-- Modal with unique ID for each student -->
          <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle${i}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle${i}">More Details</h5>
                </div>
                <div class="modal-body">
                  <p>First Name: ${arrProjects[i].firstName}</p>
                  <p>Last Name: ${arrProjects[i].lastName}</p>
                  <p>Student Age: ${2024 - +arrProjects[i].yearAge}</p>
                  <p>Student Id: ${arrProjects[i].idNumber}</p>
                  <p>Student School: ${arrProjects[i].School}</p>
                  <p>Student City: ${arrProjects[i].city}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" onclick="editStudent(${i})" data-bs-dismiss="modal">Update</button>
                  <button type="button" class="btn btn-danger" onclick="removeing(${i})" data-bs-dismiss="modal">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
    tableDetails.innerHTML = tabl;
  } else {
    divNum.innerHTML = `<p class="text-center text-light">No students found. Please add a student.</p>`;
    tableDetails.innerHTML = ""; // Clear table if no students
  }
}

// Edit Student Function
function editStudent(index) {
  currentIndex = index; // Set the global index to the student being edited
  const student = arrProjects[index];

  // Populate the form fields with the selected student's data
  firstName.value = student.firstName;
  lastName.value = student.lastName;
  dayAge.value = student.dayAge;
  monthAge.value = student.monthAge;
  yearAge.value = student.yearAge;
  idNumber.value = student.idNumber;
  School.value = student.School;
  City.value = student.city;

  // Switch visibility of Add and Update buttons
  btnAdd.classList.add('addNone');  // Hide 'Add' button
  btnUpdate.classList.remove('addNone');  // Show 'Update' button
  // location.reload(true);
}

// Initial Call to Display Students
addStu();

// Add Student Button Event Listener
btnAdd.addEventListener("click", createOrUpdateStu);

// Update Student Button Event Listener
btnUpdate.addEventListener("click", createOrUpdateStu);

// Function to remove all students
function removeings() {
  arrProjects = []; // Clear the array
  localStorage.setItem("Student", JSON.stringify(arrProjects)); // Update local storage
  addStu(); // Refresh the student list to reflect the removal
  location.reload(true);
}

// Function to remove a single student
function removeing(i) {
  arrProjects.splice(i, 1); // Remove the item at index `i`
  localStorage.setItem("Student", JSON.stringify(arrProjects)); // Update local storage
  addStu(); // Refresh the student list to reflect the removal
  location.reload(true);
}
