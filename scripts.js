const form = document.querySelector("#form");
const username = document.getElementById("username");
const errors = document.querySelector(".errors");
const errorList = document.querySelector(".errors-list");
const password = document.getElementById("password");
const passwordCheck = document.getElementById("password-confirmation");
const terms = document.getElementById("terms");

let errorMessages = [];

form.addEventListener("submit", (e) => {
  let errorMessages = [0, 0, 0, 0];
  let i = 0;

  e.preventDefault();
  clearErrors();

  if (username.value.length < 6) {
    errorMessages.splice(0, 1, "Username must be at least 6 characters long");
    showErrors(errorMessages[0]);
  } else {
    errorMessages.splice(0, 1, "a");
  }

  if (password.value.length < 10) {
    errorMessages.splice(1, 1, "Password must be at least 10 characters long");
    showErrors(errorMessages[1]);
  } else {
    errorMessages.splice(1, 1, "a");
  }

  //      3. Ensure the password and confirmation password match
  if (password.value !== passwordCheck.value) {
    errorMessages.splice(2, 1, "Passwords do not match");
    showErrors(errorMessages[2]);
  } else {
    errorMessages.splice(2, 1, "a");
  }

  //      4. Ensure the terms checkbox is checked
  if (!terms.checked) {
    errorMessages.splice(3, 1, "Please agree to our terms and conditions");
    showErrors(errorMessages[3]);
  } else {
    errorMessages.splice(3, 1, "a");
  }

  if (
    errorMessages[0] === "a" &&
    errorMessages[1] === "a" &&
    errorMessages[2] === "a" &&
    errorMessages[3] === "a"
  ) {
    window.location.href = "thank-you.html";
    //console.log("butts");
    //form.action = "thank-you.html";
  }
  //console.log(errorMessages[0]);
  //console.log(errorMessages);
});

function showErrors(inputtedErrorMessage) {
  errors.classList.add("show");

  var li = document.createElement("li");
  li.innerHTML = inputtedErrorMessage;
  //console.log(errorMessages);
  //console.log(li.innerHTML);
  errorList.appendChild(li);

  //console.log(errorMessages.filter(isOne).length);

  // function isOne(one) {
  //   return one === 1;
  // }

  //console.log(errorMessages.filter(isOne).length);

  // function isOne(one) {
  //   return one === 1;
  // }
}

function clearErrors() {
  errors.classList.remove("show");
  errorList.innerHTML = "";
  // for (i = 0; i < 4 - errorMessages.filter(isOne).length; i++) {
  //   //console.log("blah");
  //   let li = document.querySelector("li");
  //   errorList.removeChild(li);
  // }

  // function isOne(one) {
  //   return one === 1;
  // }
}

function redirect() {}
