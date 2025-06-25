
const auth = firebase.auth();
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "form.html";
    })
    .catch((error) => {
      document.getElementById("error").innerText = error.message;
    });
});
