import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import "./dashboard.css";

const firebaseConfig = {
  apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
  authDomain: "hound-e43f0.firebaseapp.com",
  projectId: "hound-e43f0",
  storageBucket: "hound-e43f0.appspot.com",
  messagingSenderId: "361705338046",
  appId: "1:361705338046:web:f04df4040689f429aa9aef",
};

const button = document.getElementById("button");
const projectContainer = document.querySelector("#project-container");
// const newProject = document.createElement("div");

const modal = document.querySelector("#modal");
const openModalButton = document.querySelector("#open-modal-btn");
const closeModalButton = document.querySelector("#close-modal-btn");
const overlay = document.querySelector("#overlay");

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "projects");

// FEATURE: SECURITY WALL
const auth = getAuth()
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("body").style.display = "block";
  } else {
    window.location.replace("signin.html")
  }
});

// FEATURE: LOGOUT BUTTON
const logoutButton = document.querySelector('#logoutButton')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('the user signed out')
      window.location.href = "signin.html";
    })
    .catch((err) => {
      console.log(err.message)
    })
})

// realtime collection data
let i = 0;
onSnapshot(colRef, (snapshot) => {
  clearProjects();

  let projects = [];
  snapshot.docs.forEach((doc) => {
    projects.push({ ...doc.data(), id: doc.id });
  });

  for (i = 0; i < projects.length; i++) {
    const newProject = document.createElement("div");
    projectContainer.appendChild(newProject);
    newProject.innerText = projects[i].name;
    newProject.classList.add("project-card");
    const newProjectId = document.createElement("div");
    newProject.appendChild(newProjectId);
    newProjectId.innerText = projects[i].id;
    newProjectId.classList.add("project-id-card");

    // // click on div to redirect user to another page
    // newProject.addEventListener("click", (e) => {
    //   window.location.href="project-page.html?project=coyote";
    // })
  }

  // click on div to redirect user to project specific page
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const result = card.lastChild.textContent;
      const projectPage = ["project-page.html?project=" + result];
      // console.log(projectPage)
      // console.log(result);
      window.location.href = projectPage;
    });
  });

  console.log(projects);
});

// Make tickets clear and repopulate after deletion
function clearProjects() {
  while (projectContainer.children[0] != null) {
    projectContainer.removeChild(projectContainer.children[0]);
  }
}

// **************************************************************************************** //

// FEATURE: Create a new project
// 1. click on "New Project" to open modal & overlay
button.addEventListener("click", (e) => {
  e.preventDefault();

  openModal();
});
// a. Actual function that opens the modal and overlay
function openModal() {
  modal.classList.add("open");
  overlay.classList.add("open");
}
// 2. Click on "Create Project" button to
const addProjectForm = document.querySelector(".modal-create-project-button");
// a. Write the created project to Firestore (and reset the form after it's been submitted)
addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    name: addProjectForm.name.value,
  }).then(() => {
    addProjectForm.reset();
  });

  createProjectDiv();

  closeModal();
});
// b. Create a div for the created project to live in
// BUG: OVERWRITES EXISTING DIV INSTEAD OF CREATING A NEW ONE???
function createProjectDiv() {
  // const projectContainer = document.querySelector("#project-container");
  // const newProject = document.createElement("div");
  const newProject = document.createElement("div");
  projectContainer.appendChild(newProject);
  newProject.innerText = addProjectForm.name.value;
  newProject.classList.add("project-card");

  closeModal();
}
// 3. Close the modal
function closeModal() {
  modal.classList.remove("open");
  overlay.classList.remove("open");
}

// BONUS 4. Click on overlay to cancel operation
overlay.addEventListener("click", closeModal);

// **************************************************************************************** //

// FEATURE: Deleting Documents
const deleteProjectForm = document.querySelector(".delete");
deleteProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "projects", deleteProjectForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteProjectForm.reset();
  });
});
