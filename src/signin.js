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
const authInputs = document.querySelectorAll(".auth-input")
// Sign in Demo User
const demoUserLink = document.querySelector("#demoUserLink")
const emailAuthInput = document.querySelector("#emailAuthInput")
const passwordAuthInput = document.querySelector("#passwordAuthInput")
// button to take you back to the homepage
const logoHomeButton = document.querySelector(".logo-home-button-container");


signInDemoUser()


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

  signInSequence()

})



function signInDemoUser() {
  demoUserLink.addEventListener("click", () => {
    emailAuthInput.value = "test@test.com"
    passwordAuthInput.value = "123123"
    signInSequence()
  })
}



function signInSequence() {

  const email = signinForm.email.value;
  const password = signinForm.password.value

  // const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("user logged in", userCredential.user)
      window.location.href = "dashboard.html";

    })
    .catch((error) => {
      loginErrorMessage.setAttribute("style", "display: block")
      authInputs.forEach((input) => {
        input.blur()
        input.classList.add("is-focused")
      });
      // setTimeout(() => {
      //   loginErrorMessage.removeAttribute("style", "display: block")
      //   authInputs.forEach((input) => {
      //     input.classList.remove("is-focused")
      //   });
      // }, 1000);

    });
  }