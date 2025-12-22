
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

// ---------- SIGN UP ----------
function signUp(email, password) {
  if (!email || !password) {
    alert("Email and password are required");
    return;
  }

  const users = getUsers();
  const exists = users.some(user => user.email === email);

  if (exists) {
    alert("User already exists. Please sign in.");
    return;
  }

  users.push({ email, password });
  saveUsers(users);

  alert("Sign up successful! Please sign in.");
}

// ---------- SIGN IN ----------
function signIn(email, password) {
  const users = getUsers();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));
  updateAuthUI();

  alert("Login successful!");
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("loggedInUser");
  updateAuthUI();
  alert("Logged out successfully");
}

// ---------- UI HANDLER ----------
function updateAuthUI() {
  const user = getLoggedInUser();

  const authSection = document.getElementById("auth-section");
  const userSection = document.getElementById("user-section");
  const userEmail = document.getElementById("user-email");

  if (user) {
    // User is logged in
    authSection.style.display = "none";
    userSection.style.display = "block";
    userEmail.textContent = user.email;
  } else {
    // User is logged out
    authSection.style.display = "block";
    userSection.style.display = "none";
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateAuthUI);
