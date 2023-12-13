let patients = [];
let nextPatientId = 2023004; // Starting patient ID

function addPatient() {
  const patientName = document.getElementById('patientName').value;
  const patientAge = document.getElementById('patientAge').value;
  const patientCondition = document.getElementById('patientCondition').value;
  const patientGender = document.getElementById('patientGender').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;

  // Generate a unique ID for the new patient
  const newPatientId = nextPatientId++;
  const formattedPatientId = `P${newPatientId}`;

  const newPatient = {
    id: newPatientId,
    name: patientName,
    age: parseInt(patientAge), // Parse age as an integer
    gender: patientGender,
    medical_conditions: patientCondition.split(',').map(condition => condition.trim()), // Trim conditions
    appointments: [
      {
        date: appointmentDate,
        time: appointmentTime,
        purpose: "General Checkup" // Customize the purpose as needed
      }
    ]
  };

  console.log("new patient data:", newPatient);

  // Save the new patient to the GitHub Pages API
  savePatientToAPI(newPatient)
    .then(() => {
      console.log("Patient successfully added to the API.");
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

function clearForm() {
  document.getElementById('patientForm').reset();
}

function savePatientToAPI(patient) {
  const apiUrl = 'https://liezl76.github.io/host_api/patients.json';

  return fetch(apiUrl, {
    method: 'POST',
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

// Load patients from the GitHub Pages API on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadPatientsFromAPI();
    displayPatients();

    // Add event listeners after loading the DOM
    document.getElementById('addPatientBtn').addEventListener('click', addPatient);
    document.getElementById('clearFormBtn').addEventListener('click', clearForm);
  } catch (error) {
    console.error('Error during initialization:', error);
    alert('Failed to initialize. Please try again.');
  }
});

async function loadPatientsFromAPI() {
  const apiUrl = 'https://liezl76.github.io/host_api/patients.json';

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    patients = data.patients || [];

  } catch (error) {
    throw new Error(`Error fetching patient data from API: ${error.message}`);
  }
}