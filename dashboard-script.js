
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

const db = firebase.firestore();
const tableBody = document.querySelector("#logsTable tbody");
const searchInput = document.getElementById("searchInput");

function renderTable(logs) {
  tableBody.innerHTML = "";
  logs.forEach(doc => {
    const data = doc.data();
    const row = `<tr>
      <td>${data.date}</td>
      <td>${data.time}</td>
      <td>${data.shift}</td>
      <td>${data.operatorA}</td>
      <td>${data.operatorB}</td>
      <td>${data.freeChlorine}</td>
      <td>${data.temperature}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

function exportCSV() {
  let csv = "Date,Time,Shift,Operator A,Operator B,Free Chlorine,Temperature\n";
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach(row => {
    const cols = row.querySelectorAll("td");
    const rowData = Array.from(cols).map(col => col.textContent).join(",");
    csv += rowData + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tosin_logs.csv";
  link.click();
}

db.collection("logs").orderBy("createdAt", "desc").onSnapshot(snapshot => {
  renderTable(snapshot.docs);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? "" : "none";
  });
});
