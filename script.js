// Login with the credentials
document.getElementById("signin").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (username === "admin" && password === "Admin123") {
    window.location.href = "home.html";
  } else {
    alert("Invalid Username or Password");
  }
});
