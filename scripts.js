const form = document.querySelector("#form");
const username = document.getElementById("username");
const errors = document.querySelector(".errors");
const errorList = document.querySelector(".errors-list");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("password-confirmation");
const terms = document.getElementById("terms");

let errorMessages = ["", "", "", ""];
let i = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //clearErrors();

  if (username.value.length < 6) {
    errorMessages.splice(0, 1, "Username must be at least 6 characters long");
    showErrors(errorMessages[0]);
  }

  if (password.value.length < 10) {
    errorMessages.splice(1, 1, "Password must be at least 10 characters long");
    showErrors(errorMessages[1]);
  }

  //      3. Ensure the password and confirmation password match
  if (password.value !== passwordCheck.value) {
    errorMessages.splice(2, 1, "Passwords do not match");
    showErrors(errorMessages[2]);
  }

  //      4. Ensure the terms checkbox is checked
  if (!terms.checked) {
    errorMessages.splice(3, 1, "Please agree to our terms and conditions");
    showErrors(errorMessages[3]);
  }

  //console.log(errorMessages[0]);
});

function showErrors(inputtedErrorMessage) {
  errors.classList.add("show");

  var li = document.createElement("li");
  li.innerHTML = inputtedErrorMessage;
  console.log(errorMessages);
  //console.log(li.innerHTML);
  errorList.appendChild(li);
}

// function clearErrors() {
//   errors.classList.remove("show");
//   var li = document.querySelector("li");

//   for (i = 0; i < errorMessages; i++) {
//     errorList.removeChild(li);
//   }
// }
