/*
  TODO: 2. Select the elements with the following IDs
    * modal
    * open-modal-btn
    * close-modal-btn
    * BONUS: overlay
*/

const modal = document.querySelector("#modal");
const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector("#close-modal-btn")
const overlay = document.querySelector('#overlay');

// TODO: 3. Create a click event listener for the open-modal-btn that adds the class "open" to the modal
// BONUS: Also add the class "open" to the overlay
openModalBtn.addEventListener('click', e => {
    modal.classList.add("open");
    overlay.classList.add("open")
})

// TODO: 4. Create a click event listener for the close-modal-btn that removes the class "open" from the modal
// BONUS: Also remove the class "open" from the overlay
closeModalBtn.addEventListener('click', e => {
    modal.classList.remove("open");
    overlay.classList.remove("open");
})

// BONUS: Add a click event listener to the overlay that removes the class "open" from the modal and the overlay
overlay.addEventListener('click', e => {
    overlay.classList.remove("open");
    modal.classList.remove("open");
})


/*
// 1. Select all elements
const form = document.querySelector("#new-item-form");
const list = document.querySelector("#list");
const input = document.querySelector("#item-input");

// 2. When I submit the form add a new element
form.addEventListener('submit', e => {
    e.preventDefault()
    
    //console.log(input.value)

    // 1. Create a new item
    const item = document.createElement('div')
    item.innerText = input.value
    item.classList.add("list-item")

    // 2. Add that item to the list
    list.appendChild(item)
    
    // 3. Clear input
    input.value = ""

    // 4. Setup event listener to delete item when clicked
    item.addEventListener("click", () => {
        item.remove()
    })

})
*/