import "./index.css";

// ****************************************************************************************** //

// button to take users to the signin page
const loginButton = document.querySelector(".nav-login");
loginButton.addEventListener("click", () => {  
  window.location.href = "signin.html";
});

// button to take users to the signup page
const signUpButton = document.querySelector(".nav-register-bubble");
signUpButton.addEventListener("click", () => {
  window.location.href = "signup.html";
});




  const toggleButton = document.getElementsByClassName('toggle-button')[0]
  const navbarLinks = document.getElementsByClassName('navbar-links')[0]
  const navbarDropdown = document.getElementsByClassName('nav-dropdown')[0]

  toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
  })





