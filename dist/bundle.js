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

/***/ "./node_modules/firebase/app/dist/index.esm.js":
/*!*****************************************************!*\
  !*** ./node_modules/firebase/app/dist/index.esm.js ***!
  \*****************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/jaywonjoo/Desktop/jssimplified/node_modules/firebase/app/dist/index.esm.js'\");\n\n//# sourceURL=webpack://jssimplified/./node_modules/firebase/app/dist/index.esm.js?");

/***/ }),

/***/ "./node_modules/firebase/firestore/dist/index.esm.js":
/*!***********************************************************!*\
  !*** ./node_modules/firebase/firestore/dist/index.esm.js ***!
  \***********************************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed: Error: ENOENT: no such file or directory, open '/Users/jaywonjoo/Desktop/jssimplified/node_modules/firebase/firestore/dist/index.esm.js'\");\n\n//# sourceURL=webpack://jssimplified/./node_modules/firebase/firestore/dist/index.esm.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/index.esm.js\");\n\n\n\nconst firebaseConfig = {\n    apiKey: \"AIzaSyAgs-sGBJrnqvlOBqMbZr_E1hWYJoofA2c\",\n    authDomain: \"hound-e43f0.firebaseapp.com\",\n    projectId: \"hound-e43f0\",\n    storageBucket: \"hound-e43f0.appspot.com\",\n    messagingSenderId: \"361705338046\",\n    appId: \"1:361705338046:web:f04df4040689f429aa9aef\"\n  };\n\n// init firebase app\n  (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig)\n\n// init services\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)()\n\n// collection ref\nconst colRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(db, 'books')\n\n// realtime collection data\n;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.onSnapshot)(colRef, (snapshot) => {\n    let books = []\n    snapshot.docs.forEach((doc) => {\n        books.push({ ...doc.data(), id: doc.id })\n    })\n    console.log(books)\n})\n\n// adding documents\nconst addBookForm = document.querySelector('.add')\naddBookForm.addEventListener('submit', (e) => {\n    e.preventDefault()\n\n    ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.addDoc)(colRef, {\n        title: addBookForm.title.value,\n        author: addBookForm.author.value,\n    })\n    .then(() => {\n        addBookForm.reset()\n    })\n})\n\n// deleting documents\nconst deleteBookForm = document.querySelector('.delete')\ndeleteBookForm.addEventListener('submit', (e) => {\n    e.preventDefault()\n    \n    const docRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.doc)(db, 'books', deleteBookForm.id.value)\n    ;(0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.deleteDoc)(docRef)\n        .then(() => {\n            deleteBookForm.reset()\n        })\n\n})\n\n//# sourceURL=webpack://jssimplified/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;