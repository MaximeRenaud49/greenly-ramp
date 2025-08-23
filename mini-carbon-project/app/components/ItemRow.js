"use client";

export default function ItemRow({ item, onRemove }) {
    const { id, name, kgCO2e, scope } = item;

    return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid #ddd",
        padding: 8,
        borderRadius: 8,
      }}
    >
      <span>
        <strong>{name}</strong>{" "}
        <span style={{ opacity: 0.7 }}>
          — {kgCO2e} kgCO2e (scope {scope})
        </span>
      </span>
      <button onClick={() => onRemove(id)}>Supprimer</button>
    </li>
  );
}
