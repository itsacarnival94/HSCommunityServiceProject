const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    message.textContent = "Passwords don't match.";
    message.className = "message error";
    return;
  }

  message.textContent = "Creating your account...";
  message.className = "message";

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      message.textContent = "Account created! Redirecting to login...";
      message.className = "message success";
      setTimeout(() => {
        window.location.href = "login-portal.html";
      }, 1200);
    } else {
      message.textContent = data.error || "Could not create account.";
      message.className = "message error";
    }
  } catch (err) {
    message.textContent = "Something went wrong. Try again.";
    message.className = "message error";
  }
});