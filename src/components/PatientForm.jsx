import { useState, useEffect } from "react";

function PatientForm({ onAddPatient, editingPatient, onUpdatePatient }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // ✅ Quando clicar em editar, carregar dados no formulário
  useEffect(() => {
    if (editingPatient) {
      setName(editingPatient.name);
      setPhone(editingPatient.phone);
    }
  }, [editingPatient]);

  function handleSubmit(event) {
    event.preventDefault();

    // ✅ Se estiver editando, atualiza
    if (editingPatient) {
      const updatedPatient = {
        ...editingPatient,
        name,
        phone,
      };

      onUpdatePatient(updatedPatient);
    } else {
      // ✅ Se não estiver editando, cadastra novo
      const newPatient = {
        id: Date.now(),
        name,
        phone,
      };

      onAddPatient(newPatient);
    }

    setName("");
    setPhone("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{editingPatient ? "✏️ Editar Paciente" : "➕ Novo Paciente"}</h2>

      <input
        type="text"
        placeholder="Nome completo"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Telefone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        required
      />

      <button className="btn-primary" type="submit">
        {editingPatient ? "Salvar Alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

<button type="submit" className="btn-submit">
  Cadastrar
</button>


export default PatientForm;
