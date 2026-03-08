// Login
const signinBtn = document.getElementById("signin");

if (signinBtn) {
  signinBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "Admin123") {
      window.location.href = "home.html";
    } else {
      alert("Invalid Username or Password");
    }
  });
}
