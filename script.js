// Need something for add
// Need something for remove
// add hover effect to remove

const form = document.querySelector("#new-item-form");
const input = document.querySelector("#item-input");
const list = document.querySelector("#list");
const div = document.querySelector("div");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //   console.log(e);
  //   console.log(input.value);

  // create new div
  const newDiv = document.createElement("div");

  // grab value inputted to input
  let todoItem = input.value;

  // put inputted value into div
  newDiv.innerHTML = todoItem;

  // append div to list
  let newListItem = list.appendChild(newDiv);

  // add class list to created div
  newListItem.classList.add("list-item");

  //const createdItem = document.getElementsByClassName("list-item");
  newListItem.addEventListener("click", () => {
    // console.log("blah");
    newListItem.remove();
    // console.log(div.innerHTML);
  });
});
