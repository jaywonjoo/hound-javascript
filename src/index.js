import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
} from 'firebase/firestore';
import "./styles.css";


const firebaseConfig = {
    apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
    authDomain: "hound-e43f0.firebaseapp.com",
    projectId: "hound-e43f0",
    storageBucket: "hound-e43f0.appspot.com",
    messagingSenderId: "361705338046",
    appId: "1:361705338046:web:f04df4040689f429aa9aef"
  };

// init firebase app
  initializeApp(firebaseConfig)

// // init services
// const db = getFirestore()

// // collection ref
// const colRef = collection(db, 'books')

// // realtime collection data
// onSnapshot(colRef, (snapshot) => {
//     let books = []
//     snapshot.docs.forEach((doc) => {
//         books.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(books)
// })

// // adding documents
// const addBookForm = document.querySelector('.add')
// addBookForm.addEventListener('submit', (e) => {
//     e.preventDefault()

//     addDoc(colRef, {
//         title: addBookForm.title.value,
//         author: addBookForm.author.value,
//     })
//     .then(() => {
//         addBookForm.reset()
//     })
// })

// // deleting documents
// const deleteBookForm = document.querySelector('.delete')
// deleteBookForm.addEventListener('submit', (e) => {
//     e.preventDefault()
    
//     const docRef = doc(db, 'books', deleteBookForm.id.value)
//     deleteDoc(docRef)
//         .then(() => {
//             deleteBookForm.reset()
//         })

// })


// merge


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

  // click on div to redirect user to another page
  const projectCard = document.querySelector(".project-card")
  projectCard.addEventListener("click", (e) => {
    window.location.href="project-page.html";
  })
}


// click on overlay to cancel operation
overlay.addEventListener("click", closeModal)

function closeModal() {
  modal.classList.remove("open")
  overlay.classList.remove("open")
}


function redirect() {
  
}