// console.dir display the HTML element as an object know as DOM element.
// console.dir(window.document);
// var buttonEl = document.querySelector("button");
// Moved event listener from button to the form element.

var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

// Created TaskHandler function to replace anonymous function.
var createTaskHandler = function (event) {
  event.preventDefault();
  var taskListEl = document.createElement("li");
  taskListEl.textContent = "This is the first task that got added !";
  taskListEl.className = "task-item";
  taskToDoEl.appendChild(taskListEl);
}

formEl.addEventListener("submit", createTaskHandler);
console.log(createTaskHandler);
