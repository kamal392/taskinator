// console.dir display the HTML element as an object know as DOM element.
// console.dir(window.document);
// var buttonEl = document.querySelector("button");
// Moved event listener from button to the form element.
// creating a variable that is going to hold Id number for each task that gets created . with an initial value of 0.
var pageContentEl = document.querySelector("#page-content");

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
// console.log(taskFormHandler);

// create a function to delete task .
var deleteTask = function (taskId) {
  // data-task-id is also applied to list element .Here , we are selecting a
  // a list item using .task-item and further looking for a data-task-id .
  //.task-item[data-task-id allowed us to find a different element with the same data-task-id attribute.

  var taskSelected = document.querySelector(
    ".task-item[data-task-id = '" + taskId + "']"
  );
  taskSelected.remove();
  // console.log(taskSelected);
  // console.log(taskId);
};

// function to edit task .
var editTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id = '" + taskId + "']"
  );
  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  // console.log(taskName);
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  // console.log(taskType);
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name=task-type]").value = taskType;
  // Update the text of submit button to "Save Task";
  document.querySelector("#save-task").textContent = "Save Task";

  //This will add taskId to a data-task-id on the form itself
  formEl.setAttribute("data-task-id", taskId);
};

// This taskButtonHandler function is going to add the
//  delete or edit the task using taskDelete function and taskEdit function.
var taskButtonHandler = function (event) {
  console.log(event.target);
  // get target element from event
  var targetEl = event.target;

  if (targetEl.matches(".edit-btn")) {
    // we are accessing target list element using getAttribute
    var taskId = targetEl.getAttribute("data-task-id");
    // here we are passing the taskId to editTask function
    editTask(taskId);
  }
  //  delete button was clicked
  else if (targetEl.matches(".delete-btn"))
    var taskId = targetEl.getAttribute("data-task-id");
  //Here we are passing taskId to delete function .
  deleteTask(taskId);
};

pageContentEl.addEventListener("click", taskButtonHandler);
