/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/darkmode.js":
/*!*************************!*\
  !*** ./src/darkmode.js ***!
  \*************************/
/***/ (() => {

eval("// FEATURE: DARK MODE ************************************************************************************************************************\n\nconst darkModeBtn = document.querySelector(\"#darkModeBtn\")\nconst transparent = document.querySelectorAll(\".transparent\")\nconst solid = document.querySelectorAll(\".solid\")\nconst button = document.querySelectorAll(\".button\")\nconst logo = document.querySelectorAll(\".logo\")\n\ndarkMode()\nfunction darkMode() {\n    darkModeBtn.addEventListener(\"click\", (e) => {\n        e.stopPropagation()\n\n        for (let i = 0; i < transparent.length; i++) {\n            transparent[i].classList.toggle(\"dark-mode-transparent\")\n            transparent[i].classList.toggle(\"light-mode-transparent\")\n        }\n\n        for (let i = 0; i < solid.length; i++) {\n            solid[i].classList.toggle(\"dark-mode-solid\")\n            solid[i].classList.toggle(\"light-mode-solid\")\n        }\n\n        for (let i = 0; i < button.length; i++) {\n            button[i].classList.toggle(\"dark-mode-button\")\n            button[i].classList.toggle(\"light-mode-button\")\n        }\n\n        for (let i = 0; i < logo.length; i++) {\n            logo[i].classList.toggle(\"dark-mode-logo\")\n            logo[i].classList.toggle(\"light-mode-logo\")\n        }\n    })\n  }\n\n// FEATURE: DARK MODE ************************************************************************************************************************\n\n\n//# sourceURL=webpack://jssimplified/./src/darkmode.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/darkmode.js"]();
/******/ 	
/******/ })()
;