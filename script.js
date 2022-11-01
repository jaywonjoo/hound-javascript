const card = document.querySelectorAll(".expand-button");

card.forEach((el) =>
  el.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("blah");
  })
);

// document.querySelectorAll, addEventListener is not a function.
// // solution: you must iterate for each
// // https://stackoverflow.com/questions/63633414/getting-error-uncaught-typeerror-document-queryselectorall-addeventlistene
