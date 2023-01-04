import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, serverTimestamp, Firestore, query,
  where, getDoc, orderBy, connectFirestoreEmulator, 
  updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./projects.scss";
import "./projects800.scss";
import "./nav.scss";
import "./darkmode.scss";


const firebaseConfig = {
    apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
    authDomain: "hound-e43f0.firebaseapp.com",
    projectId: "hound-e43f0",
    storageBucket: "hound-e43f0.appspot.com",
    messagingSenderId: "361705338046",
    appId: "1:361705338046:web:f04df4040689f429aa9aef"
  };

// Firebase Stuff
initializeApp(firebaseConfig)
const auth = getAuth()

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("body").style.display = "block";
  } else {
    window.location.replace("signin.html")
  }
});

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
const projectID = params.project;
const db = getFirestore()
const colRef = collection(db, 'projects', projectID, 'tickets')

const modal = document.getElementsByClassName("modal");
const modalBtnMulti = document.getElementsByClassName("open-modal-btn");
const overlay = document.getElementsByClassName("overlay");
const dashboardButton = document.querySelector('#dashboardButton')
const logoutButton = document.querySelector('#logoutButton')
// Dashboard button
const darkModeBtn = document.querySelector("#darkModeBtn")
const transparent = document.querySelectorAll(".transparent")
const solid = document.querySelectorAll(".solid")
const button = document.querySelectorAll(".button")
const logo = document.querySelectorAll(".logo")
const themeBtn = document.querySelector("#themeBtn")
const ProjectUsersDocRef = doc(db, 'projects', projectID)
const currentUserIdDiv = document.querySelector('#uid')
const currentUserDocRefDiv = document.querySelector('#idUid')
// Populate project header
const projectHeader = document.querySelector(".page-header")
const projectHeaderRef = doc(db, 'projects', projectID)
// Comment Creation
const userRef = collection(db, "users");
// Add Member Form
const modalAddMemberForm = document.querySelector(".modal-add-members-form")
// Create Ticket
const projectRef = collection(db, 'projects')
const createTicketForm = document.querySelector('.create-ticket-form')
// Pie Chart Status
const dashboardMaster = document.querySelector(".dashboard-master")
const pieContainerOne = document.querySelector("#pie-container-one")
const pieUnresolved = document.createElement("div")
const pieInProgress = document.createElement("div")
const pieResolved = document.createElement("div")
const pieContainerTwo = document.querySelector("#pie-container-two")
const pieIssue = document.createElement("div")
const pieBug = document.createElement("div")
const pieFeatureRequest = document.createElement("div")
const pieContainerThree = document.querySelector("#pie-container-three")
const pieLow = document.createElement("div")
const pieMedium = document.createElement("div")
const pieHigh = document.createElement("div")
// Edit Ticket Form
const editTicketForm = document.querySelector(".edit-ticket-form")
// Mobile: Open Sidebar
const sidebarButton = document.querySelector(".sidebar-btn-master");
const dashboardMasterMobile = document.querySelector(".sidebar-master")
const overlayer = document.querySelector(".overlay-blurred");
// Custom Background
const body = document.querySelector("#body")
// Hide background input on submit
const setBackgroundFormBtn = document.querySelector("#setBackgroundFormBtn")
const setBackgroundFormBtnInput = document.querySelector("#setBackgroundFormBtnInput")
// Write inputted background to firebase
const setBackgroundForm = document.querySelector("#setBackgroundForm")
// Populate collaborators
const teamMemberBody = document.querySelector(".team-members-body") 
// clearsystemuserlist
const populatableMemberDiv = document.querySelector("#populatable-member-div")
// Darkmode button
const darkModeSwitch = document.querySelector("#switch")
// Populate user info modal
const userIconMedium = document.querySelector(".modal-user-dropdown-user-card-icon-medium")
const udoName = document.querySelector(".modal-user-dropdown-user-card-right-name")
const udoemail = document.querySelector(".modal-user-dropdown-user-card-right-email")
// 
const bottomDot = document.getElementsByClassName("pie-legend-bottom-dot")
const middleDot = document.getElementsByClassName("pie-legend-middle-dot")
const topDot = document.getElementsByClassName("pie-legend-top-dot")

redirectToDashboard()
logoutUser()
populateUserIconAndTheme()
populateProjectName()
populateTeamMembers()
populateAddUserModal()
populateTickets()
commentCreation()
addMemberButton()
createTicketButton()
editTicketSubmitButton()
hideBackgroundInputOnSubmit()
writeInputtedBackgroundToFirebase()

openSidebar()
closeSidebarOnClick()
closeSidebarWithOverlay()
loadBackground()


function redirectToDashboard() {
    dashboardButton.addEventListener('click', () => {
        window.location.href = "dashboard.html";
    })    
}

function logoutUser() {
    logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
        window.location.href = "signin.html";
        })
        .catch((err) => {
        console.log(err.message)
        })
    })
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
  
                const navUserIcon = document.querySelector(".header-right-user-icon")
                navUserIcon.innerText = (userListOne[0].firstName.charAt(0) + userListOne[0].lastName.charAt(0));
  
                let lightString = String("light")
                let darkString = String("dark")
  
                // Set theme on page load
                if (userListOne[0].theme == lightString) {
                  darkModeSwitch.checked = true;
                  themeBtn.innerHTML = "Dark Mode"
                  setThemeLight()

                  let bottom = "rgba(0, 0, 0, .3)"
                  let middle = "rgba(0, 0, 0, .5)"
                  let top = "rgba(0, 0, 0, .9)"
                  pieChartStatus(bottom, middle, top)

                } else {
                  darkModeSwitch.checked = false;
                  themeBtn.innerHTML = "Light Mode"
                  setThemeDark()

                  let bottom = "rgba(255, 255, 255, .3)"
                  let middle = "rgba(255, 255, 255, .5)"
                  let top = "rgba(255, 255, 255, .9)"
                  pieChartStatus(bottom, middle, top)
                }
                
                // Storing user firebase id
                const currentId = userListOne[0].uid
                currentUserIdDiv.innerText = currentId
                const currentUid = userListOne[0].id
                currentUserDocRefDiv.innerText = currentUid
                const currentUserDocRef = doc(db, 'users', currentUid)
  
                // Change theme with button
                darkModeSwitch.addEventListener("click", (e) => {
                    e.stopPropagation()
  
                    if (userListOne[0].theme == lightString) {
                        updateDoc(currentUserDocRef, {
                            theme: "dark"
                        })
                    } else {
                        updateDoc(currentUserDocRef, {
                            theme: "light"
                        })
                    }
                })
                populateUserInfoModal(currentUid)
            })
          })
        }
    })
  }

function populateUserInfoModal(currentUid) {
    const asdf = doc(db, 'users', currentUid)
    getDoc(asdf).then((snapshot) => {
        const userIcon = snapshot.data().firstName.charAt(0) + snapshot.data().lastName.charAt(0)
        const fullName = snapshot.data().firstName + " " + snapshot.data().lastName
        const userEmail = snapshot.data().email

        userIconMedium.innerText = userIcon
        udoName.innerText = fullName
        udoemail.innerText = userEmail
    })
}

function populateProjectName() {
    getDoc(ProjectUsersDocRef).then((snapshot) => {
        projectHeader.innerHTML = snapshot.data().name
    })
}

function populateTeamMembers(){
    onSnapshot(ProjectUsersDocRef, (snapshot) => {
        let collaborators = snapshot.data().collaborators
        if (collaborators) {
            let collaboratorList = []
                clearUsers()

                for (let i = 0; i < collaborators.length; i++) {
                    const userCurrentCollaboratorDocRef = query(userRef, where("uid", "==", collaborators[i]));

                    onSnapshot(userCurrentCollaboratorDocRef, (snapshot) => {
                        snapshot.docs.forEach((docs) => {

                            collaboratorList.push({ ...docs.data(), id: docs.id });
                            clearUsers()

                            if (i == collaborators.length - 1) {
                                for (let j = 0; j < collaboratorList.length; j++) {
                                    populateMemberList(collaboratorList, j)
                                }
                            }
                        })
                    })
                }
            setDataIndex()
            closeOverlay()                    
        } else {
            setDataIndex()
            closeOverlay()
        }
    })
}

function clearUsers() {
    while (teamMemberBody.children[0] != null) {
        teamMemberBody.removeChild(teamMemberBody.children[0]);
    }
}


function populateMemberList(collaboratorList, j) {
    const teamMemberLineItem = document.createElement("div")
    const teamMemberLineItemName = document.createElement("div")
    const teamMemberLineItemEmail = document.createElement("div")
    const teamMemberLineItemPhone = document.createElement("div")
    const teamMemberLineItemKebabDiv = document.createElement("div")
    const teamMemberLineItemKebab = document.createElement("button")
    const teamMemberLineItemKebabText = document.createElement("span")
    const teamMemberLineItemId = document.createElement("div")
    const teamMemberLineItemOverlay = document.createElement("div")
    const teamMemberLineItemModal = document.createElement("div")
    const teamMemberLineItemDeleteButton = document.createElement("button")

    teamMemberBody.appendChild(teamMemberLineItem)
    teamMemberLineItem.appendChild(teamMemberLineItemName)
    teamMemberLineItem.appendChild(teamMemberLineItemEmail)
    teamMemberLineItem.appendChild(teamMemberLineItemPhone)
    teamMemberLineItem.appendChild(teamMemberLineItemKebabDiv)
    teamMemberLineItemKebabDiv.appendChild(teamMemberLineItemKebab)
    teamMemberLineItemKebab.appendChild(teamMemberLineItemKebabText)
    teamMemberLineItem.appendChild(teamMemberLineItemOverlay)
    teamMemberLineItem.appendChild(teamMemberLineItemModal)
    teamMemberLineItemModal.appendChild(teamMemberLineItemDeleteButton)
    teamMemberLineItemModal.appendChild(teamMemberLineItemId)

    let fullName = collaboratorList[j].firstName + " " + collaboratorList[j].lastName
    teamMemberLineItemName.innerText = fullName;
    teamMemberLineItemEmail.innerText = collaboratorList[j].email;
    teamMemberLineItemPhone.innerText = collaboratorList[j].phoneNumber;
    teamMemberLineItemKebabText.innerText = "...";
    teamMemberLineItemDeleteButton.innerText = "delete"
    teamMemberLineItemId.innerText = collaboratorList[j].uid;

    teamMemberLineItemKebabDiv.classList.add("team-member-line-item-kebab-div");
    teamMemberLineItem.classList.add("team-member-line-item");
    teamMemberLineItemName.classList.add("team-members-categories-name");
    teamMemberLineItemEmail.classList.add("team-members-categories-email");
    teamMemberLineItemPhone.classList.add("team-members-categories-phone");
    teamMemberLineItemKebab.classList.add("team-member-line-item-kebab");
    teamMemberLineItemKebab.classList.add("open-modal-btn");
    teamMemberLineItemId.setAttribute("style", "display: none");
    teamMemberLineItemOverlay.classList.add("overlay");
    teamMemberLineItemKebabText.classList.add("team-member-line-item-kebab-text");
        
    teamMemberLineItemOverlay.setAttribute("style", "position: fixed; top: -100vh; left: -100vw; padding: 100vh 100vw; backdrop-filter: none; background-color: rgb(255, 255, 255, 0);");
    teamMemberLineItemModal.classList.add("modal");
    teamMemberLineItemModal.classList.add("delete-button-modal");
    teamMemberLineItemDeleteButton.classList.add("team-member-delete-button");
            
    teamMemberLineItemDeleteButtonFn(teamMemberLineItemDeleteButton, teamMemberLineItemModal, ProjectUsersDocRef, teamMemberBody)
    setDataIndex()
    closeOverlay()  
}

function addMemberButton() {
    modalAddMemberForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newMemberCheckboxDiv = document.querySelectorAll(".new-member-checkbox-div")

        newMemberCheckboxDiv.forEach((checkbox) => {
            if(checkbox.checked) {
                const selectedUserId = checkbox.parentElement.lastElementChild.innerText

                const projectCollaborators = doc(db, 'projects', projectID)
                updateDoc(projectCollaborators, {
                    collaborators: arrayUnion(selectedUserId)
                })
                .then(() => {
                    checkbox.checked = false;
                    setDataIndex()
                    closeOverlay()
                })
            }
        })
        closeModal();
    })
}

function teamMemberLineItemDeleteButtonFn(teamMemberLineItemDeleteButton, teamMemberLineItemModal, ProjectUsersDocRef, teamMemberBody) {
    teamMemberLineItemDeleteButton.addEventListener("click", () => {
        const selectedUserId = teamMemberLineItemModal.lastElementChild.innerText

        updateDoc(ProjectUsersDocRef, {
            collaborators: arrayRemove(selectedUserId)
        })
        .then(() => {
            setDataIndex()
            closeOverlay()
        })
    })
}

function clearSystemUsersList() {
    while (populatableMemberDiv.children[0] != null) {
        populatableMemberDiv.removeChild(populatableMemberDiv.children[0]);
    }
}

function populateAddUserModal() {
        const systemUsers = collection(db, 'users')
        const alphabetizedSystemUsers = query(systemUsers, orderBy("firstName"))

        onSnapshot(alphabetizedSystemUsers, (snapshot) => {
            let SystemUsersList = []
            clearSystemUsersList()
            
            snapshot.docs.forEach((doc) => {
                SystemUsersList.push({ ...doc.data(), id: doc.id })
            })

            let i = 0
            for (i = 0; i < SystemUsersList.length; i++) {
                const populatableMemberDiv = document.querySelector("#populatable-member-div")
                
                const newMemberMainDiv = document.createElement("div")
                const newMemberCheckboxDiv = document.createElement("input")
                newMemberCheckboxDiv.setAttribute("type", "checkbox");
                const newMemberNameDiv = document.createElement("div")
                const newMemberEmailDiv = document.createElement("div")
                const newMemberIdDiv = document.createElement("div")

        
                populatableMemberDiv.appendChild(newMemberMainDiv);
                newMemberMainDiv.appendChild(newMemberCheckboxDiv);
                newMemberMainDiv.appendChild(newMemberNameDiv);
                newMemberMainDiv.appendChild(newMemberEmailDiv);
                newMemberMainDiv.appendChild(newMemberIdDiv);
        
                newMemberNameDiv.innerText = (SystemUsersList[i].firstName + " " + SystemUsersList[i].lastName);
                newMemberEmailDiv.innerText = (SystemUsersList[i].email);
                newMemberIdDiv.innerText = (SystemUsersList[i].uid);
        
                newMemberMainDiv.classList.add("new-member-main-div")
                newMemberCheckboxDiv.classList.add("new-member-checkbox-div")
                newMemberNameDiv.classList.add("new-member-name-div")
                newMemberEmailDiv.classList.add("new-member-email-div")
                newMemberIdDiv.classList.add("hidden")
            }
        })

}

function populateTickets() {
    const orderedTicketsRef = query(colRef, orderBy("createdAt"))

    onSnapshot(orderedTicketsRef, (snapshot) => {
        let tickets = []
        clearTickets()

        snapshot.docs.forEach((doc) => {
            tickets.push({ ...doc.data(), id: doc.id })
        });
            
        let i = 0;
        for (i = 0; i < tickets.length; i++) {
            populateTicket()

            function populateTicket() {
                const ticketContainer = document.querySelector("#tickets")
                const ticketUl = document.createElement("div")
                const populateTicketInfoSection = document.createElement("div")
                const TicketTitle = document.createElement("div");
                const TicketDescription = document.createElement("div");
                const TicketAuthor = document.createElement("div");
                const ticketId = document.createElement("div")
                const ticketKebabDiv = document.createElement("div")
                const ticketKebabButton = document.createElement("button")
                const ticketKebabButtonText = document.createElement("span")
                const ticketOverlay = document.createElement("div")
                const ticketModal = document.createElement("div")
                const ticketDeleteButton = document.createElement("button")

                ticketContainer.appendChild(ticketUl)
                ticketUl.appendChild(populateTicketInfoSection)
                populateTicketInfoSection.appendChild(TicketTitle)
                populateTicketInfoSection.appendChild(TicketDescription)
                populateTicketInfoSection.appendChild(TicketAuthor)
                populateTicketInfoSection.appendChild(ticketId)
                ticketUl.appendChild(ticketKebabDiv)
                ticketKebabDiv.appendChild(ticketKebabButton)
                ticketKebabButton.appendChild(ticketKebabButtonText)
                ticketUl.appendChild(ticketOverlay)
                ticketUl.appendChild(ticketModal)
                ticketModal.appendChild(ticketDeleteButton)
                    
                TicketTitle.innerText = tickets[i].title;
                TicketDescription.innerText = tickets[i].description;
                TicketAuthor.innerText = tickets[i].author;   
                ticketKebabButtonText.innerText = "..."          
                ticketDeleteButton.innerText = "delete"         
                ticketId.innerText = tickets[i].id;

                ticketUl.classList.add("ticket-ul");
                populateTicketInfoSection.classList.add("populate-ticket-info-section")
                populateTicketInfoSection.setAttribute("style", "width: 100%; display: flex; flex-direction: row")
                ticketId.classList.add("hidden")
                TicketTitle.classList.add("ticket-title")
                TicketDescription.classList.add("ticket-description")
                TicketAuthor.classList.add("ticket-author")
                ticketKebabDiv.classList.add("ticket-kebab-div")
                ticketKebabButton.classList.add("ticket-kebab-button")
                ticketKebabButton.classList.add("open-modal-btn")
                ticketKebabButtonText.classList.add("ticket-kebab-button-text")
                ticketOverlay.classList.add("overlay")
                ticketOverlay.setAttribute("style", "position: fixed; top: -100vh; left: -100vw; padding: 100vh 100vw; backdrop-filter: none; background-color: rgb(255, 255, 255, 0);");
                ticketModal.classList.add("modal")
                ticketModal.classList.add("delete-button-modal")
                ticketDeleteButton.classList.add("ticket-delete-button")

                setDataIndex()
                closeOverlay()

                ticketDeleteButton.addEventListener("click", () => {
                    const selectedTicketId = populateTicketInfoSection.lastElementChild.innerText
                    const docRef = doc(db, 'projects', projectID, 'tickets', selectedTicketId)
                    deleteDoc(docRef)
                    .then(() => {
                        const populatedTicketTitleSection = document.querySelector("#populated-ticket-title-section")
                        const populatedAuthorSection = document.querySelector("#populated-author-section")
                        const populatedDescriptionSection = document.querySelector("#populated-description-section")
                        const populatedTicketInfoSection = document.querySelector("#populated-status-section")
                        const populatedTicketSection = document.querySelector("#populated-priority-section")
                        const populatedTypeSection = document.querySelector("#populated-type-section")
                        const chatbox = document.querySelector(".ticket-info-right-chatbox");
                        chatbox.innerHTML = "";

                        setDataIndex()
                        closeOverlay()
                    })
                })
            }
        }

        populateTicketInfoSection()
        function populateTicketInfoSection() {
            const selectedTicketUl = document.querySelectorAll(".populate-ticket-info-section")
            selectedTicketUl.forEach((ticket) => {
                ticket.addEventListener("click", () => {
                    const selectedTicketId = ticket.lastChild.textContent;
                    const projectPage = ["project-page.html?project=" + projectID + "&" + "selectedtickedID=" + selectedTicketId];
                    window.history.pushState( {} , '', projectPage );
                    const ticketRef = doc(db, 'projects', projectID, 'tickets', selectedTicketId);

                    getDoc(ticketRef).then((snapshot) => {
                        const populatedTicketTitleSection = document.querySelector("#populated-ticket-title-section")
                        const populatedAuthorSection = document.querySelector("#populated-author-section")
                        const populatedDescriptionSection = document.querySelector("#populated-description-section")
                        const populatedTicketInfoSection = document.querySelector("#populated-status-section")
                        const populatedTicketSection = document.querySelector("#populated-priority-section")
                        const populatedTypeSection = document.querySelector("#populated-type-section")
        
                        populatedTicketTitleSection.innerHTML = snapshot.data().title;
                        populatedAuthorSection.innerHTML = snapshot.data().author;
                        populatedDescriptionSection.innerHTML = snapshot.data().description;
                        populatedTicketInfoSection.innerHTML = snapshot.data().status;
                        populatedTicketSection.innerHTML = snapshot.data().priority;
                        populatedTypeSection.innerHTML = snapshot.data().type;

                        populatedTicketInfoSection.setAttribute("style", "background-color: black; text-transform: uppercase");
                        populatedTicketSection.setAttribute("style", "background-color: black; text-transform: uppercase");
                        populatedTypeSection.setAttribute("style", "background-color: black; text-transform: uppercase");

                        const editTicketDescription = document.querySelector(".edit-ticket-description")
                        const editTicketTitle = document.querySelector(".edit-ticket-title")
                        const statusList = document.querySelector(".edit-ticket-status")
                        const typeList = document.querySelector(".edit-ticket-type")
                        const priorityList = document.querySelector(".edit-ticket-priority")

                        editTicketTitle.setAttribute("value", snapshot.data().title)
                        // editTicketDescription.setAttribute("value", snapshot.data().description)
                        editTicketDescription.innerText = snapshot.data().description


                        let statusListOptions = statusList.options.length;
                        for (let i = 0; i < statusListOptions; i++) {
                            if (statusList.options[i].value == snapshot.data().status) {
                                statusList.options[i].selected = true;
                                break;
                            }
                        }

                        let ticketListOptions = typeList.options.length;
                        for (let i = 0; i < ticketListOptions; i++) {
                            if (typeList.options[i].value == snapshot.data().type) {
                                typeList.options[i].selected = true;
                                break;
                            }
                        }

                        let priorityListOptions = priorityList.options.length;
                        for (let i = 0; i < priorityListOptions; i++) {
                            if (priorityList.options[i].value == snapshot.data().priority) {
                                priorityList.options[i].selected = true;
                                break;
                            }
                        }
                    })
        
                    const commentsRef = collection(db, 'projects', projectID, 'tickets', selectedTicketId, 'comments')
                    const orderedCommentsRef = query(commentsRef, orderBy("createdAt"))
                    
                    onSnapshot(orderedCommentsRef, (snapshot) => {
                        let comments = []
                        const chatbox = document.querySelector(".ticket-info-right-chatbox");

                        clearChatbox();
                        
                        function clearChatbox() {
                            while (chatbox.children[0] != null) {
                                chatbox.removeChild(chatbox.children[0]);
                            }
                        }
                        snapshot.docs.forEach((doc) => {
                            comments.push({ ...doc.data(), id: doc.id })
                        });

                        for (i = 0; i < comments.length; i++) {
                            const newComment = document.createElement("div");
                            const userIcon = document.createElement("div");
                            const commentRight = document.createElement("div");
                            const nameAndTimestamp = document.createElement("div");
                            const userName = document.createElement("div");
                            const timeStamp = document.createElement("div");
                            const messageContent = document.createElement("div");

                            newComment.classList.add("entire-message");
                            userIcon.classList.add("user-icon");
                            commentRight.classList.add("comment-right");
                            nameAndTimestamp.classList.add("name-and-timestamp-section");
                            userName.classList.add("user-name");
                            timeStamp.classList.add("message-timestamp");
                            messageContent.classList.add("message-content");

                            userIcon.innerText = (comments[i].firstName.charAt(0) + comments[i].lastName.charAt(0));
                            userName.innerText = (comments[i].firstName + " " + comments[i].lastName);
                            timeStamp.innerText = comments[i].createdAt.toDate().toLocaleTimeString('en-US');
                            messageContent.innerText = comments[i].message;

                            chatbox.appendChild(newComment);
                            newComment.appendChild(userIcon);
                            newComment.appendChild(commentRight);
                            commentRight.appendChild(nameAndTimestamp);
                            nameAndTimestamp.appendChild(userName);
                            nameAndTimestamp.appendChild(timeStamp);
                            commentRight.appendChild(messageContent);
                        }
                        chatbox.scrollTop = chatbox.scrollHeight;
                    })
                })
            })
        }
    })
}

function clearTickets() {
    while (tickets.children[0] != null) {
        tickets.removeChild(tickets.children[0]);
    }
}

function commentCreation() {
    onAuthStateChanged(auth, (user) => {
        const uid = user.uid;
        const currentUser = query(userRef, where("uid", "==", uid));
        
        onSnapshot(currentUser, (snapshot) => {
            let currentUserList = [];

            snapshot.docs.forEach((doc) => {
                currentUserList.push({ ...doc.data(), id: doc.uid });
            });

            const commentInputForm = document.querySelector(".ticket-info-right-comment-form")

            commentInputForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const ticketparams = new Proxy(new URLSearchParams(window.location.search), {
                    get: (searchParams, prop) => searchParams.get(prop),
                });

                let globalSelectedticketId = ticketparams.selectedtickedID;

                const commentRef = collection(db, 'projects', projectID, 'tickets', globalSelectedticketId, 'comments')

                addDoc(commentRef, {
                    firstName: currentUserList[0].firstName,
                    lastName: currentUserList[0].lastName,
                    message: commentInputForm.comment.value,
                    createdAt: serverTimestamp(),
                })
                .then(() => {
                    commentInputForm.reset()
                })
            })
        })
    })
}

function setDataIndex() {
    let i = 0
    for (i = 0; i < modalBtnMulti.length; i++) {
        modalBtnMulti[i].setAttribute('data-index', i);
        modal[i].setAttribute('data-index', i);
        overlay[i].setAttribute('data-index', i);
    }

    for (i = 0; i < modalBtnMulti.length; i++) {
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
            modal[ElementIndex].classList.remove("open")
            overlay[ElementIndex].classList.remove("open")
        };
    }
}

function closeModal() {
    const overlays = document.querySelectorAll(".overlay");
    const modals = document.querySelectorAll(".modal");

    overlays.forEach((overlay) => {
        overlay.classList.remove("open")
    })

    modals.forEach((modal) => {
        modal.classList.remove("open")
    })
}

function createTicketButton() {
    createTicketForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        const idUid = document.querySelector('#idUid').textContent
        const currentUserDocRef = doc(db, 'users', idUid)

        getDoc(currentUserDocRef).then((snapshot) => {
            let ticketAuthor = snapshot.data().firstName + " " + snapshot.data().lastName;

            addDoc(colRef, {
                author: ticketAuthor,
                description: createTicketForm.description.value,
                title: createTicketForm.title.value,
                status: createTicketForm.status.value,
                priority: createTicketForm.priority.value,
                type: createTicketForm.type.value,
                createdAt: serverTimestamp(),
            })
            .then(() => {
                createTicketForm.reset()
                setDataIndex()
                closeOverlay()
                closeModal();
            })
        })
    })    
}

function pieChartStatus(bottom, middle, top) {
    onSnapshot(colRef, (snapshot) => {
        let ticketInfoList = []

        while (ticketInfoList[0] != null) {
            ticketInfoList.removeChild(ticketInfoList[0]);
        }

        snapshot.docs.forEach((doc) => {
            ticketInfoList.push({ ...doc.data(), id: doc.id })
        });

        let statusList = ticketInfoList.map(a => a.status);
        let statusCount = statusList.length;
        let unresolvedCount = getOccurrence(statusList, "unresolved")
        let inProgressCount = getOccurrence(statusList, "in progress")
        let typeList = ticketInfoList.map(a => a.type);
        let typeCount = typeList.length;
        let bugCount = getOccurrence(typeList, "bug")
        let featureRequestCount = getOccurrence(typeList, "feature request")
        let priorityList = ticketInfoList.map(a => a.priority);
        let priorityCount = priorityList.length;
        let mediumCount = getOccurrence(priorityList, "medium")
        let highCount = getOccurrence(priorityList, "high")
        
        pieContainerOne.classList.add("pie-container")
        pieUnresolved.classList.add("pie")
        pieInProgress.classList.add("pie")
        pieResolved.classList.add("pie")

        pieContainerTwo.classList.add("pie-container")
        pieIssue.classList.add("pie")
        pieBug.classList.add("pie")
        pieFeatureRequest.classList.add("pie")

        pieContainerThree.classList.add("pie-container")
        pieLow.classList.add("pie")
        pieMedium.classList.add("pie")
        pieHigh.classList.add("pie")

        pieContainerOne.appendChild(pieUnresolved)
        pieContainerOne.appendChild(pieInProgress)
        pieContainerOne.appendChild(pieResolved)

        pieContainerTwo.appendChild(pieIssue)
        pieContainerTwo.appendChild(pieBug)
        pieContainerTwo.appendChild(pieFeatureRequest)

        pieContainerThree.appendChild(pieLow)
        pieContainerThree.appendChild(pieMedium)
        pieContainerThree.appendChild(pieHigh)

        pieResolved.setAttribute("style", "--p: 100;--b:25px;--c:"+bottom+"; z-index: 1;")
        pieInProgress.setAttribute("style", "--p:"+(((unresolvedCount/statusCount)*100)+((inProgressCount/statusCount)*100))+";--b:25px;--c:"+middle+"; z-index: 2;")
        pieUnresolved.setAttribute("style", "--p:"+(unresolvedCount/statusCount)*100+";--b:25px;--c:"+top+"; z-index: 3;")

        pieIssue.setAttribute("style", "--p: 100;--b:25px;--c:"+bottom+"; z-index: 1;")
        pieBug.setAttribute("style", "--p:"+(((featureRequestCount/typeCount)*100)+((bugCount/typeCount)*100))+";--b:25px;--c:"+middle+"; z-index: 2;")
        pieFeatureRequest.setAttribute("style", "--p:"+(featureRequestCount/typeCount)*100+";--b:25px;--c:"+top+"; z-index: 3;")

        pieLow.setAttribute("style", "--p: 100;--b:25px;--c:"+bottom+"; z-index: 1;")
        pieMedium.setAttribute("style", "--p:"+(((highCount/priorityCount)*100)+((mediumCount/priorityCount)*100))+";--b:25px;--c:"+middle+"; z-index: 2;")
        pieHigh.setAttribute("style", "--p:"+(highCount/priorityCount)*100+";--b:25px;--c:"+top+"; z-index: 3;")
    })
}

function getOccurrence(array, value) {
    return array.filter((v) => (v === value)).length;
}

function clearTicketInfoList(){
    while (ticketInfoList.children[0] != null) {
        ticketInfoList.removeChild(ticketInfoList.children[0]);
    }
}

function editTicketSubmitButton() {
    editTicketForm.addEventListener("submit", (e) => {
        const ticketparams = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        
        let globalSelectedticketId = ticketparams.selectedtickedID;
        
        const selectedTicket = doc(db, 'projects', projectID, 'tickets', globalSelectedticketId)

        e.preventDefault()
        
        updateDoc(selectedTicket, {
            description: editTicketForm.description.value,
            title: editTicketForm.title.value,
            status: editTicketForm.status.value,
            priority: editTicketForm.priority.value,
            type: editTicketForm.type.value,
        })
        .then(() => {
            editTicketForm.reset()

            getDoc(selectedTicket).then((snapshot) => {
                const populatedTicketTitleSection = document.querySelector("#populated-ticket-title-section")
                const populatedDescriptionSection = document.querySelector("#populated-description-section")
                const populatedTicketInfoSection = document.querySelector("#populated-status-section")
                const populatedTicketSection = document.querySelector("#populated-priority-section")
                const populatedTypeSection = document.querySelector("#populated-type-section")

                populatedTicketTitleSection.innerHTML = snapshot.data().title;
                populatedDescriptionSection.innerHTML = snapshot.data().description;
                populatedTicketInfoSection.innerHTML = snapshot.data().status;
                populatedTicketSection.innerHTML = snapshot.data().priority;
                populatedTypeSection.innerHTML = snapshot.data().type;

                const editTicketDescription = document.querySelector(".edit-ticket-description")
                const editTicketTitle = document.querySelector(".edit-ticket-title")
                const statusList = document.querySelector(".edit-ticket-status")
                const typeList = document.querySelector(".edit-ticket-type")
                const priorityList = document.querySelector(".edit-ticket-priority")

                editTicketTitle.setAttribute("value", snapshot.data().title)
                editTicketDescription.setAttribute("value", snapshot.data().description)

                let statusListOptions = statusList.options.length;
                for (let i = 0; i < statusListOptions; i++) {
                    if (statusList.options[i].value == snapshot.data().status) {
                        statusList.options[i].selected = true;
                        break;
                    }
                }
                let ticketListOptions = typeList.options.length;
                for (let i = 0; i < ticketListOptions; i++) {
                    if (typeList.options[i].value == snapshot.data().type) {
                        typeList.options[i].selected = true;
                        break;
                    }
                }
                let priorityListOptions = priorityList.options.length;
                for (let i = 0; i < priorityListOptions; i++) {
                    if (priorityList.options[i].value == snapshot.data().priority) {
                        priorityList.options[i].selected = true;
                        break;
                    }
                }
            })
            setDataIndex()
            closeOverlay()
            closeModal();
        })
    })
}

function openSidebar() {
    sidebarButton.addEventListener("click", () => {
        dashboardMasterMobile.setAttribute("style", "left: 0")
        overlayer.setAttribute("style", "position: fixed; height: 100vh; left: 0%;")
        overlayer.classList.add("open")
    })
}

function closeSidebarOnClick() {
    dashboardMasterMobile.addEventListener("click", () => {
        dashboardMasterMobile.removeAttribute("style", "left")
        overlayer.classList.remove("open")
    })
}

function closeSidebarWithOverlay() {
    overlayer.addEventListener("click", () => {
        dashboardMasterMobile.removeAttribute("style", "left")
        overlayer.classList.remove("open")
    })
}

function loadBackground() {
    getDoc(ProjectUsersDocRef).then((snapshot) => {
        let fetchedBackgroundURL = snapshot.data().background;
        body.setAttribute("style", "background-image: url('"+ fetchedBackgroundURL +"')")
    })
}

function hideBackgroundInputOnSubmit() {
    setBackgroundFormBtn.addEventListener("click", () => {
        setBackgroundFormBtnInput.classList.toggle("hidden")
    })
}

function writeInputtedBackgroundToFirebase() {
    setBackgroundForm.addEventListener("submit", (e) => {
        e.preventDefault()
        updateDoc(ProjectUsersDocRef, {
            background: setBackgroundForm.inputtedBackgroundURL.value
        })
        .then(() => {
            loadBackground()
            setBackgroundForm.reset()
            setBackgroundFormBtnInput.classList.toggle("hidden")
        })
    })
}

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

    for (let i = 0; i < bottomDot.length; i++ ) {
        bottomDot[i].setAttribute("style", "background-color: rgb(0,0,0,.3);")
        middleDot[i].setAttribute("style", "background-color: rgb(0,0,0,.6);")
        topDot[i].setAttribute("style", "background-color: rgb(0,0,0);")
    }
}

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

    for (let i = 0; i < bottomDot.length; i++ ) {
        bottomDot[i].setAttribute("style", "background-color: rgb(255, 255, 255, .3);")
        middleDot[i].setAttribute("style", "background-color: rgb(255, 255, 255, .6);")
        topDot[i].setAttribute("style", "background-color: rgb(255, 255, 255);")
    }
}
