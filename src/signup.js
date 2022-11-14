// button to take you back to the homepage
const logoHomeButton = document.querySelector("#logoHomeButton");
logoHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

const signInLink = document.querySelector("#signInLink");
signInLink.addEventListener("click", () => {
  window.location.href = "signin.html";
});
