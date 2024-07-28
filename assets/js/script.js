// console.dir display the HTML element as an object know as DOM element.
// console.dir(window.document);
// var buttonEl = document.querySelector("button");
// Moved event listener from button to the form element.

var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#tasks-to-do");

// Created TaskHandler function to replace anonymous function.
// Changing the function name from createTaskHandler to taskFormHandler
// taskFormHandler function gathered the form value and place them into object and then
// we pass the object as an argument in createTaskEl function at the bottom of the taskHandler function.

var taskFormHandler = function (event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  // console.log(taskTypeInput);

  // check if input string are empty string.
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill the task from!");
    return false;
  }
  //  Resetting the form using reset(). which is only designed specifically for the form element.
  formEl.reset();
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };
  createTaskEl(taskDataObj);
};

// creating a new function
// createTaskEl is accepting a taskDataObj as an object
var createTaskEl = function (taskDataObj) {
  // taskDataObj{
  name: "Task's name";
  type: "task's type";
  // }
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
    taskDataObj.name +
    " </h3><span class ='task-type'>" +
    taskDataObj.type +
    "</span>";

  // once we get data we are appending it to the list.
  taskListEl.appendChild(taskInfoEl);
  // here we appending the entire list into the parent <ul>
  taskToDoEl.appendChild(taskListEl);
};
formEl.addEventListener("submit", taskFormHandler);
console.log(taskFormHandler);
