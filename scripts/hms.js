let patients = [];

function addPatient() {
  const patientName = document.getElementById('patientName').value;
  const patientAge = document.getElementById('patientAge').value;
  const patientCondition = document.getElementById('patientCondition').value;

  const newPatient = {
    id: generatePatientId(),
    name: patientName,
    age: patientAge,
    condition: patientCondition,
  };

  patients.push(newPatient);
  displayPatients();
  clearForm();
}

function generatePatientId() {
  // You can implement a proper ID generation logic here
  return Math.random().toString(36).substring(7);
}

function displayPatients() {
  const patientsList = document.getElementById('patientsList');

  // Clear the existing list
  patientsList.innerHTML = '';

  patients.forEach(patient => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${patient.name}</strong> (Age: ${patient.age}, Condition: ${patient.condition})
      <button onclick="updatePatient('${patient.id}')">Update</button>
      <button onclick="deletePatient('${patient.id}')">Delete</button>
    `;
    patientsList.appendChild(listItem);
  });
}

function updatePatient(id) {
  const updatedInfo = prompt('Enter updated information for the patient:');
  const patientIndex = patients.findIndex(patient => patient.id === id);

  if (patientIndex !== -1) {
    patients[patientIndex].condition = updatedInfo;
    displayPatients();
  }
}

function deletePatient(id) {
  const confirmed = confirm('Are you sure you want to delete this patient?');

  if (confirmed) {
    patients = patients.filter(patient => patient.id !== id);
    displayPatients();
  }
}

function clearForm() {
  document.getElementById('patientForm').reset();
}

//
document.addEventListener('DOMContentLoaded', () => {
    // Fetch patient data from an external API (replace with your API endpoint)
    fetch('https://api.example.com/patients')
      .then(response => response.json())
      .then(data => displayPatients(data))
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function displayPatients(patients) {
    const patientListContainer = document.getElementById('patientList');
  
    // Use template literals and array method for data manipulation
    const patientListHTML = patients.map(patient => `
      <div class="patientCard">
        <h2>${patient.name}</h2>
        <p>Age: ${patient.age}</p>
        <p>Condition: ${patient.condition}</p>
      </div>
    `).join('');
  
    // Display the patient list in the DOM
    patientListContainer.innerHTML = patientListHTML;
  
    // Example of conditional branching
    if (patients.length === 0) {
      patientListContainer.innerHTML = '<p>No patients available.</p>';
    }
  }
  