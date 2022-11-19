import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, serverTimestamp, Firestore, query,
  where, getDoc, orderBy, connectFirestoreEmulator, 
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
    
    const ProjectUsersDocRef = doc(db, 'projects', projectID)
    getDoc(ProjectUsersDocRef).then((snapshot) => {

        const userRef = collection(db, 'users')


        // grab project creator
        let creator = snapshot.data().creator;
        // console.log(creator)




        const userCreatorDocRef = query(userRef, where("id", "==", creator));
        onSnapshot(userCreatorDocRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {

                let userListOne = []
                userListOne.push({ ...doc.data(), id: doc.id });

                // console.log("hi " + userListOne[0].firstName + userListOne[0].lastName)
                const teamMemberBody = document.querySelector(".team-member-body") 

                const teamMemberLineItem = document.createElement("div")
                    const teamMemberLineItemName = document.createElement("div")
                    const teamMemberLineItemEmail = document.createElement("div")
                    const teamMemberLineItemPhone = document.createElement("div")


                teamMemberBody.appendChild(teamMemberLineItem)
                    teamMemberLineItem.appendChild(teamMemberLineItemName)
                    teamMemberLineItem.appendChild(teamMemberLineItemEmail)
                    teamMemberLineItem.appendChild(teamMemberLineItemPhone)

                let fullName = userListOne[0].firstName + " " + userListOne[0].lastName

                teamMemberLineItemName.innerText = fullName;
                teamMemberLineItemEmail.innerText = userListOne[0].email;
                teamMemberLineItemPhone.innerText = userListOne[0].phoneNumber;

                teamMemberLineItem.classList.add("team-member-line-item");
                
            })
        })

        // grab project collaborators
        let collaborators = snapshot.data().collaborators
        // console.log(collaborators)
        let i = 0
        for (i = 0; i < collaborators.length; i++) {
            // console.log(collaborators[i])
            
            const userCurrentCollaboratorDocRef = query(userRef, where("id", "==", collaborators[i]));
            // console.log(userCurrentCollaboratorDocRef)



            onSnapshot(userCurrentCollaboratorDocRef, (snapshot) => {
                snapshot.docs.forEach((doc) => {
    
                    let collaboratorList = []

                    collaboratorList.push({ ...doc.data(), id: doc.id });

                    // console.log(collaboratorList[0].firstName)

                    const teamMemberBody = document.querySelector(".team-member-body") 

                    const teamMemberLineItem = document.createElement("div")
                        const teamMemberLineItemName = document.createElement("div")
                        const teamMemberLineItemEmail = document.createElement("div")
                        const teamMemberLineItemPhone = document.createElement("div")
                        
    
                    teamMemberBody.appendChild(teamMemberLineItem)
                        teamMemberLineItem.appendChild(teamMemberLineItemName)
                        teamMemberLineItem.appendChild(teamMemberLineItemEmail)
                        teamMemberLineItem.appendChild(teamMemberLineItemPhone)
    
                    let fullName = collaboratorList[0].firstName + " " + collaboratorList[0].lastName
    
                    teamMemberLineItemName.innerText = fullName;
                    teamMemberLineItemEmail.innerText = collaboratorList[0].email;
                    teamMemberLineItemPhone.innerText = collaboratorList[0].phoneNumber;
    
                    teamMemberLineItem.classList.add("team-member-line-item");
                })
            })

        }


    })


        // // 4. Delete Ticket Form
    // const deleteTicketForm = document.querySelector('.delete-ticket-form')
    // deleteTicketForm.addEventListener('submit', (e) => {
    // e.preventDefault()

    // const docRef = doc(db, 'projects', projectID, 'tickets', deleteTicketForm.id.value)
    // deleteDoc(docRef)
    //     .then(() => {
    //         deleteTicketForm.reset()
            
    //     })
    // })



    // need to populate array with creator of project + users linked to project
    // let userList = []

    // clearUsers()

    // snapshot.doc.forEach(doc)





    // read creator of project
    // take that id and populate list with name, email, and phone number


        // // 4. populate selected ticket info USING TICKET ID!!
        // const ticketRef = doc(db, 'projects', projectID, 'tickets', selectedTicketId);
        // getDoc(ticketRef).then((snapshot) => {

        //     console.log(snapshot.data().title)

        //     const populatedTicketTitleSection = document.querySelector("#populated-ticket-title-section")
        //     const populatedAuthorSection = document.querySelector("#populated-author-section")
        //     const populatedDescriptionSection = document.querySelector("#populated-description-section")
        //     const populatedTicketInfoSection = document.querySelector("#populated-status-section")
        //     const populatedTicketSection = document.querySelector("#populated-priority-section")
        //     const populatedTypeSection = document.querySelector("#populated-type-section")

        //     populatedTicketTitleSection.innerHTML = snapshot.data().title;
        //     populatedAuthorSection.innerHTML = snapshot.data().author;
        //     populatedDescriptionSection.innerHTML = snapshot.data().description;
        //     populatedTicketInfoSection.innerHTML = snapshot.data().status;
        //     populatedTicketSection.innerHTML = snapshot.data().priority;
        //     populatedTypeSection.innerHTML = snapshot.data().type;
            
        // })



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
                    const ticketLi = document.createElement("li")
                    const ticketUl = document.createElement("ul")
                    const TicketTitle = document.createElement("li");
                    const TicketDescription = document.createElement("li");
                    const TicketAuthor = document.createElement("li");
                    const ticketId = document.createElement("li")

                    ticketContainer.appendChild(ticketLi)
                    ticketLi.appendChild(ticketUl)
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


// 3. create ticket form
const newTicketButton = document.querySelector("#newTicketButton")
newTicketButton.addEventListener('click', () => {
    // click on button to open "new ticket" form
    // click on button to open modal
    openModal()
})

    // click on "New Project" to open modal
    function openModal() {
        modal.classList.add("open")
        overlay.classList.add("open")
    }

    // click on overlay to cancel operation
    overlay.addEventListener("click", closeModal)
    function closeModal() {
        modal.classList.remove("open")
        overlay.classList.remove("open")
    }

    // linking firestore project collection
    const projectRef = collection(db, 'projects')
    // submit form after clicking
    const createTicketForm = document.querySelector('.create-ticket-btn')
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
    })    





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
    const currentUser = query(userRef, where("id", "==", uid));
    
    onSnapshot(currentUser, (snapshot) => {
        let currentUserList = [];
        
        snapshot.docs.forEach((doc) => {
            currentUserList.push({ ...doc.data(), id: doc.id });
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
            
        })
})




