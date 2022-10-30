const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodos();
todos.forEach(renderTodo);

list.addEventListener("change", (e) => {
  if (!e.target.matches(`[data-list-item-checkbox]`)) return;

  // Get the todo that is clicked on
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  // toggle the complete property to be equal to the checkbox value
  todo.complete = e.target.checked;
  // save our updated todo
  saveTodos();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // prevent empty string from being input
  const todoName = todoInput.value;
  if (todoInput.value === "") return;
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  todos.push(newTodo);
  renderTodo(newTodo);
  saveTodos();
  //   todoInput.value = "";
});

list.addEventListener("click", (e) => {
  if (!e.target.matches(`[data-button-delete]`)) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;

  // remove the todo from the screen
  parent.remove();
  // remove the todo from the list
  todos = todos.filter((todo) => todo.id !== todoId);
  // save the new todos
  saveTodos();
});

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(`.list-item`);
  listItem.dataset.todoId = todo.id;
  const textElement = templateClone.querySelector(`[data-list-item-text]`);
  textElement.innerText = todo.name;
  const checkbox = templateClone.querySelector(`[data-list-item-checkbox]`);
  checkbox.checked = todo.complete;
  list.appendChild(templateClone);
}

// load Todos
function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}

// save Todos
function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}
