// Sign-in logic
const signinForm = document.getElementById('signinForm');
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    localStorage.setItem('user', user);
    document.getElementById('status').innerText = 'Login successful!';
    setTimeout(() => (window.location.href = 'user.html'), 1000);
  });
}

// show username
if (document.getElementById('userName')) {
  document.getElementById('userName').innerText = localStorage.getItem('user');
}

// doctor detail
function viewDoctor(name) {
  let isLoggedIn = localStorage.getItem("userLoggedIn");

  if (!isLoggedIn) {
    alert("Please login first!");
    window.location.href = "signin.html";
  } else {
    alert("Consulting " + name);
  }
}

// doctor info display
if (document.getElementById('doctorInfo')) {
  const name = localStorage.getItem('doctorName');
  const monologues = {
    "Dr. Aisha Khan": "I believe in a holistic approach to patient care...",
    "Dr. Rohan Mehta": "Heart health is central to overall well-being...",
    "Dr. Neha Sharma": "Confidence starts with healthy skin..."
  };
  document.getElementById('doctorInfo').innerHTML = `<h2>${name}</h2><p>${monologues[name]}</p>`;
  document.getElementById('doctorName')?.setAttribute('value', name);
}

// appointment booking
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
  const doctorInput = document.getElementById('doctorName');
  doctorInput.value = localStorage.getItem('doctorName');

  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      doctor: doctorInput.value,
      user: document.getElementById('yourName').value,
      date: document.getElementById('date').value
    };
    let allAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    allAppointments.push(data);
    localStorage.setItem('appointments', JSON.stringify(allAppointments));
    document.getElementById('confirmMsg').innerText = 'Appointment booked successfully!';
  });
}

// display appointments (admin)
if (document.getElementById('appointmentsList')) {
  const list = JSON.parse(localStorage.getItem('appointments')) || [];
  const ul = document.getElementById('appointmentsList');
  list.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.user} booked ${item.doctor} on ${item.date}`;
    ul.appendChild(li);
  });
}

function isLoggedIn() {
  return localStorage.getItem("userLoggedIn") === "true";
}

// Redirect login button
function goToLogin() {
  window.location.href = "login.html";
}

// GLOBAL PROTECTION FOR ALL LINKS
function checkLogin(page) {
  if (!isLoggedIn()) {
    alert("Please login first to continue");
    window.location.href = "login.html";
  } else {
    window.location.href = page;
  }
}

function checkLogin(page) {
  if (localStorage.getItem("userLoggedIn") !== "true") {
    alert("Please login first");
    window.location.href = "login.html";
  } else {
    window.location.href = page;
  }
}

// Show username on dashboard
window.onload = function () {
  let name = localStorage.getItem("currentUser");

  if (name) {
    document.getElementById("name").innerText = name;
  } else {
    window.location.href = "login.html";
  }
};

// Logout
function logout() {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Open doctors page (with login check)
function openDoctors() {
  if (localStorage.getItem("userLoggedIn") !== "true") {
    alert("Please login first");
    window.location.href = "login.html";
  } else {
    window.location.href = "user.html#doctors";
  }
}

// Global navigation protection
function checkLogin(page) {
  if (localStorage.getItem("userLoggedIn") !== "true") {
    alert("Please login first");
    window.location.href = "login.html";
  } else {
    window.location.href = page;
  }
}

function goHome() {
  window.location.href = "user.html"; // main homepage
}

function toggleMenu() {
  let menu = document.getElementById("menu");

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}

// Close menu when clicking outside
window.onclick = function(event) {
  let menu = document.getElementById("menu");
  let hamburger = document.querySelector(".hamburger");

  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    menu.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("medicalForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let medicalData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        bloodGroup: document.getElementById("bloodGroup").value,
        diseases: document.getElementById("diseases").value,
        allergies: document.getElementById("allergies").value,
        medications: document.getElementById("medications").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        bp: document.getElementById("bp").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value
      };

      localStorage.setItem("medicalRecord", JSON.stringify(medicalData));

      document.getElementById("msg").innerText =
        "✅ Medical record saved successfully!";
    });
  }
});

function openInfo() {
  if (localStorage.getItem("userLoggedIn") !== "true") {
    alert("Please login first");
    window.location.href = "login.html";
  } else {
    window.location.href = "info.html"; // 👈 your user info page
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("appointmentForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let appointment = {
        id: Date.now(),
        doctor: document.getElementById("doctorName").value,
        name: document.getElementById("yourName").value,
        date: document.getElementById("date").value
      };

      let data = JSON.parse(localStorage.getItem("appointments")) || [];
      data.push(appointment);

      localStorage.setItem("appointments", JSON.stringify(data));

      document.getElementById("confirmMsg").innerText =
        "✅ Appointment booked successfully!";
    });
  }
});

window.addEventListener("load", function () {
  let container = document.getElementById("appointmentList");

  if (!container) return;

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  if (appointments.length === 0) {
    container.innerHTML = "<p>No appointments booked yet.</p>";
    return;
  }

  appointments.forEach(app => {
    let card = document.createElement("div");
    card.className = "doctor-card";

    card.innerHTML = `
      <h3> ${app.doctor}</h3>
      <p>Patient: ${app.name}</p>
      <p>Date: ${app.date}</p>
      <button onclick="cancelAppointment(${app.id})">Cancel</button>
    `;

    container.appendChild(card);
  });
});

function cancelAppointment(id) {
  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  appointments = appointments.filter(app => app.id !== id);

  localStorage.setItem("appointments", JSON.stringify(appointments));

  alert("❌ Appointment Cancelled");
  location.reload();
}

function openAppointments() {
  if (localStorage.getItem("userLoggedIn") !== "true") {
    alert("Please login first");
    window.location.href = "login.html";
  } else {
    window.location.href = "bookings.html";
  }
}

card.innerHTML = `
  <h3>${app.doctor}</h3>
  <p>Patient: ${app.name}</p>
  <p>Date: ${app.date}</p>
  <button onclick="cancelAppointment(${app.id})">Cancel</button>
`;