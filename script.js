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

// Home Page
const API = "https://phi-lab-server.vercel.app/api/v1/lab";

let allIssues = [];
let activeFilter = "all";

const modal = document.getElementById("issueModal");
const issuesGrid = document.getElementById("issuesGrid");
const issueCount = document.getElementById("issueCount");
const loadingSpinner = document.getElementById("loadingSpinner");
const searchInput = document.getElementById("searchInput");

// Load Data
const loadIssues = () => {
  loadingSpinner.classList.remove("hidden");
  issuesGrid.classList.add("hidden");

  fetch(`${API}/issues`)
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data || data;
      renderCards(allIssues);
      loadingSpinner.classList.add("hidden");
      issuesGrid.classList.remove("hidden");
    });
};
