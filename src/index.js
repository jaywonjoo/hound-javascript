import "./index.scss";

// loginRedirectButton()
const loginButton = document.querySelector(".header-nav-links-login");
// signUpRedirectButton()
const signUpButton = document.querySelector(".header-nav-links-register");
const startDoingButton = document.querySelector("#registerBtn");
// toggleHamburgerMenu()
const toggleButton = document.getElementsByClassName('header-toggle-btn')[0]
const navbarLinks = document.getElementsByClassName('header-nav-links')[0]

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





