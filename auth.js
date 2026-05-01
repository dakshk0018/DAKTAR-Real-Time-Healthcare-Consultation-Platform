// SIGNUP FUNCTION
function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (name === "" || email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  let user = {
    name: name,
    email: email,
    password: password
  };

  // Save user in localStorage
  localStorage.setItem(email, JSON.stringify(user));

  alert("Signup successful! Please login.");

  // ✅ IMPORTANT CHANGE: go to login page
  window.location.href = "login.html";
}


// LOGIN FUNCTION
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let storedUser = localStorage.getItem(email);

  if (!storedUser) {
    alert("User not found. Please sign up.");
    return;
  }

  let user = JSON.parse(storedUser);

  if (user.password === password) {
  alert("Login successful!");

  localStorage.setItem("userLoggedIn", "true");
  localStorage.setItem("currentUser", user.name); // 👈 ADD THIS

  window.location.href = "user.html"; // 👈 redirect to user page
}
else {
    alert("Incorrect password!");
  }
}