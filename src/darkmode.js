// FEATURE: DARK MODE ************************************************************************************************************************

const darkModeBtn = document.querySelector("#darkModeBtn")
const transparent = document.querySelectorAll(".transparent")
const solid = document.querySelectorAll(".solid")
const button = document.querySelectorAll(".button")
const logo = document.querySelectorAll(".logo")

darkMode()
function darkMode() {
    darkModeBtn.addEventListener("click", (e) => {
        e.stopPropagation()

        for (let i = 0; i < transparent.length; i++) {
            transparent[i].classList.toggle("dark-mode-transparent")
            transparent[i].classList.toggle("light-mode-transparent")
        }

        for (let i = 0; i < solid.length; i++) {
            solid[i].classList.toggle("dark-mode-solid")
            solid[i].classList.toggle("light-mode-solid")
        }

        for (let i = 0; i < button.length; i++) {
            button[i].classList.toggle("dark-mode-button")
            button[i].classList.toggle("light-mode-button")
        }

        for (let i = 0; i < logo.length; i++) {
            logo[i].classList.toggle("dark-mode-logo")
            logo[i].classList.toggle("light-mode-logo")
        }
    })
  }

// FEATURE: DARK MODE ************************************************************************************************************************
