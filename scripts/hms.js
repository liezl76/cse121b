let patients = [];
let nextPatientId = 2023004; // Starting patient ID

const githubApiUrl = 'https://api.github.com/repos/liezl76/host_api/contents/patients.json';
const personalAccessToken = 'ghp_qTreVSCay021UJVUygB40nbGrI5gc41df4Bw';

async function savePatientToGitHub(patient) {
  const content = btoa(JSON.stringify({ patients: [...patients, patient] }));

  try {
    const response = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${personalAccessToken}`,
      },
      body: JSON.stringify({
        message: 'Add new patient data',
        content: content,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    console.log('Patient successfully added to GitHub.');
  } catch (error) {
    console.error('Error saving patient to GitHub:', error);
    alert('Failed to save patient data to GitHub. Please try again.');
  }
}

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

  // Save the new patient to both GitHub and local data
  savePatientToGitHub(newPatient)
    .then(() => {
      // After successfully saving to GitHub, update the local data
      patients.push(newPatient);
      displayPatients();
      clearForm();
    })
    .catch(error => {
      console.error('Error saving patient to GitHub:', error);
      alert('Failed to save patient data to GitHub. Please try again.');
    });
}

function clearForm() {
  document.getElementById('patientForm').reset();
}

function deletePatient(index) {
  const confirmed = confirm('Are you sure you want to delete this patient?');

  if (confirmed) {
    // Delete the patient from the GitHub Pages API
    deletePatientFromAPI(index)
      .then(() => {
        // After successfully deleting from API, update the local data
        patients.splice(index, 1);
        displayPatients();
      })
      .catch(error => {
        console.error('Error deleting patient from API:', error);
        alert('Failed to delete patient data. Please try again.');
      });
  }
}

async function deletePatientFromAPI(index) {
  const apiUrl = 'https://liezl76.github.io/host_api/patients.json';

  return fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patients: [...patients.slice(0, index), ...patients.slice(index + 1)],
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
    });
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

// Load patients from the GitHub API on page load
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
    const response = await fetch(githubApiUrl);

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const data = await response.json();
    patients = data.patients || [];

  } catch (error) {
    throw new Error(`Error fetching patient data from GitHub: ${error.message}`);
  }
}