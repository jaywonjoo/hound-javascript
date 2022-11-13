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
const colRef = collection(db, 'projects', 'FbLa2ligAuIL1PdyolJH', 'tickets')




// display ticket info in ticket list
// 1. link tickets to page
    onSnapshot(colRef, (snapshot) => {
        let tickets = []
        snapshot.docs.forEach((doc) => {
            tickets.push({ ...doc.data(), id: doc.id })
            showTicket()

            function showTicket() {
                TicketTitle.innerText = tickets[0].title;
                ticketContainer.appendChild(TicketTitle)

                TicketDescription.innerText = tickets[0].description;
                ticketContainer.appendChild(TicketDescription)

                TicketAuthor.innerText = tickets[0].author;
                ticketContainer.appendChild(TicketAuthor)
            }
        })
        console.log(tickets)


    })
// 2. append tickets to tickets list
    // a. need constant for ticket <ul>
    const ticketContainer = document.querySelector("#tickets")

    // b. need constant that creates an <li> we can append to the <ul>
    const TicketTitle = document.createElement("li");
    const TicketDescription = document.createElement("li");
    const TicketAuthor = document.createElement("li");

    // c. need function that does (2)
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

// ***************************************************************************************************




// 4. display selected ticket info
// 4.1 populate selected ticket info when clicked