import "./index.scss";

// loginRedirectButton()
const loginButton = document.querySelector(".nav-login");
// signUpRedirectButton()
const signUpButton = document.querySelector(".nav-register-bubble");
const startDoingButton = document.querySelector("#registerBtn");
// toggleHamburgerMenu()
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

loginRedirectButton()
signUpRedirectButton()
toggleHamburgerMenu()

function loginRedirectButton() {
  loginButton.addEventListener("click", () => {  
    window.location.href = "signin.html";
  });
}

function signUpRedirectButton() {
  signUpButton.addEventListener("click", () => {
    window.location.href = "signup.html";
  });

  startDoingButton.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
}

function toggleHamburgerMenu() {
  toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
    })  
}





