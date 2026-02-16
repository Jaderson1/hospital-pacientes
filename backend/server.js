const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let patients = [];

// Rota para listar pacientes
app.get("/patients", (req, res) => {
  res.json(patients);
});

// Rota para cadastrar paciente
app.post("/patients", (req, res) => {
  const newPatient = req.body;
  patients.push(newPatient);

  res.status(201).json({
    message: "Paciente cadastrado com sucesso",
    patient: newPatient,
  });
});

// Rota para deletar paciente pelo id
app.delete("/patients/:id", (req, res) => {
  const id = Number(req.params.id);

  patients = patients.filter((patient) => patient.id !== id);

  res.json({ message: "Paciente excluído com sucesso" });
});

// Rota para atualizar paciente pelo id
app.put("/patients/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedPatient = req.body;

  patients = patients.map((patient) =>
    patient.id === id ? updatedPatient : patient
  );

  res.json({ message: "Paciente atualizado com sucesso" });
});

// Rodar servidor
app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
