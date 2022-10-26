/*
  TODO: 2. Select all elements needed
    * The form element (has the id `quiz-form`)
    * The answer inputs (have the class `answer`)
    * BONUS: The questions (have the class `question-item`)
    * BONUS: The alert (has the id `alert`)
*/

const form = document.querySelector("#quiz-form");
const answer = document.querySelectorAll(".answer");
const questionItem = document.querySelectorAll(".question-item");

// TODO: 3. Create a submit event listener for the form that does the following.
//    1. Prevent the default behaviour
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //    2. Get all selected answers (use the `checked` property on the input to determine if it is selected or not)
  //    3. Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
  for (let i = 0; i < 12; i++) {
    //console.log(answer[i].checked);
    //console.log(answer[i].value);

    //    4. For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
    if (answer[i].checked && answer[i].value == "true") {
      //console.log("yay");
      //console.log(answer[i].closest(".question-item"));
      answer[i].closest(".question-item").classList.add("correct");
      answer[i].closest(".question-item").classList.remove("incorrect");
    }

    //    5. For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
    if (answer[i].checked && answer[i].value == "false") {
      answer[i].closest(".question-item").classList.add("incorrect");
      answer[i].closest(".question-item").classList.remove("correct");
    }
  }
});

//    6. BONUS: Make sure unanswered questions show up as incorrect. The easiest way to do this is to add the incorrect class and removing the correct class from all question items before checking the correct answers
//    7. BONUS: If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)
