// console.dir display the HTML element as an object know as DOM element.
// console.dir(window.document);
var buttonEl = document.querySelector("button");

var taskToDoEl = document.querySelector("#tasks-to-do");

// Created TaskHandler function to replace anonymous function.
var createTaskHandler = function () {
  var taskListEl = document.createElement("li");
  taskListEl.textContent = "This is the first task that got added !";
  taskListEl.className = "task-item";
  taskToDoEl.appendChild(taskListEl);
};

buttonEl.addEventListener("click", createTaskHandler);
