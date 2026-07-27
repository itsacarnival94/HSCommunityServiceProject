const form = document.getElementById("loginForm");
const message = document.getElementById("message");

// If already logged in, skip straight to the account page
if (localStorage.getItem("loggedIn") === "true") {
  window.location.href = "index.html";
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
      localStorage.setItem("userEmail", data.email);

      setTimeout(() => {
        window.location.href = "account.html";
      }, 500);
    } else {
      message.textContent = data.error || "Invalid username or password.";
      message.className = "message error";
    }
  } catch (err) {
    message.textContent = "Something went wrong. Try again.";
    message.className = "message error";
  }
});