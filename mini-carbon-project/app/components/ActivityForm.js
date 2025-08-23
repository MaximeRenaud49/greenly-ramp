"use client";
import { useState } from "react";

export default function ActivityForm({ onAdd }) {
  const [name, setName] = useState("");
  const [kgCO2e, setKgCO2e] = useState("");
  const [scope, setScope] = useState("3"); // "3" par défaut (texte pour l’input/select)
  function handleSubmit(e) {
    console.log("handleSubmit called with:", e);
    console.log("typeof e.preventDefault:", typeof e?.preventDefault);
    e.preventDefault(); // empêche le rafraîchissement

  // 1) Nettoyage + conversions
  const trimmedName = name.trim();
  const kg = Number(kgCO2e);
  const sc = Number(scope);

  // 2) Validation simple (éviter les entrées pourries)
  if (!trimmedName) return;           // pas de nom vide
  if (Number.isNaN(kg) || kg < 0) return; // kg doit être un nombre >= 0
  if (![1, 2, 3].includes(sc)) return;    // scope doit être 1,2 ou 3

  // 3) Construire l'item
  const newItem = {
    id: Date.now(),
    name: trimmedName,
    kgCO2e: Number(kg.toFixed(2)), // arrondi sympa
    scope: sc,
  };

  // 4) Appeler le parent
  if (typeof onAdd === "function") {
    onAdd(newItem);
  }

  // 5) Reset du formulaire
  setName("");
  setKgCO2e("");
  setScope(String(sc)); // garde le scope choisi
}

    return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, marginTop: 16 }}>
      <input
        name="name"
        placeholder="Nom de l'activité"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        name="kgCO2e"
        placeholder="kgCO2e (nombre)"
        value={kgCO2e}
        onChange={(e) => setKgCO2e(e.target.value)}
      />

      <select
        name="scope"
        value={scope}
        onChange={(e) => setScope(e.target.value)}
      >
        <option value="1">scope 1</option>
        <option value="2">scope 2</option>
        <option value="3">scope 3</option>
      </select>

      <button type="submit">Ajouter</button>
    </form>
  );
}
