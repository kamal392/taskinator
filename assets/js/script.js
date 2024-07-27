// console.dir display the HTML element as an object know as DOM element.
// console.dir(window.document);
// var buttonEl = document.querySelector("button");
// Moved event listener from button to the form element.

var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

// Created TaskHandler function to replace anonymous function.
var createTaskHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  // console.log(taskTypeInput);
  // create list item
  var taskListEl = document.createElement("li");
  taskListEl.className = "task-item";

  // create div to hold task info and add to list item.
  var taskInfoEl = document.createElement("div");
  // give it a class.
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameInput +
    " </h3><span class ='task-type'>" +
    taskTypeInput +
    "</span>";

  // once we get data we are appending it to the list.
  taskListEl.appendChild(taskInfoEl);
  // here we appending the entire list into the parent <ul>
  taskToDoEl.appendChild(taskListEl);
  console.dir(taskListEl);
};

formEl.addEventListener("submit", createTaskHandler);
console.log(createTaskHandler);
