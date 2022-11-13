import { initializeApp } from 'firebase/app';
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
} from 'firebase/firestore';
import "./projects.css";

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

// init services
const db = getFirestore()

// collection ref
// const colRef = collection(db, 'projects', 'FbLa2ligAuIL1PdyolJH', 'tickets')

// *relevant* collection ref
  // need variable that changes based on project selected
    // using query parameter to pass data from one page to another!
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
      let value = params.project; // "some_value"
      console.log(value)
  // setting colRef to selected project!
  const colRef = collection(db, 'projects', 'FbLa2ligAuIL1PdyolJH', 'tickets')



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
            
            //(2b)
            populateTicket()

            function populateTicket() {
                ticketContainer.appendChild(ticketLi)
                ticketLi.appendChild(ticketUl)
                TicketTitle.innerText = tickets[0].title;
                ticketUl.appendChild(TicketTitle)

                TicketDescription.innerText = tickets[0].description;
                ticketUl.appendChild(TicketDescription)

                TicketAuthor.innerText = tickets[0].author;
                ticketUl.appendChild(TicketAuthor)
                ticketUl.classList.add("ticket-ul");
            }

            // 4. populate selected ticket info section on click
            const populateTicketInfo = document.querySelector('.ticket-ul')
            populateTicketInfo.addEventListener("click", () => {
                // console.log("boop")
                const populatedTicketTitleSection = document.querySelector("#populated-ticket-title-section")
                const populatedAuthorSection = document.querySelector("#populated-author-section")
                const populatedDescriptionSection = document.querySelector("#populated-description-section")
                const populatedTicketInfoSection = document.querySelector("#populated-status-section")
                const populatedTicketSection = document.querySelector("#populated-priority-section")
                const populatedTypeSection = document.querySelector("#populated-type-section")

                populatedTicketTitleSection.innerHTML = tickets[0].title;
                populatedAuthorSection.innerHTML = tickets[0].author;
                populatedDescriptionSection.innerHTML = tickets[0].description;
                populatedTicketInfoSection.innerHTML = tickets[0].status;
                populatedTicketSection.innerHTML = tickets[0].priority;
                populatedTypeSection.innerHTML = tickets[0].type;
                // console.log(tickets[0].title)
            })

        })
        console.log(tickets)
    })
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


// 4. Delete Ticket Form
const deleteTicketForm = document.querySelector('.delete-ticket-form')
deleteTicketForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'projects', 'FbLa2ligAuIL1PdyolJH', 'tickets', deleteTicketForm.id.value)
    deleteDoc(docRef)
        .then(() => {
            deleteTicketForm.reset()
            
        })
})

    // Make tickets clear and repopulate after deletion
    function clearTickets() {
        while (tickets.children[0] != null) {
            tickets.removeChild(tickets.children[0]);
        }
    }

// ***************************************************************************************************



// 5. clear selected ticket info when deleted

















