"use client";

import ItemRow from "./ItemRow";

export default function ItemList({ items, onRemove }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((it) => (
        <ItemRow key={it.id} item={it} onRemove={onRemove} />
      ))}
    </ul>
  );
}
