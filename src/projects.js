import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, serverTimestamp, Firestore, query,
  where, getDoc, orderBy, connectFirestoreEmulator, 
  updateDoc, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import "./projects.css";

const firebaseConfig = {
    apiKey: "AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c",
    authDomain: "hound-e43f0.firebaseapp.com",
    projectId: "hound-e43f0",
    storageBucket: "hound-e43f0.appspot.com",
    messagingSenderId: "361705338046",
    appId: "1:361705338046:web:f04df4040689f429aa9aef"
  };

// 2. append tickets to tickets list
    // a. create and append <li><ul><li></li></ul></li> to ticketContainer
    const ticketContainer = document.querySelector("#tickets")
    const ticketLi = document.createElement("li")
    const ticketUl = document.createElement("ul")
    const TicketTitle = document.createElement("li");
    const TicketDescription = document.createElement("li");
    const TicketAuthor = document.createElement("li");

    // b. need function that does (2)
        // function was place inside the snapshot!


// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// FEATURE: SECURITY WALL
const auth = getAuth()
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("body").style.display = "block";
  } else {
    window.location.replace("signin.html")
  }
});

const dashboardButton = document.querySelector('#dashboardButton')
dashboardButton.addEventListener('click', () => {
    window.location.href = "dashboard.html";
})


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

// *relevant* collection ref
  // need variable that changes based on project selected
    // using query parameter to pass data from one page to another!
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      let projectID = params.project; // "some_value"
      console.log(projectID)
  // setting colRef to selected project!
  const colRef = collection(db, 'projects', projectID, 'tickets')







// FEATURE: TEAM MEMBER SECTION ************************************************************************************************************************
populateTeamMembers()
function populateTeamMembers(){
    const ProjectUsersDocRef = doc(db, 'projects', projectID)
    getDoc(ProjectUsersDocRef).then((snapshot) => {

        const userRef = collection(db, 'users')


        // grab project creator
        let creator = snapshot.data().creator;
        // console.log(creator)




        const userCreatorDocRef = query(userRef, where("uid", "==", creator));
        onSnapshot(userCreatorDocRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {

                let userListOne = []
                userListOne.push({ ...doc.data(), id: doc.id });

                // console.log("hi " + userListOne[0].firstName + userListOne[0].lastName)
                const teamMemberBody = document.querySelector(".team-member-body") 
                const teamMemberModals = document.querySelector(".team-member-line-item-modals")
                const teamMemberOverlays = document.querySelector(".team-member-line-item-overlays")

                const teamMemberLineItem = document.createElement("div")
                    const teamMemberLineItemName = document.createElement("div")
                    const teamMemberLineItemEmail = document.createElement("div")
                    const teamMemberLineItemPhone = document.createElement("div")
                    
                    const teamMemberLineItemKebabDiv = document.createElement("div")

                    const teamMemberLineItemKebab = document.createElement("button")
                const teamMemberLineItemOverlay = document.createElement("div")
                const teamMemberLineItemModal = document.createElement("div")
                const teamMemberLineItemDeleteButton = document.createElement("button")



                teamMemberBody.appendChild(teamMemberLineItem)
                    teamMemberLineItem.appendChild(teamMemberLineItemName)
                    teamMemberLineItem.appendChild(teamMemberLineItemEmail)
                    teamMemberLineItem.appendChild(teamMemberLineItemPhone)

                    teamMemberLineItem.appendChild(teamMemberLineItemKebabDiv)
                    
                    teamMemberLineItemKebabDiv.appendChild(teamMemberLineItemKebab)
                teamMemberOverlays.appendChild(teamMemberLineItemOverlay)
                teamMemberLineItemKebabDiv.appendChild(teamMemberLineItemModal)
                    teamMemberLineItemModal.appendChild(teamMemberLineItemDeleteButton)




                let fullName = userListOne[0].firstName + " " + userListOne[0].lastName

                teamMemberLineItemName.innerText = fullName;
                teamMemberLineItemEmail.innerText = userListOne[0].email;
                teamMemberLineItemPhone.innerText = userListOne[0].phoneNumber;
                teamMemberLineItemKebab.innerText = "...";
                teamMemberLineItemDeleteButton.innerText = "delete"


                teamMemberLineItem.classList.add("team-member-line-item");
                teamMemberLineItemName.classList.add("team-member-line-item-name");
                teamMemberLineItemEmail.classList.add("team-member-line-item-email");
                teamMemberLineItemPhone.classList.add("team-member-line-item-phone");

                teamMemberLineItemKebabDiv.setAttribute("style", "position: relative")

                teamMemberLineItemKebab.classList.add("team-member-line-item-kebab");
                teamMemberLineItemKebab.classList.add("open-modal-btn");
                teamMemberLineItemOverlay.setAttribute("id", "overlay");
                teamMemberLineItemOverlay.setAttribute("style", "backdrop-filter: none; background-color: rgb(255, 255, 255, 0);");
                teamMemberLineItemModal.classList.add("modal");
                teamMemberLineItemModal.classList.add("delete-button-modal");

                teamMemberLineItemModal.setAttribute("id", "modal");
                // teamMemberLineItemModal.setAttribute("style", "modal");

                // teamMemberLineItemModal.setAttribute("style", "display: none; position: absolute; bottom: 0; width: auto; height: auto; box-shadow: 0 0 10px #919191;");
                
                // teamMemberLineItemModal.setAttribute("style", "padding: 0; width: 0; border-style: none; position: absolute;");
                // teamMemberLineItemModal.classList.add("hidden");

                
                setDataIndex()
                closeOverlays()

            })

        })

        // grab project collaborators
        let collaborators = snapshot.data().collaborators
        // console.log(collaborators)
        let i = 0
        for (i = 0; i < collaborators.length; i++) {
            // console.log(collaborators[i])
            
            const userCurrentCollaboratorDocRef = query(userRef, where("uid", "==", collaborators[i]));
            // console.log(userCurrentCollaboratorDocRef)



            onSnapshot(userCurrentCollaboratorDocRef, (snapshot) => {
                snapshot.docs.forEach((doc) => {
    
                    let collaboratorList = []

                    collaboratorList.push({ ...doc.data(), id: doc.id });

                    // console.log("hi " + userListOne[0].firstName + userListOne[0].lastName)
                const teamMemberBody = document.querySelector(".team-member-body") 
                const teamMemberModals = document.querySelector(".team-member-line-item-modals")
                const teamMemberOverlays = document.querySelector(".team-member-line-item-overlays")

                const teamMemberLineItem = document.createElement("div")
                    const teamMemberLineItemName = document.createElement("div")
                    const teamMemberLineItemEmail = document.createElement("div")
                    const teamMemberLineItemPhone = document.createElement("div")
                    
                    const teamMemberLineItemKebabDiv = document.createElement("div")

                    const teamMemberLineItemKebab = document.createElement("button")
                const teamMemberLineItemOverlay = document.createElement("div")
                const teamMemberLineItemModal = document.createElement("div")
                const teamMemberLineItemDeleteButton = document.createElement("button")



                teamMemberBody.appendChild(teamMemberLineItem)
                    teamMemberLineItem.appendChild(teamMemberLineItemName)
                    teamMemberLineItem.appendChild(teamMemberLineItemEmail)
                    teamMemberLineItem.appendChild(teamMemberLineItemPhone)

                    teamMemberLineItem.appendChild(teamMemberLineItemKebabDiv)
                    
                    teamMemberLineItemKebabDiv.appendChild(teamMemberLineItemKebab)
                teamMemberOverlays.appendChild(teamMemberLineItemOverlay)
                teamMemberLineItemKebabDiv.appendChild(teamMemberLineItemModal)
                    teamMemberLineItemModal.appendChild(teamMemberLineItemDeleteButton)




                let fullName = collaboratorList[0].firstName + " " + collaboratorList[0].lastName

                teamMemberLineItemName.innerText = fullName;
                teamMemberLineItemEmail.innerText = collaboratorList[0].email;
                teamMemberLineItemPhone.innerText = collaboratorList[0].phoneNumber;
                teamMemberLineItemKebab.innerText = "...";
                teamMemberLineItemDeleteButton.innerText = "delete"


                teamMemberLineItem.classList.add("team-member-line-item");
                teamMemberLineItemName.classList.add("team-member-line-item-name");
                teamMemberLineItemEmail.classList.add("team-member-line-item-email");
                teamMemberLineItemPhone.classList.add("team-member-line-item-phone");

                teamMemberLineItemKebabDiv.setAttribute("style", "position: relative")

                teamMemberLineItemKebab.classList.add("team-member-line-item-kebab");
                teamMemberLineItemKebab.classList.add("open-modal-btn");
                teamMemberLineItemOverlay.setAttribute("id", "overlay");
                teamMemberLineItemOverlay.setAttribute("style", "backdrop-filter: none; background-color: rgb(255, 255, 255, 0);");
                teamMemberLineItemModal.classList.add("modal");
                teamMemberLineItemModal.classList.add("delete-button-modal");

                teamMemberLineItemModal.setAttribute("id", "modal");
                // teamMemberLineItemModal.setAttribute("style", "modal");

                // teamMemberLineItemModal.setAttribute("style", "display: none; position: absolute; bottom: 0; width: auto; height: auto; box-shadow: 0 0 10px #919191;");
                
                // teamMemberLineItemModal.setAttribute("style", "padding: 0; width: 0; border-style: none; position: absolute;");
                // teamMemberLineItemModal.classList.add("hidden");

                
                setDataIndex()
                closeOverlays()
                    
                })
            })

        }


    })
}

    // FEATURE: ADD TEAM MEMBERS ************************************************************************

populateUserModal()
function populateUserModal() {


        const systemUsers = collection(db, 'users')
        const alphabetizedSystemUsers = query(systemUsers, orderBy("firstName"))

        onSnapshot(alphabetizedSystemUsers, (snapshot) => {
            let SystemUsersList = []

            snapshot.docs.forEach((doc) => {
                SystemUsersList.push({ ...doc.data(), id: doc.id })
            })
            console.log(SystemUsersList)


            let i = 0
            for (i = 0; i < SystemUsersList.length; i++) {
                const populatableMemberDiv = document.querySelector("#populatable-member-div")
                
                const newMemberMainDiv = document.createElement("div")
                // const newMemberIconDiv = document.createElement("div")
                const newMemberCheckboxDiv = document.createElement("input")
                newMemberCheckboxDiv.setAttribute("type", "checkbox");
                const newMemberNameDiv = document.createElement("div")
                const newMemberEmailDiv = document.createElement("div")
                // const newMemberKebabDiv = document.createElement("div")
                const newMemberIdDiv = document.createElement("div")

        
                populatableMemberDiv.appendChild(newMemberMainDiv);
                    // newMemberMainDiv.appendChild(newMemberIconDiv);
                    newMemberMainDiv.appendChild(newMemberCheckboxDiv);
                    newMemberMainDiv.appendChild(newMemberNameDiv);
                    newMemberMainDiv.appendChild(newMemberEmailDiv);
                    // newMemberMainDiv.appendChild(newMemberKebabDiv);
                    newMemberMainDiv.appendChild(newMemberIdDiv);
        
                // newMemberIconDiv.innerText = (SystemUsersList[i].firstName.charAt(0) + SystemUsersList[i].lastName.charAt(0));
                newMemberNameDiv.innerText = (SystemUsersList[i].firstName + " " + SystemUsersList[i].lastName);
                newMemberEmailDiv.innerText = (SystemUsersList[i].email);
                // newMemberKebabDiv.innerText = "..."
                newMemberIdDiv.innerText = (SystemUsersList[i].uid);
        
                newMemberMainDiv.classList.add("new-member-main-div")
                newMemberCheckboxDiv.classList.add("new-member-checkbox-div")
                // newMemberIconDiv.classList.add("new-member-icon-div")
                newMemberNameDiv.classList.add("new-member-name-div")
                newMemberEmailDiv.classList.add("new-member-email-div")
                // newMemberKebabDiv.classList.add("new-member-kebab-div")
                newMemberIdDiv.classList.add("hidden")
            }
        })

    }

        
    // ***********************************************************************************


    
// *****************************************************************************************************************************************************






// display ticket info in ticket list
// 1. link tickets to page
    onSnapshot(colRef, (snapshot) => {
        // create empty array to populate
        let tickets = []

        // function to clear tickets array on every refresh
        clearTickets()

        // then populate it with whatever is in the tickets section
        snapshot.docs.forEach((doc) => {
            tickets.push({ ...doc.data(), id: doc.id })
        });
            //console.log(tickets[1])
            
            let i = 0;
            //(2b)
            for (i = 0; i < tickets.length; i++) {
                populateTicket()

                function populateTicket() {
                    const ticketContainer = document.querySelector("#tickets")
                    // const ticketLi = document.createElement("li")
                    const ticketUl = document.createElement("div")
                    const TicketTitle = document.createElement("div");
                    const TicketDescription = document.createElement("div");
                    const TicketAuthor = document.createElement("div");
                    const ticketId = document.createElement("div")

                    ticketContainer.appendChild(ticketUl)
                    // ticketLi.appendChild(ticketUl)
                        ticketUl.appendChild(TicketTitle)
                        ticketUl.appendChild(TicketDescription)
                        ticketUl.appendChild(TicketAuthor)
                        ticketUl.appendChild(ticketId)

                    TicketTitle.innerText = tickets[i].title;
                    TicketDescription.innerText = tickets[i].description;
                    TicketAuthor.innerText = tickets[i].author;   
                    ticketId.innerText = tickets[i].id;             

                    ticketUl.classList.add("ticket-ul");
                    ticketId.classList.add("hidden")
                }
            }

            // // click on ticket to redirect user to project specific page
            const selectedTicketUl = document.querySelectorAll(".ticket-ul")
            selectedTicketUl.forEach((ticket) => {
                ticket.addEventListener("click", () => {
                    const selectedTicketId = ticket.lastChild.textContent;
                    // console.log(selectedTicketId)

                       //paste selectedTicketId into webpage
                       const projectPage = ["project-page.html?project=" + projectID + "&" + "selectedtickedID=" + selectedTicketId];
                       window.history.pushState( {} , '', projectPage );


                    // 4. populate selected ticket info USING TICKET ID!!
                    const ticketRef = doc(db, 'projects', projectID, 'tickets', selectedTicketId);
                    getDoc(ticketRef).then((snapshot) => {

                        console.log(snapshot.data().title)

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
                        
                    })
           
                    // comments should also load here ***************************************************
                    const commentsRef = collection(db, 'projects', projectID, 'tickets', selectedTicketId, 'comments')
                    const orderedCommentsRef = query(commentsRef, orderBy("createdAt"))
                    
                    onSnapshot(orderedCommentsRef, (snapshot) => {
                        let comments = []

                        // refresh chatbox
                        const chatbox = document.querySelector(".chatbox");


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

                        chatbox.appendChild(newComment);
                            newComment.appendChild(userIcon);
                            newComment.appendChild(commentRight);
                                commentRight.appendChild(nameAndTimestamp);
                                    nameAndTimestamp.appendChild(userName);
                                    nameAndTimestamp.appendChild(timeStamp);
                                commentRight.appendChild(messageContent);

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
                    }
                    
                    // chatbox load bottom
                    chatbox.scrollTop = chatbox.scrollHeight;
                    
                })
  
                })
            })
    //     console.log(tickets)
    })


// // 3. create ticket form
// const newTicketButton = document.querySelector("#newTicketButton")
// newTicketButton.addEventListener('click', () => {
//     // click on button to open "new ticket" form
//     // click on button to open modal
//     openModal()
// })

//     // click on "New Project" to open modal
//     function openModal() {
//         modal.classList.add("open")
//         overlay.classList.add("open")
//     }

//     // click on overlay to cancel operation
//     overlay.addEventListener("click", closeModal)
//     function closeModal() {
//         modal.classList.remove("open")
//         overlay.classList.remove("open")
//     }

    // // linking firestore project collection
    // const projectRef = collection(db, 'projects')
    // // submit form after clicking
    // const createTicketForm = document.querySelector('.create-ticket-form')
    // createTicketForm.addEventListener('submit', (e) => {
    //     e.preventDefault()
        
    //     addDoc(colRef, {
    //         author: createTicketForm.author.value,
    //         description: createTicketForm.description.value,
    //         title: createTicketForm.title.value,
    //         status: createTicketForm.status.value,
    //         priority: createTicketForm.priority.value,
    //         type: createTicketForm.type.value,
    //     })
    //     .then(() => {
    //         createTicketForm.reset()
    //     })

    //     // createTicket()
    //     closeModal();
    // })    





// Make tickets clear and repopulate after deletion
function clearTickets() {
    while (tickets.children[0] != null) {
        tickets.removeChild(tickets.children[0]);
    }
}

// ***************************************************************************************************



// 5. clear selected ticket info when deleted






const userRef = collection(db, "users");
onAuthStateChanged(auth, (user) => {
    const uid = user.uid;
    const currentUser = query(userRef, where("uid", "==", uid));
    
    onSnapshot(currentUser, (snapshot) => {
        let currentUserList = [];
        
        snapshot.docs.forEach((doc) => {
            currentUserList.push({ ...doc.data(), id: doc.uid });
        });
        console.log(currentUserList)
const selectedTicketIdd = "xqPesJdnuLuphiOieXpG"


// FEATURE: COMMENT CREATION ***************************************************************************************************
            const commentInputForm = document.querySelector(".comment-input-form")

            commentInputForm.addEventListener('submit', (e) => {
                e.preventDefault();


                

                        //grab global selected ticket id
                        const ticketparams = new Proxy(new URLSearchParams(window.location.search), {
                            get: (searchParams, prop) => searchParams.get(prop),
                        });
                        // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
                        let globalSelectedticketId = ticketparams.selectedtickedID; // "some_value"
                        console.log(globalSelectedticketId)

                        const commentRef = collection(db, 'projects', projectID, 'tickets', globalSelectedticketId, 'comments')


                // newProject.innerText = addProjectForm.name.value;
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
// **************************************************************************************************

    
    })
})
// **************************************************************************************************












 



// 4. Delete Ticket Form
const deleteTicketForm = document.querySelector('.delete-ticket-form')
deleteTicketForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'projects', projectID, 'tickets', deleteTicketForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteTicketForm.reset()

            const populatedTicketTitleSection = document.querySelector("#populated-ticket-title-section")
            const populatedAuthorSection = document.querySelector("#populated-author-section")
            const populatedDescriptionSection = document.querySelector("#populated-description-section")
            const populatedTicketInfoSection = document.querySelector("#populated-status-section")
            const populatedTicketSection = document.querySelector("#populated-priority-section")
            const populatedTypeSection = document.querySelector("#populated-type-section")

            populatedTicketTitleSection.innerHTML = "";
            populatedAuthorSection.innerHTML = "";
            populatedDescriptionSection.innerHTML = "";
            populatedTicketInfoSection.innerHTML = "";
            populatedTicketSection.innerHTML = "";
            populatedTypeSection.innerHTML = "";

            const chatbox = document.querySelector(".chatbox");
            chatbox.innerHTML = "";

        })



})




// FEATURE: ADD MEMBER BUTTON ****************************************************************************************************************

const modalAddMemberForm = document.querySelector(".add-member-form")
modalAddMemberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log("blah")

    const newMemberMainDiv = document.querySelector(".new-member-main-div")
    const newMemberCheckboxDiv = document.querySelectorAll(".new-member-checkbox-div")
    // const checkedCheckbox = newMemberCheckboxDiv.parentElement.lastElementChild.innerText

    newMemberCheckboxDiv.forEach((checkbox) => {
        // let newMemberList = [];

        if(checkbox.checked) {
            // console.log("blah")
            const selectedUserId = checkbox.parentElement.lastElementChild.innerText
            // console.log(selectedUserId)
            // newMemberList.push(selectedUserId)

            const projectCollaborators = doc(db, 'projects', projectID)
            updateDoc(projectCollaborators, {
                collaborators: arrayUnion(selectedUserId)
            })
            .then(() => {
                checkbox.checked = false;
              })
        }

    
    })

        const teamMemberBody = document.querySelector(".team-member-body") 
    teamMemberBody.innerHTML = ""
    populateTeamMembers()


// // Atomically add a new region to the "regions" array field.
// await updateDoc(washingtonRef, {
//     regions: arrayUnion("greater_virginia")
// });

// // Atomically remove a region from the "regions" array field.
// await updateDoc(washingtonRef, {
//     regions: arrayRemove("east_coast")
// });

    
    closeModal();
    function closeModal() {
        const overlayer = document.querySelectorAll("#overlay");
        overlayer.forEach((overlayer) => {
            overlayer.classList.remove("open")
        })

        const modalss = document.querySelectorAll("#modal");
        modalss.forEach((modalll) => {
            modalll.classList.remove("open")
        })
    }


})


// ************************************************************************************************************************************************

// FEATURE: MULTIPLE MODALS ************************************************************************************************************************
const modalparent = document.getElementsByClassName("modal");
// modalparent.setAttribute("style", "top: 40%; left: 50%; transform: translate(-50%, -50%); border: 1px solid black; padding: 1rem; border-radius: .75rem; background-color: white;width: 30%; height: auto; box-shadow: 0 0 10px #919191;");


// Get the button that opens the modal

const modal_btn_multi = document.getElementsByClassName("open-modal-btn");

// setTimeout(() => {

// When the user clicks the button, open the modal
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

// linking firestore project collection
const projectRef = collection(db, 'projects')
// submit form after clicking
const createTicketForm = document.querySelector('.create-ticket-form')
createTicketForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    addDoc(colRef, {
        author: createTicketForm.author.value,
        description: createTicketForm.description.value,
        title: createTicketForm.title.value,
        status: createTicketForm.status.value,
        priority: createTicketForm.priority.value,
        type: createTicketForm.type.value,
    })
    .then(() => {
        createTicketForm.reset()
    })

    // createTicket()
    closeModal();
    function closeModal() {
        const overlayer = document.querySelectorAll("#overlay");
        overlayer.forEach((overlayer) => {
            overlayer.classList.remove("open")
        })

        const modalss = document.querySelectorAll("#modal");
        modalss.forEach((modalll) => {
            modalll.classList.remove("open")
        })
    }
})    

