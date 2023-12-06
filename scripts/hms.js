// Import the 'uuid' librarye
import { v4 as uuidv4 } from 'uuid';

let patients = [];
let appointments = [];

function addPatient() {
  const patientName = document.getElementById('patientName').value;
  const patientAge = document.getElementById('patientAge').value;
  const patientCondition = document.getElementById('patientCondition').value;
  const patientGender = document.getElementById('patientGender').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;

  // Generate a unique ID for the new patient using uuidv4()
  const newPatientId = uuidv4();

  const newPatient = {
    id: newPatientId,
    name: patientName,
    age: patientAge,
    gender: patientGender,
    condition: patientCondition,
    appointments: [{
      date: appointmentDate,
      time: appointmentTime,
      purpose: "General Checkup" // You can customize the purpose as needed
    }]
  };

  // Save the new patient to the GitHub Pages API
  savePatientToAPI(newPatient)
    .then(() => {
      // After successfully saving to API, update the local data
      patients.push(newPatient);
      displayPatients();
      clearForm();
    })
    .catch(error => {
      console.error('Error saving patient to API:', error);
      alert('Failed to save patient data. Please try again.');
    });
}

function savePatientToAPI(patient) {
  const apiUrl = 'https://liezl76.github.io/host_api/patients.json';

  return fetch(apiUrl, {
    method: 'POST', // Use POST for creating new data
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      patients: [...patients, patient]
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
    });
}

function deletePatient(index) {
  const confirmed = confirm('Are you sure you want to delete this patient?');

  if (confirmed) {
    // Delete the patient from the GitHub Gist API
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

function deletePatientFromAPI(index) {
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

function clearForm() {
  document.getElementById('patientForm').reset();
}

function displayPatients() {
  const patientsList = document.getElementById('patientsList');

  // Clear the existing list
  patientsList.innerHTML = '';

  patients.forEach((patient, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${patient.name}</strong> (Age: ${patient.age}, Condition: ${patient.condition})
      <button onclick="deletePatient(${index})">Delete</button>
    `;
    patientsList.appendChild(listItem);
  });
}

// Load patients from the GitHub Pages API on page load
document.addEventListener('DOMContentLoaded', () => {
  loadPatientsFromAPI();
});

function loadPatientsFromAPI() {
  const apiUrl = 'https://liezl76.github.io/host_api/patients.json';

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Assuming the patients data is stored in the 'patients' array
      patients = data.patients || [];
      displayPatients();
    })
    .catch(error => {
      console.error('Error fetching patient data from API:', error);
      alert('Failed to load patient data. Please try again.');
    });
}
