import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./auth.css";

const firebaseConfig = {
  apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
  authDomain: "hound-e43f0.firebaseapp.com",
  projectId: "hound-e43f0",
  storageBucket: "hound-e43f0.appspot.com",
  messagingSenderId: "361705338046",
  appId: "1:361705338046:web:f04df4040689f429aa9aef",
};

// init firebase app
initializeApp(firebaseConfig);

// link authentication features
const auth = getAuth();

const loginErrorMessage = document.querySelector(".error-message")
const loginInputs = document.getElementsByClassName("input")

// button to take you back to the homepage
const logoHomeButton = document.querySelector(".logo-home-button-container");
logoHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// button to take you to the signin page
const signUpLink = document.querySelector("#signUpLink");
signUpLink.addEventListener("click", () => {
  window.location.href = "signup.html";
});


// FEATURE: AUTHENTICATION - SIGN IN FORM
const signinForm = document.querySelector("#signinForm")
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signinForm.email.value;
  const password = signinForm.password.value

  // const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user logged in", userCredential.user)
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // console.log(err.message)
      loginErrorMessage.setAttribute("style", "display: block")
    });
})

