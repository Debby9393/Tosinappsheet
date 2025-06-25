
const db = firebase.firestore();
const form = document.getElementById("logForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("logs").add({
    date: form["date"].value,
    time: form["time"].value,
    shift: form["shift"].value,
    operatorA: form["operatorA"].value,
    operatorB: form["operatorB"].value,
    freeChlorine: parseFloat(form["freeChlorine"].value),
    temperature: parseFloat(form["temperature"].value),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    document.getElementById("status").innerText = "Data submitted successfully!";
    form.reset();
  }).catch((error) => {
    document.getElementById("status").innerText = "Error: " + error.message;
  });
});
