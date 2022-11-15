import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

// button to take you back to the homepage
const logoHomeButton = document.querySelector("#logoHomeButton");
logoHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// link to sign in page
const signInLink = document.querySelector("#signInLink");
signInLink.addEventListener("click", () => {
  window.location.href = "signin.html";
});

// FEATURE: AUTHENTICATION - SIGN UP FORM
const signupForm = document.querySelector("#signupForm")
signupForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const email = signupForm.email.value;
  const password = signupForm.password.value

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('user created:', userCredential.user)
      signupForm.reset()
      // window.location.href = "dashboard.html";
  })
  .catch((error) => {
    console.log(err.message)
  });

})