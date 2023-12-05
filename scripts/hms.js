let patients = [];
let appointments = [];

function addPatient() {
  const patientName = document.getElementById('patientName').value;
  const patientAge = document.getElementById('patientAge').value;
  const patientCondition = document.getElementById('patientCondition').value;
  const appointmentDate = document.getElementById('appointmentDate').value;
  const appointmentTime = document.getElementById('appointmentTime').value;
  
  const newPatient = {
    name: patientName,
    age: patientAge,
    condition: patientCondition,
  };

  // Save the new patient to the GitHub Gist API
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
  //Schedule an appointment for the patient
  const newAppointment = {
    patientName: patientName,
    date: appointmentDate,
    time: appointmentTime,
  };

  appointments.push(newAppointment);
  displayAppointments();

  function displayAppointments() {
    const appointmentsList = document.getElementById('appointmentsList');
  
    // Clear the existing list
    appointmentsList.innerHTML = '';
  
    appointments.forEach(appointment => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${appointment.patientName}</strong> - Date: ${appointment.date}, Time: ${appointment.time}
      `;
      appointmentsList.appendChild(listItem);
    });
  }

function savePatientToAPI(patient) {
  // Replace 'YOUR_GIST_ID' with the actual Gist ID where you want to store patient data
  const gistId = 'YOUR_GIST_ID';
  const apiUrl = `https://api.github.com/gists/${gistId}`;

  return fetch(apiUrl, {
    method: 'PATCH', // Use PATCH to update an existing Gist
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YOUR_GITHUB_TOKEN', // Replace with your GitHub token
    },
    body: JSON.stringify({
      files: {
        'patients.json': {
          content: JSON.stringify([...patients, patient]),
        },
      },
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
  const gistId = 'YOUR_GIST_ID';
  const apiUrl = `https://api.github.com/gists/${gistId}`;

  return fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YOUR_GITHUB_TOKEN',
    },
    body: JSON.stringify({
      files: {
        'patients.json': {
          content: JSON.stringify([...patients.slice(0, index), ...patients.slice(index + 1)]),
        },
      },
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

// Load patients from the GitHub Gist API on page load
document.addEventListener('DOMContentLoaded', () => {
  loadPatientsFromAPI();
});

function loadPatientsFromAPI() {
  const gistId = 'YOUR_GIST_ID';
  const apiUrl = `https://api.github.com/gists/${gistId}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Assuming the patients data is stored in a file named 'patients.json'
      const patientsFile = data.files['patients.json'];
      if (patientsFile) {
        patients = JSON.parse(patientsFile.content);
        displayPatients();
      }
    })
    .catch(error => {
      console.error('Error fetching patient data from API:', error);
      alert('Failed to load patient data. Please try again.');
    });
}
