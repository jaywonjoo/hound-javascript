import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
} from 'firebase/firestore';
import "./index.css";


const firebaseConfig = {
    apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
    authDomain: "hound-e43f0.firebaseapp.com",
    projectId: "hound-e43f0",
    storageBucket: "hound-e43f0.appspot.com",
    messagingSenderId: "361705338046",
    appId: "1:361705338046:web:f04df4040689f429aa9aef"
  };

const button = document.getElementById("button");
const projectContainer = document.querySelector("#project-container");
// const newProject = document.createElement("li");

const modal = document.querySelector("#modal")
const openModalButton = document.querySelector("#open-modal-btn")
const closeModalButton = document.querySelector("#close-modal-btn")
const overlay = document.querySelector("#overlay")

// init firebase app
  initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'projects')

// realtime collection data
onSnapshot(colRef, (snapshot) => {
    let projects = []
    snapshot.docs.forEach((doc) => {
        projects.push({ ...doc.data(), id: doc.id })

        // if (projects[0]) {
        //   createProjectDiv()
        //   newProject.innerText = projects[0].name;
        // }

       
     })
    console.log(projects)
})


// **************************************************************************************** // 


// FEATURE: Create a new project
// 1. click on "New Project" to open modal & overlay
button.addEventListener("click", (e) => {
  e.preventDefault();

  openModal()
})
    // a. Actual function that opens the modal and overlay
    function openModal() {
      modal.classList.add("open")
      overlay.classList.add("open")
    }
// 2. Click on "Create Project" button to
const addProjectForm = document.querySelector('.modal-create-project-button')
    // a. Write the created project to Firestore (and reset the form after it's been submitted)
    addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault()

        addDoc(colRef, {
            name: addProjectForm.name.value,
        })
        .then(() => {
            addProjectForm.reset()
        })

        createProjectDiv();

        closeModal();
    })
    // b. Create a div for the created project to live in
      // BUG: OVERWRITES EXISTING DIV INSTEAD OF CREATING A NEW ONE???
    function createProjectDiv() {
      // const projectContainer = document.querySelector("#project-container");
      // const newProject = document.createElement("li");
      const newProject = document.createElement("li");
      projectContainer.appendChild(newProject);
      newProject.innerText = addProjectForm.name.value;
      newProject.classList.add("project-card");

      closeModal()

      // click on div to redirect user to another page
      const projectCard = document.querySelector(".project-card")
      projectCard.addEventListener("click", (e) => {
        window.location.href="project-page.html";
      })
    }
// 3. Close the modal
function closeModal() {
  modal.classList.remove("open")
  overlay.classList.remove("open")
}

// BONUS 4. Click on overlay to cancel operation
overlay.addEventListener("click", closeModal)


// **************************************************************************************** // 


// FEATURE: Deleting Documents
const deleteProjectForm = document.querySelector('.delete')
deleteProjectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const docRef = doc(db, 'projects', deleteProjectForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteProjectForm.reset()
            let projects = []
            if (!projects[0]) {
              projectContainer.removeChild(newProject)
            }
        })
})