import { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./components/PatientForm";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  // Buscar pacientes do backend quando iniciar
  useEffect(() => {
    async function fetchPatients() {
      const response = await axios.get("http://localhost:3001/patients");
      setPatients(response.data);
    }

    fetchPatients();
  }, []);

  // Adicionar paciente no backend
  async function addPatient(newPatient) {
    await axios.post("http://localhost:3001/patients", newPatient);

    setPatients([...patients, newPatient]);
  }

  // Deletar paciente no backend
  async function deletePatient(id) {
    await axios.delete(`http://localhost:3001/patients/${id}`);

    setPatients(patients.filter((patient) => patient.id !== id));
  }

  // Começar edição
  function startEdit(patient) {
    setEditingPatient(patient);
  }

  // Atualizar paciente no backend
  async function updatePatient(updatedPatient) {
    await axios.put(
      `http://localhost:3001/patients/${updatedPatient.id}`,
      updatedPatient
    );

    setPatients(
      patients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );

    setEditingPatient(null);
  }

return (
  <div className="container">
    <h1 className="title">Cadastro de Pacientes</h1>

    <div className="main-grid">
      {/* Card do formulário */}
      <div className="card">
        <PatientForm
          onAddPatient={addPatient}
          editingPatient={editingPatient}
          onUpdatePatient={updatePatient}
        />
      </div>

      {/* Card da lista */}
      <div className="card list-container">
        <h2>Lista de Pacientes</h2>

        {patients.length === 0 ? (
          <p className="empty">Nenhum paciente cadastrado ainda.</p>
        ) : (
          <ul className="patient-list">
            {patients.map((patient) => (
              <li key={patient.id} className="patient-card">
                <div>
                  <strong>{patient.name}</strong>
                  <p>{patient.phone}</p>
                </div>

                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => startEdit(patient)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-delete"
                    onClick={() => deletePatient(patient.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
);
}

export default App;
