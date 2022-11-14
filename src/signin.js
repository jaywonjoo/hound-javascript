// button to take you back to the homepage
const logoHomeButton = document.querySelector("#logoHomeButton");
logoHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// button to take you to the signin page
const signUpLink = document.querySelector("#signUpLink");
signUpLink.addEventListener("click", () => {
  window.location.href = "signup.html";
});

// button to take you to the dashboard
const signInButton = document.querySelector("#signInButton");
signInButton.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
