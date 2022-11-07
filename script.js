// const projectSection = document.querySelector("#project-section");

const button = document.getElementById("button");
const projectContainer = document.querySelector("#project-container");
const newProject = document.createElement("div");

// button.addEventListener("click", (e) => {
//   e.preventDefault();
//   projectContainer.appendChild(newProject);
//   newProject.innerText = "blah";
//   newProject.classList.add("project-card");
// });



const modal = document.querySelector("#modal")
const openModalButton = document.querySelector("#open-modal-btn")
const closeModalButton = document.querySelector("#close-modal-btn")
const overlay = document.querySelector("#overlay")

button.addEventListener("click", (e) => {
    e.preventDefault();

    openModal()
})


// click on "New Project" to open modal
function openModal() {
    modal.classList.add("open")
    overlay.classList.add("open")
}

// user inputs project name
// user presses "close modal" button
// JS takes the input and sets it as the inner text of the created div

closeModalButton.addEventListener("click", createProject)

function createProject() {
  const input = document.querySelector("#item-input");
  
  projectContainer.appendChild(newProject);
  newProject.innerText = input.value;
  newProject.classList.add("project-card");

  closeModal()
}


// click on overlay to cancel operation
overlay.addEventListener("click", closeModal)

function closeModal() {
  modal.classList.remove("open")
  overlay.classList.remove("open")
}