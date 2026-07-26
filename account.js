// If nobody's logged in, don't let them see this page — send them back
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "index.html";
}

const userEmail = localStorage.getItem("userEmail") || "";
document.getElementById("userEmail").textContent = userEmail;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  window.location.href = "index.html";
});