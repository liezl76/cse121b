let patients = [];
let nextPatientId = 2023004; // Starting patient ID

function addPatient() {
  const patientName = document.getElementById('patientName').value;
  const patientAge = document.getElementById('patientAge').value;
  const patientCondition = document.getElementById('patientCondition').value;
  const patientGender = document.getElementById('patientGender').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;

  const newPatientId = nextPatientId++;

  const newPatient = {
    id: newPatientId,
    name: patientName,
    age: parseInt(patientAge),
    gender: patientGender,
    medical_conditions: patientCondition.split(',').map(condition => condition.trim()),
    appointments: [
      {
        date: appointmentDate,
        time: appointmentTime,
        purpose: "General Checkup"
      }
    ]
  };

  console.log("new patient data:", newPatient);

  // Save the new patient to the local data
  patients.push(newPatient);
  displayPatients();
  clearForm();
}

function clearForm() {
  document.getElementById('patientForm').reset();
}

function deletePatient(index) {
  const confirmed = confirm('Are you sure you want to delete this patient?');

  if (confirmed) {
    // After successfully deleting from local data, update the displayed patients
    patients.splice(index, 1);
    displayPatients();
  }
}

function displayPatients() {
  const patientsList = document.getElementById('patientsList');
  const patientAppointmentsList = document.getElementById('patientAppointmentsList');

  // Clear the existing list
  patientsList.innerHTML = '';
  patientAppointmentsList.innerHTML = '';

  patients.forEach((patient, index) => {
    // Display Patient list
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${patient.name}</strong> (Age: ${patient.age}, Conditions: ${patient.medical_conditions.join(', ')})
      <button onclick="deletePatient(${index})">Delete</button>
    `;
    patientsList.appendChild(listItem);

    // Display appointments for each patient
    const appointmentsListItem = document.createElement('li');
    appointmentsListItem.innerHTML = `
      <strong>${patient.name}'s Appointments</strong>:
      <ul>
        ${patient.appointments.map(appointment => `
          <li>${appointment.date} at ${appointment.time} - ${appointment.purpose}</li>
        `).join('')}
      </ul>
    `;
    patientAppointmentsList.appendChild(appointmentsListItem);
  });
}

// Load patients from the GitHub Pages hosted patients.json on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadPatientsFromGitHub();
    displayPatients();
  } catch (error) {
    console.error('Error during initialization:', error);
    alert('Failed to initialize. Please try again.');
  }

  // Add event listeners after loading the DOM
  document.getElementById('addPatientBtn').addEventListener('click', addPatient);
  document.getElementById('clearFormBtn').addEventListener('click', clearForm);
});

async function loadPatientsFromGitHub() {
  try {
    const response = await fetch('https://liezl76.github.io/host_api/patients.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch patients data with status ${response.status}`);
    }

    const data = await response.json();
    patients = data.patients || [];
  } catch (error) {
    throw new Error(`Error fetching patient data from GitHub: ${error.message}`);
  }
}