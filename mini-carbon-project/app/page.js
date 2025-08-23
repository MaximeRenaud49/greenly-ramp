"use client";

import { useMemo, useState, useEffect } from "react";
import ActivityForm from "./components/ActivityForm";
import ItemList from "./components/ItemList";

const initial = [
  { id: 1, name: "Train Paris→Lyon", kgCO2e: 1.2, scope: 3 },
  { id: 2, name: "Electricité (bureau)", kgCO2e: 8.5, scope: 2 },
];

export default function HomePage() {
  // 1) Même valeur côté serveur et côté client au premier rendu
  const [items, setItems] = useState(initial);

  // 2) Après montage, on remplace par ce qu'il y a en localStorage (s'il existe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mini-items");
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {
      console.warn("Impossible de lire mini-items:", e);
    }
  }, []);

  // 3) À chaque changement, on persiste
  useEffect(() => {
    try {
      localStorage.setItem("mini-items", JSON.stringify(items));
    } catch (e) {
      console.warn("Impossible d'écrire mini-items:", e);
    }
  }, [items]);

  function addItem(newItem) {
    setItems(prev => [...prev, newItem]);
  }

  function removeItem(id) {
    setItems(prev => prev.filter(it => it.id !== id));
  }

  const total = useMemo(
    () => items.reduce((sum, it) => sum + it.kgCO2e, 0),
    [items]
  );

  return (
    <main style={{ maxWidth: 640, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0 }}>Mini Carbon List (Next.js)</h1>
      <p style={{ opacity: 0.7, marginTop: 8 }}>
        Ajoute des activités avec un <code>kgCO2e</code> estimé. Le total se met à jour.
      </p>

      <ActivityForm onAdd={addItem} />

      <h2 style={{ marginTop: 24 }}>Items</h2>
      <ItemList items={items} onRemove={removeItem} />

      <div style={{ marginTop: 16, fontWeight: "bold" }}>
        Total : {total.toFixed(2)} kgCO2e
      </div>
    </main>
  );
}
