// console.dir display the HTML element as an object know as DOM element.
// console.dir(window.document);
// var buttonEl = document.querySelector("button");
// Moved event listener from button to the form element.
// creating a variable that is going to hold Id number for each task that gets created . with an initial value of 0.
var taskIdCounter = 0;

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
  // add task id as custom attribute.
  taskListEl.setAttribute("data-task-id", taskIdCounter);
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
  //  createTaskAction() returns a DOM element,we can store
  //  that element in a variable taskActionsEl.
  var taskActionsEl = createTaskActions(taskIdCounter);

  // console.log(taskActionsEl); to verify if the function is working.
  // appending taskActionsEl which has delete button , edit button and select element.
  taskListEl.appendChild(taskActionsEl);

  // here we appending the entire list into the parent <ul>
  taskToDoEl.appendChild(taskListEl);
  // Increase task counter for next Unique Id
  taskIdCounter++;
};

// Function which is going to dynamically create form element (delete button ,edit button and select dropdown)
var createTaskActions = function (taskId) {
  // create div element , which will act as a container for other elements ,delete button
  //  edit button and select.
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  // create Edit button.
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  //  create Delete button.
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // create Select dropdown
  var statusSelectEl = document.createElement("select");

  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);

  // I could create option element with its value and append them to the select element
  // but that would lead to the similar looking code . in order to dry the code i will use for loop .
  // and also make it easier to add a more choices
  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    //create an option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
console.log(taskFormHandler);
