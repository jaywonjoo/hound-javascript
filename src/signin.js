import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./auth.scss";

const firebaseConfig = {
  apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
  authDomain: "hound-e43f0.firebaseapp.com",
  projectId: "hound-e43f0",
  storageBucket: "hound-e43f0.appspot.com",
  messagingSenderId: "361705338046",
  appId: "1:361705338046:web:f04df4040689f429aa9aef",
};

// firebase stuff
initializeApp(firebaseConfig);

// homePageLink()
const logoHomeButton = document.querySelector(".home-btn");
// signInForm()
const signinForm = document.querySelector("#signinForm")
// signInSequence()
const auth = getAuth();
const loginErrorMessage = document.querySelector(".error-message")
const authInputs = document.querySelectorAll(".auth-input")
// signUpPageLink()
const signUpLink = document.querySelector("#signUpLink");
// signInDemoUser()
const demoUserLink = document.querySelector("#demoUserLink")
const emailAuthInput = document.querySelector("#emailAuthInput")
const passwordAuthInput = document.querySelector("#passwordAuthInput")


homePageLink()
signInForm()
signUpPageLink()
signInDemoUser()


function homePageLink() {
  logoHomeButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function signInForm() {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signInSequence()
  })
}

function signInSequence() {
  const email = signinForm.email.value;
  const password = signinForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user logged in", userCredential.user)
      window.location.href = "dashboard.html";
  })
  .catch(() => {
    loginErrorMessage.setAttribute("style", "display: block")
    authInputs.forEach((input) => {
      input.blur()
      input.classList.add("is-focused")
    });
  });
}

function signUpPageLink() {
  signUpLink.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
}

function signInDemoUser() {
  demoUserLink.addEventListener("click", () => {
    emailAuthInput.value = "test@test.com"
    passwordAuthInput.value = "123123"
    signInSequence()
  })
}