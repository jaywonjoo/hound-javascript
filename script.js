// const projectSection = document.querySelector("#project-section");
const button = document.getElementById("button");
const projectContainer = document.querySelector("#project-container");
const newProject = document.createElement("div");

button.addEventListener("click", (e) => {
  e.preventDefault();
  projectContainer.appendChild(newProject);
  newProject.innerText = "blah";
  newProject.classList.add("project-card");
});
