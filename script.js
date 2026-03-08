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

// Filter issues by tab
const getFilteredIssues = (issues) => {
  if (activeFilter === "all") return issues;
  return issues.filter((issue) => issue.status.toLowerCase() === activeFilter);
};

// Render cards
const renderCards = (issues) => {
  const filtered = getFilteredIssues(issues);

  issueCount.innerText = filtered.length + " Issues";

  if (filtered.length === 0) {
    issuesGrid.innerHTML = `<p class="col-span-4 text-center text-gray-400 py-10">No issues found.</p>`;
    return;
  }

  issuesGrid.innerHTML = "";

  filtered.forEach((issue) => {
    const isOpen = issue.status.toLowerCase() === "open";
    const borderColor = isOpen ? "border-green-500" : "border-purple-500";
    const icon = isOpen
      ? `<img src="images/Open-Status.png" alt="">`
      : `<img src="images/Closed-Status.png" alt="">`;

    let priorityClass = "badge-ghost";
    if (issue.priority.toUpperCase() === "HIGH") priorityClass = "badge-error";
    if (issue.priority.toUpperCase() === "MEDIUM")
      priorityClass = "badge-warning";

    const labels = issue.labels || [];
    const labelsHTML = labels
      .map((label) => {
        let style = "border: 1px solid #d1d5db; color: #374151;";
        if (label.toUpperCase() === "BUG")
          style = "border: 1px solid #ef4444; color: #ef4444;";
        if (label.toUpperCase() === "HELP WANTED")
          style = "border: 1px solid #f59e0b; color: #f59e0b;";
        if (label.toUpperCase() === "ENHANCEMENT")
          style = "border: 1px solid #22c55e; color: #22c55e;";
        if (label.toUpperCase() === "DOCUMENTATION")
          style = "border: 1px solid #3b82f6; color: #3b82f6;";
        if (label.toUpperCase() === "GOOD FIRST ISSUE")
          style = "border: 1px solid #8b5cf6; color: #8b5cf6;";
        return `<span class="badge badge-sm" style="${style}">${label}</span>`;
      })
      .join("");

    const date = new Date(issue.createdAt).toLocaleDateString();

    const card = document.createElement("div");
    card.className = `card bg-white shadow border-t-4 ${borderColor} cursor-pointer`;
    card.innerHTML = `
      <div class="card-body p-4">
        <div class="flex justify-between items-center mb-2">
          <div>${icon}</div>
          <span class="badge ${priorityClass} badge-sm">${issue.priority}</span>
        </div>
        <h3 class="font-semibold text-sm leading-snug">${issue.title}</h3>
        <p class="text-xs text-gray-500 mt-2">${issue.description.slice(0, 80)}...</p>
        <div class="flex flex-wrap gap-2 mt-3">${labelsHTML}</div>
        <div class="border-t mt-4 pt-2 text-xs text-gray-400">
          #${issue.id} by ${issue.author}<br />${date}
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openIssueModal(issue);
    });

    issuesGrid.appendChild(card);
  });
};
