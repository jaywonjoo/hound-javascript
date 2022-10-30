const form = document.getElementById("new-todo-form");
const input = document.querySelector("#todo-input");
// const list = document.querySelector("#list");
//const div = document.querySelector("div");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // create new li
  const newEmptyListItem = document.createElement("li");

  // grab value inputted to input
  let todoItem = input.value;

  // put a checkbox on the list item
  // put a delete button on the list item

  // put inputted value into <li>
  newEmptyListItem.innerHTML = todoItem;

  // append <li> to list
  let newListItem = list.appendChild(newEmptyListItem);

  // add class list to created li
  newListItem.classList.add("list-item-label");

  const createdItem = document.getElementsByClassName("list-item-label");
  newListItem.addEventListener("click", () => {
    // console.log("blah");
    newListItem.remove();
    // console.log(div.innerHTML);
  });
});
