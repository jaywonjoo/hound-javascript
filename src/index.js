import "./index.css";

// button to take users to the signin page
const loginButton = document.querySelector("#loginButton");
loginButton.addEventListener("click", () => {
  window.location.href = "signin.html";
});

// button to take users to the signup page
const signUpButton = document.querySelector("#signUpButton");
signUpButton.addEventListener("click", () => {
  window.location.href = "signup.html";
});
