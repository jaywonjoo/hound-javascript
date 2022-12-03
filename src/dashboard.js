import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./dashboard.css";
import "./dashboard800.css";
import "./nav.css";


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
const sharedProjectContainer = document.querySelector("#shared-project-container");


// const newProject = document.createElement("div");

const modal = document.querySelector("#modal");
const openModalButton = document.querySelector("#open-modal-btn");
const closeModalButton = document.querySelector("#close-modal-btn");
const overlay = document.getElementsByClassName("overlay");

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "projects");

// FEATURE: SECURITY WALL
const auth = getAuth();
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("body").style.display = "block";
  } else {
    window.location.replace("signin.html");
  }
});

// FEATURE: LOGOUT BUTTON
const logoutButton = document.querySelector("#logoutButton");
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

// // FEATURE: USER ICON
// const ProjectUsersDocRef = doc(db, 'projects', projectID)
// getDoc(ProjectUsersDocRef).then((snapshot) => {
//     const userRef = collection(db, 'users')
//     // grab project creator
//     let creator = snapshot.data().creator;
//     // console.log(creator)

//     const userCreatorDocRef = query(userRef, where("uid", "==", creator));
//     onSnapshot(userCreatorDocRef, (snapshot) => {
//         snapshot.docs.forEach((doc) => {

//             let userListOne = []

//             userListOne.push({ ...doc.data(), id: doc.id });
//             // console.log(userListOne[0].firstName)
            
//             const navUserIcon = document.querySelector(".nav-user-icon")

//             navUserIcon.innerText = (userListOne[0].firstName.charAt(0) + userListOne[0].lastName.charAt(0));
//         })
//     })
// })

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    const userRef = collection(db, 'users')

    const userCreatorDocRef = query(userRef, where("uid", "==", uid));
    onSnapshot(userCreatorDocRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {

            let userListOne = []

            userListOne.push({ ...doc.data(), id: doc.id });
            
            const navUserIcon = document.querySelector(".nav-user-icon")

            navUserIcon.innerText = (userListOne[0].firstName.charAt(0) + userListOne[0].lastName.charAt(0));
        })
    })

}})


// your projects queries
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const userProjects = query(colRef, where("creator", "==", uid));


    const sharedProjects = query(colRef, where("collaborators", "==", uid));


    // realtime collection data
    let i = 0;
    onSnapshot(userProjects, (snapshot) => {
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

    
    // ...
  } else {
    // User is signed out
    // ...
  }
});


// Make tickets clear and repopulate after deletion
function clearProjects() {
  while (projectContainer.children[0] != null) {
    projectContainer.removeChild(projectContainer.children[0]);
  }
}

// **************************************************************************************** //


// 2. Click on "Create Project" button to
const addProjectForm = document.querySelector(".modal-create-project-button");
// a. Write the created project to Firestore (and reset the form after it's been submitted)
addProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // outputs current user id ************************************
  const user = auth.currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
    console.log(uid);

    // ***********************************************************

    addDoc(colRef, {
      name: addProjectForm.name.value,
      creator: uid,
    }).then(() => {
      addProjectForm.reset();
    });
  }

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
// overlay.addEventListener("click", closeModal);

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







onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(uid)
    // const userProjects = query(colRef, where("creator", "==", uid));
    const sharedProjects = query(colRef, where("collaborators", 'array-contains', uid));

    // realtime collection data
    let i = 0;
onSnapshot(sharedProjects, (snapshot) => {
  clearSharedProjects();

  let sharedProjectsArray = [];
  snapshot.docs.forEach((doc) => {
    sharedProjectsArray.push({ ...doc.data(), id: doc.id });
  });

  for (i = 0; i < sharedProjectsArray.length; i++) {
    const newProject = document.createElement("div");
    sharedProjectContainer.appendChild(newProject);
    newProject.innerText = sharedProjectsArray[i].name;
    newProject.classList.add("project-card");
    const newProjectId = document.createElement("div");
    newProject.appendChild(newProjectId);
    newProjectId.innerText = sharedProjectsArray[i].id;
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

  console.log(sharedProjectsArray);
});
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// Make tickets clear and repopulate after deletion
function clearSharedProjects() {
  while (sharedProjectContainer.children[0] != null) {
    sharedProjectContainer.removeChild(sharedProjectContainer.children[0]);
  }
}


// MOBILE FEATURE: OPEN DASHBOARD ************************************************************************************************************************

const sidebarButton = document.querySelector(".sidebar-button");
const dashboardMasterMobile = document.querySelector(".dashboard-master")
const overlayer = document.querySelector(".blurred-overlay");


sidebarButton.addEventListener("click", () => {
    dashboardMasterMobile.setAttribute("style", "left: 0")
    overlayer.setAttribute("style", "position: fixed; height: 100vh; left: 0%;")
    overlayer.classList.add("open")

})

// MOBILE FEATURE: OPEN DASHBOARD ************************************************************************************************************************

// MOBILE FEATURE: CLOSE DASHBOARD ************************************************************************************************************************

dashboardMasterMobile.addEventListener("click", () => {
    dashboardMasterMobile.removeAttribute("style", "left")
    overlayer.classList.remove("open")
})

overlayer.addEventListener("click", () => {
    dashboardMasterMobile.removeAttribute("style", "left")
    overlayer.classList.remove("open")
})

// MOBILE FEATURE: CLOSE DASHBOARD ************************************************************************************************************************



// FEATURE: MULTIPLE MODALS ************************************************************************************************************************
const modalparent = document.getElementsByClassName("modal");
// modalparent.setAttribute("style", "top: 40%; left: 50%; transform: translate(-50%, -50%); border: 1px solid black; padding: 1rem; border-radius: .75rem; background-color: white;width: 30%; height: auto; box-shadow: 0 0 10px #919191;");


// Get the button that opens the modal

const modal_btn_multi = document.getElementsByClassName("open-modal-btn");
// const overlay = document.querySelector(".overlay")
// setTimeout(() => {

// When the user clicks the button, open the modal
setDataIndex()
function setDataIndex() {
    let i = 0
    for (i = 0; i < modal_btn_multi.length; i++)
    {
        modal_btn_multi[i].setAttribute('data-index', i);
        modalparent[i].setAttribute('data-index', i);
        overlay[i].setAttribute('data-index', i);
    }

    for (i = 0; i < modal_btn_multi.length; i++)
    {
        modal_btn_multi[i].onclick = function() {
            var ElementIndex = this.getAttribute('data-index');
        //   modalparent[ElementIndex].classList.remove("hidden")
          modalparent[ElementIndex].classList.add("open")
          overlay[ElementIndex].classList.add("open")
        };
    }

    // modal_btn_multi[0].onclick = function() {
    //     populateUserModal()
    // }

}
// }, "1000")

closeOverlays()
function closeOverlays() {
    // Close modal using overlay
    const overlays = document.querySelectorAll("#overlay");
    overlays.forEach((overlayer) => {
        overlayer.addEventListener("click", closeModal)
        function closeModal() {
            const modalss = document.querySelectorAll("#modal");
            modalss.forEach((modalll) => {
                modalll.classList.remove("open")
            })
            overlayer.classList.remove("open")
        }
    })
}

// FEATURE: MULTIPLE MODALS ************************************************************************************************************************
