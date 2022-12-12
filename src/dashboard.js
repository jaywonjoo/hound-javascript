import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, serverTimestamp, Firestore, query,
  where, getDoc, orderBy, connectFirestoreEmulator, 
  updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./dashboard.css";
import "./dashboard800.css";
import "./nav.css";
import "./darkmode.css";


const firebaseConfig = {
  apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
  authDomain: "hound-e43f0.firebaseapp.com",
  projectId: "hound-e43f0",
  storageBucket: "hound-e43f0.appspot.com",
  messagingSenderId: "361705338046",
  appId: "1:361705338046:web:f04df4040689f429aa9aef",
};

// init firebase app
initializeApp(firebaseConfig);

// FEATURE: SECURITY WALL
const auth = getAuth();
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("body").style.display = "block";
  } else {
    window.location.replace("signin.html");
  }
});


// CONSTANTS ************************************************************************************************
const db = getFirestore();
const colRef = collection(db, "projects");
// Project populating
const starredProjectContainer = document.querySelector("#starred-project-container");
const userProjectContainer = document.querySelector("#project-container");
const sharedProjectContainer = document.querySelector("#shared-project-container");
const modal = document.getElementsByClassName("modal");
const modalBtnMulti = document.getElementsByClassName("open-modal-btn");
const overlay = document.getElementsByClassName("overlay");
// User icon Constants
const darkModeBtn = document.querySelector("#darkModeBtn")
const transparent = document.querySelectorAll(".transparent")
const solid = document.querySelectorAll(".solid")
const button = document.querySelectorAll(".button")
const logo = document.querySelectorAll(".logo")
const themeBtn = document.querySelector("#themeBtn")
const honme = document.querySelector('#honme')
const currentUserIdDiv = document.querySelector('#uid')
const currentUserDocRefDiv = document.querySelector('#idUid')
// Creating new projects
const addProjectForm = document.querySelector(".modal-create-project-button");
// Deleting projects
const deleteProjectForm = document.querySelector(".delete");
// setting data indexes
const projectCards = document.getElementsByClassName("project-card");
const starBtnMulti = document.getElementsByClassName("card-content-overlay-favorite-btn-star");
const starBtnContainer = document.getElementsByClassName("card-content-overlay-favorite-btn-container")
// MF: Opening and closing dashboards
const sidebarButton = document.querySelector(".sidebar-button");
const dashboardMasterMobile = document.querySelector(".dashboard-master")
const overlayer = document.querySelector(".blurred-overlay");
// Logging out
const logoutButton = document.querySelector("#logoutButton");
// Close overlay one
const overlayOne = document.querySelector("#overlayOne")

// FEATURES ************************************************************************************************

populateUserIconAndTheme()
populateProjectContainers()
closeOverlay()
createProject()
deleteProject()
setDataIndex()
logOut()


// MOBILE FEATURES ************************************************************************************************

openSidebar()
closeSideBar()
closeOverlayOne()
closeSidebarWithOverlay()

// FUNCTIONS ************************************************************************************************

function clearProjects(parentContainer) {
  while (parentContainer.children[0] != null) {
    parentContainer.removeChild(parentContainer.children[0]);
  }
}


function populateProjects(projectQuery, projectContainer) {
      // Create project cards
      let i = 0;
  onSnapshot(projectQuery, (snapshot) => {
    clearProjects(projectContainer);
    let sharedProjectsArray = [];
    snapshot.docs.forEach((doc) => {
      sharedProjectsArray.push({ ...doc.data(), id: doc.id });
    });

    for (i = 0; i < sharedProjectsArray.length; i++) {
      const newProjectUl = document.createElement("ul");
      newProjectUl.setAttribute("id", "projectCardMaster")
      projectContainer.appendChild(newProjectUl);
      
      const newProject = document.createElement("li");
      newProjectUl.appendChild(newProject);
      newProject.classList.add("project-card");
      const fetchedBackgroundURL = sharedProjectsArray[i].background;
      newProject.setAttribute("style", "background-image: url('"+ fetchedBackgroundURL +"'); background-size: cover; background-position: 50%")


      const cardFadeOverlay = document.createElement("span")
      newProject.appendChild(cardFadeOverlay);
      cardFadeOverlay.classList.add("card-fade-overlay");

      const cardContentOverlay = document.createElement("span")
      newProject.appendChild(cardContentOverlay);
      cardContentOverlay.classList.add("card-content-overlay");

      const cardContentOverlayProjectTitle = document.createElement("div")
      cardContentOverlay.appendChild(cardContentOverlayProjectTitle);
      cardContentOverlayProjectTitle.innerText = sharedProjectsArray[i].name;
      cardContentOverlayProjectTitle.classList.add("card-content-overlay-project-title");

      const cardContentOverlayBottomRow = document.createElement("div")
      cardContentOverlay.appendChild(cardContentOverlayBottomRow);
      cardContentOverlayBottomRow.classList.add("card-content-overlay-bottom-row");

      const cardContentOverlayFavoriteBtnContainer = document.createElement("div")
      cardContentOverlayBottomRow.appendChild(cardContentOverlayFavoriteBtnContainer);
      cardContentOverlayFavoriteBtnContainer.classList.add("card-content-overlay-favorite-btn-container");

      const cardContentOverlayFavoriteBtnStar = document.createElement("img")
      cardContentOverlayFavoriteBtnStar.classList.add("card-content-overlay-favorite-btn-star")
      cardContentOverlayFavoriteBtnContainer.appendChild(cardContentOverlayFavoriteBtnStar)

      const newProjectId = document.createElement("div");
      newProject.appendChild(newProjectId);
      newProjectId.innerText = sharedProjectsArray[i].id;
      newProjectId.classList.add("project-id-card");

      const idUid = document.querySelector('#idUid').textContent
      const currentUserDocRef = doc(db, 'users', idUid)
      const projectId = sharedProjectsArray[i].id;

      turnOffProjectHoverModal(newProjectUl)
      assignStarredStatus(currentUserDocRef, projectId, cardContentOverlayFavoriteBtnStar, cardContentOverlayFavoriteBtnContainer, newProjectUl)
    }
    setProjectDataIndex()
    projectRedirectLink()
  });
}


function createProjectDiv() {
  const newProject = document.createElement("div");
  projectContainer.appendChild(newProject);
  newProject.innerText = addProjectForm.name.value;
  newProject.classList.add("project-card");

  closeModal();
}

// closes modal after submitting form for new project
function closeModal() {
  const overlays = document.querySelectorAll(".overlay");
  overlays.forEach((overlay) => {
    overlay.classList.remove("open")
  })

  const modals = document.querySelectorAll(".modal");
  modals.forEach((modal) => {
      modal.classList.remove("open")
  })
}



// function to set theme to light on page load
function setThemeLight() {
  for (let i = 0; i < transparent.length; i++) {
      transparent[i].classList.add("light-mode-transparent")
      transparent[i].classList.remove("dark-mode-transparent")
  }

  for (let i = 0; i < solid.length; i++) {
      solid[i].classList.add("light-mode-solid")
      solid[i].classList.remove("dark-mode-solid")
  }

  for (let i = 0; i < button.length; i++) {
      button[i].classList.add("light-mode-button")
      button[i].classList.remove("dark-mode-button")
  }

  for (let i = 0; i < logo.length; i++) {
      logo[i].classList.add("light-mode-logo")
      logo[i].classList.remove("dark-mode-logo")
  }
}

// function to set theme to dark on page load
function setThemeDark() {
  for (let i = 0; i < transparent.length; i++) {
      transparent[i].classList.add("dark-mode-transparent")
      transparent[i].classList.remove("light-mode-transparent")
  }

  for (let i = 0; i < solid.length; i++) {
      solid[i].classList.add("dark-mode-solid")
      solid[i].classList.remove("light-mode-solid")
  }

  for (let i = 0; i < button.length; i++) {
      button[i].classList.add("dark-mode-button")
      button[i].classList.remove("light-mode-button")
  }

  for (let i = 0; i < logo.length; i++) {
      logo[i].classList.add("dark-mode-logo")
      logo[i].classList.remove("light-mode-logo")
  }
}



function setDataIndex() {
  let i = 0
  for (i = 0; i < modalBtnMulti.length; i++)
  {
      modalBtnMulti[i].setAttribute('data-index', i);
      modal[i].setAttribute('data-index', i);
      overlay[i].setAttribute('data-index', i);
  }

  for (i = 0; i < modalBtnMulti.length; i++)
  {
      modalBtnMulti[i].onclick = function() {
          let ElementIndex = this.getAttribute('data-index');
          modal[ElementIndex].classList.toggle("open")
          overlay[ElementIndex].classList.toggle("open")
      };
  }
}

function closeOverlay() {
  for (let i = 0; i < overlay.length; i++)
  {
      overlay[i].onclick = function() {
          let ElementIndex = this.getAttribute('data-index');
      //   modalparent[ElementIndex].classList.remove("hidden")
        modal[ElementIndex].classList.remove("open")
        overlay[ElementIndex].classList.remove("open")
      };
  }
}




function setProjectDataIndex() {
  let i = 0
  for (i = 0; i < starBtnMulti.length; i++)
  {
      starBtnMulti[i].setAttribute('data-index', i);
      projectCards[i].setAttribute('data-index', i);
      starBtnContainer[i].setAttribute('data-index', i);
      projectCards[i].parentElement.setAttribute('data-index', i);
  }
  
  for (let i = 0; i < starBtnMulti.length; i++) {

    const uid = document.querySelector('#uid').textContent
    const idUid = document.querySelector('#idUid').textContent

    starBtnMulti[i].onclick = function(e) {
          e.stopPropagation()
          let ElementIndex = this.getAttribute('data-index');

          const projectId = projectCards[ElementIndex].lastChild.textContent;
          const userRef = collection(db, 'users')

          const currentUserDocRef = doc(db, 'users', idUid)
          const selectedProject = doc(db, 'projects', projectId)

          if (projectCards[i].parentElement.classList.contains("favorited")) {
            starBtnContainer[i].classList.remove("favorited")
            starBtnMulti[i].classList.remove("favorited")
            projectCards[i].parentElement.classList.remove("favorited")
            starBtnContainer[i].classList.add("not-favorited")
            starBtnMulti[i].classList.add("not-favorited")
            projectCards[i].parentElement.classList.add("not-favorited")

            updateDoc(currentUserDocRef, {
              favorites: arrayRemove(projectId)
            })
            .then(() => {
              console.log("unfavorited!")
            })

            updateDoc(selectedProject, {
              favoritedby: arrayRemove(uid)
            })
            .then(() => {
              console.log("unfavorited!")
            })

            
          } else {
            starBtnContainer[i].classList.add("favorited")
            starBtnMulti[i].classList.add("favorited")
            projectCards[i].parentElement.classList.add("favorited")
            starBtnContainer[i].classList.remove("not-favorited")
            starBtnMulti[i].classList.remove("not-favorited")
            projectCards[i].parentElement.classList.remove("not-favorited")

            updateDoc(currentUserDocRef, {
              favorites: arrayUnion(projectId)
            })
            .then(() => {
              console.log("favorited!")
            })

            updateDoc(selectedProject, {
              favoritedby: arrayUnion(uid)
            })
            .then(() => {
              console.log("favorited!")
            })
          }


      };
}
}




function logOut() {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("the user signed out");
        window.location.href = "signin.html";
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}


function deleteProject() {
  deleteProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, "projects", deleteProjectForm.id.value);
    deleteDoc(docRef).then(() => {
      deleteProjectForm.reset();
    });
  });
}

function createProject() {
  addProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user !== null) {
      const uid = user.uid;
      console.log(uid);

      addDoc(colRef, {
        name: addProjectForm.name.value,
        creator: uid,
        background: "",
      }).then(() => {
        addProjectForm.reset();
        closeModal();
      });
    }
    createProjectDiv();
  });
}


function populateUserIconAndTheme() {

  onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const userRef = collection(db, 'users')

        const userCreatorDocRef = query(userRef, where("uid", "==", uid));
        onSnapshot(userCreatorDocRef, (snapshot) => {
          snapshot.docs.forEach((docs) => {

              let userListOne = []
              userListOne.push({ ...docs.data(), id: docs.id });

              const navUserIcon = document.querySelector(".nav-user-icon")
              navUserIcon.innerText = (userListOne[0].firstName.charAt(0) + userListOne[0].lastName.charAt(0));

              let lightString = String("light")
              let darkString = String("dark")

              // // SF: SET THEME 
              if (userListOne[0].theme == lightString) {
                  setThemeLight()
                  themeBtn.innerHTML = "Dark Mode"
                      console.log("blah")
              } else {
                  setThemeDark()
                  themeBtn.innerHTML = "Light Mode"
              console.log("blee")

              }

              // // SF: SET THEME 
              
              // // // SF: CHANGE THEME 

              const currentId = userListOne[0].uid
              currentUserIdDiv.innerText = currentId

              // Storing user fb id
              const currentUid = userListOne[0].id
              currentUserDocRefDiv.innerText = currentUid
              const currentUserDocRef = doc(db, 'users', currentUid)


              darkModeBtn.addEventListener("click", (e) => {
                  e.stopPropagation()

                  if (userListOne[0].theme == lightString) {
                      updateDoc(currentUserDocRef, {
                          theme: "dark"
                      })
                      // setThemeLight()
                      // themeBtn.innerHTML = "Dark Mode"
                          // console.log("blah")
                  } else {
                      updateDoc(currentUserDocRef, {
                          theme: "light"
                      })
                      console.log("bligg")
                  }
              })
              
            // SF: CHANGE THEME
          })
        })
      }
  })
}


function populateProjectContainers() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const starredProjects = query(colRef, where("favoritedby", 'array-contains', uid));
      const sharedProjects = query(colRef, where("collaborators", 'array-contains', uid));
      const userProjects = query(colRef, where("creator", "==", uid));

      populateProjects (starredProjects, starredProjectContainer)
      populateProjects (userProjects, userProjectContainer)
      populateProjects (sharedProjects, sharedProjectContainer)
    } else {
      window.location.replace("signin.html");
    }
  })
}

// MOBILE FUNCTIONS ************************************************************************************************


function turnOffProjectHoverModal(projectCard) {
  if (window.innerWidth <= 800) {
        projectCard.addEventListener('mouseenter', () => {
        console.log("enter")
        overlayOne.classList.add("open")
        });

      //   projectCard.addEventListener('mouseleave', () => {
      //   console.log("exit")
      //   overlayOne.classList.remove("open")
      // });
  }
}

function openSidebar() {
  sidebarButton.addEventListener("click", () => {
      dashboardMasterMobile.setAttribute("style", "left: 0")
      overlayer.setAttribute("style", "position: fixed; height: 100vh; left: 0%;")
      overlayer.classList.add("open")
  })
}

function closeSideBar() {
  dashboardMasterMobile.addEventListener("click", () => {
      dashboardMasterMobile.removeAttribute("style", "left")
      overlayer.classList.remove("open")
  })
}

function closeOverlayOne() {
  overlayOne.addEventListener("click", () => {
    overlayOne.classList.remove("open")
  })
  }

function closeSidebarWithOverlay() {
  overlayer.addEventListener("click", () => {
      dashboardMasterMobile.removeAttribute("style", "left")
      overlayer.classList.remove("open")
  })
}


// click on div to redirect user to project specific page
function projectRedirectLink() {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      const result = card.lastChild.textContent;
      const projectPage = ["project-page.html?project=" + result];
      window.location.href = projectPage;
    });
  });
}

function assignStarredStatus(currentUserDocRef, projectId, cardContentOverlayFavoriteBtnStar, cardContentOverlayFavoriteBtnContainer, newProjectUl) {
  getDoc(currentUserDocRef).then((snapshot) => {
    let userFavorites = snapshot.data().favorites;

    console.log(projectId)
    if (userFavorites.includes(projectId)){
    newProjectUl.classList.add("favorited")
    cardContentOverlayFavoriteBtnStar.classList.add("favorited")
    cardContentOverlayFavoriteBtnContainer.classList.add("favorited")
      console.log("it's favorited!")
    } else {
      console.log("it's not favorited!")
      newProjectUl.classList.add("not-favorited")
    }
  })
}