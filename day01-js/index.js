// day01-js/index.js

// --- Mini "test" pour vérifier nos réponses ---
function assert(name, cond) {
  if (!cond) throw new Error("❌ " + name);
  console.log("✅ " + name);
}

// --- Données d'exemple ---
const activities = [
  { id: 1, name: "Train Paris→Lyon", kgCO2e: 1.2, scope: 3 },
  { id: 2, name: "Electricité (bureau)", kgCO2e: 8.5, scope: 2 },
  { id: 3, name: "Repas (boeuf)", kgCO2e: 5.0, scope: 3 },
  { id: 4, name: "Fabrication laptop", kgCO2e: 120, scope: 3 },
];

// 1) Somme des kgCO2e (sans mutation)
function totalEmissions(list) {
  return list.reduce((sum, item) => sum + item.kgCO2e, 0);
}
assert("totalEmissions", totalEmissions(activities) === 1.2 + 8.5 + 5.0 + 120);

// 2) Top N des scope 3 par kgCO2e (noms uniquement)
function topScope3(list, topN = 2) {
  return list
    .filter(a => a.scope === 3)
    .sort((a, b) => b.kgCO2e - a.kgCO2e)
    .slice(0, topN)
    .map(a => a.name);
}
assert(
  "topScope3",
  JSON.stringify(topScope3(activities)) ===
    JSON.stringify(["Fabrication laptop", "Repas (boeuf)"])
);

// 3) Ajouter une activité (retourner un **nouveau** tableau)
function addActivity(list, activity) {
  return [...list, activity];
}
const before = activities.slice();
const after = addActivity(activities, { id: 5, name: "Bus", kgCO2e: 0.9, scope: 3 });
assert("addActivity length", after.length === activities.length + 1);
assert("addActivity immutability", JSON.stringify(activities) === JSON.stringify(before));

// 4) Maj d'un objet sans mutation: +10% sur kgCO2e pour l'id donné (arrondi 1 décimale)
function bumpBy10Percent(list, id) {
  return list.map(a => {
    if (a.id !== id) return a;
    const bumped = Math.round((a.kgCO2e * 1.1) * 10) / 10;
    return { ...a, kgCO2e: bumped };
  });
}
const bumped = bumpBy10Percent(activities, 4);
const laptop = bumped.find(a => a.id === 4);
assert("bumpBy10%", Math.abs(laptop.kgCO2e - 132.0) < 1e-9);

// 5) Destructuring + valeur par défaut
function label({ name, kgCO2e, scope = "N/A" }) {
  return `${name} — ${kgCO2e} kgCO2e (scope ${scope})`;
}
assert("label", label(activities[0]) === "Train Paris→Lyon — 1.2 kgCO2e (scope 3)");

// 6) Async/await: compter les todos "completed" depuis une API publique
// Node 18+ a fetch intégré. Si tu es en Node <18, vois la note plus bas.
async function countTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  return todos.filter(t => t.completed === true).length;
}
countTodos()
  .then(n => assert("countTodos > 0", n > 0))
  .catch(e => console.error("Async test failed", e));