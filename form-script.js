
const db = firebase.firestore();
const form = document.getElementById("logForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = form["date"].value;
  const time = form["time"].value;
  const shift = form["shift"].value;
  const operatorA = form["operatorA"].value;
  const operatorB = form["operatorB"].value;
  const freeChlorine = parseFloat(form["freeChlorine"].value);
  const temperature = parseFloat(form["temperature"].value);

  db.collection("logs").add({
    date,
    time,
    shift,
    operatorA,
    operatorB,
    freeChlorine,
    temperature,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById("status").innerText = "✅ Log submitted successfully!";
    form.reset();
  }).catch((error) => {
    document.getElementById("status").innerText = "❌ Submission failed: " + error.message;
  });
});
