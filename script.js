const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const dashboard = document.getElementById("dashboard");
const loginCard = document.querySelector(".card:not(.hidden)");
const logoutBtn = document.getElementById("logoutBtn");

// Check if we already have a valid session saved in this browser
if (localStorage.getItem("loggedIn") === "true") {
  showDashboard();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  message.textContent = "Checking...";
  message.className = "message";

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      message.textContent = "Success! Redirecting...";
      message.className = "message success";
      localStorage.setItem("loggedIn", "true");
      setTimeout(showDashboard, 500);
    } else {
      message.textContent = data.error || "Invalid username or password.";
      message.className = "message error";
    }
  } catch (err) {
    message.textContent = "Something went wrong. Try again.";
    message.className = "message error";
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  dashboard.classList.add("hidden");
  document.getElementById("loginForm").parentElement.classList.remove("hidden");
  form.reset();
});

function showDashboard() {
  document.querySelector(".card:not(.hidden)").classList.add("hidden");
  dashboard.classList.remove("hidden");
}