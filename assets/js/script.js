// console.dir display the HTML element as an object know as DOM element.
// console.dir(window.document);
// var buttonEl = document.querySelector("button");
// Moved event listener from button to the form element.

// variable to reference task in progress.
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
// variable to reference task completed.
var tasksCompletedEl = document.querySelector("#tasks-completed");
// creating a variable that is going to hold Id number for each task that gets created . with an initial value of 0.
var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;

// array to save the list of task items
var tasks = [];

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

  // save the edit task.
  // hasAttribute() is checking if an attribute has been created or not.
  var isEdit = formEl.hasAttribute("data-task-id");
  // console.log(isEdit);
  // has data attribute, so get task id and call function to complete edit process.

  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    // if the edit button gets the data-task-id completeEditTask() will be called.
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  //  if the edit button does have the id createTaskEl function will be called.
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do",
    };
    createTaskEl(taskDataObj);
  }
};
// function which will be executed  if the task is getting edited
var completeEditTask = function (taskName, taskType, taskId) {
  // console.log(taskName, taskType, taskId);
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  //set new value to taskName and taskType
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  alert("Task Updated!");

  // loop through tasks array and task object with new content.
  debugger;
  // for loop is iterates over an array starting i=0 and look for the id that pass through completeEditTask
  // as an argument when id of the task matches with the taskId their value get saved in a taskName and taskType
  for (var i = 0; i < tasks.length; i++) {
    // taskId is a string and tasks[i].id is a number . we are using parseInt()to convert it to a number.
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }
  // calling saveTasks function to save updated task in local storage.
  saveTasks();
  formEl.removeAttribute("data-task-id");
  // putting back the text of a button from Save task to Add Task
  document.querySelector("#save-task").textContent = "Add Task";
};

// creating a new function
// createTaskEl is accepting a taskDataObj as an object
var createTaskEl = function (taskDataObj) {
  // taskDataObj{
  name: "Task's name";
  type: "task's type";
  // }
  // console.log(taskDataObj);
  // console.log(taskDataObj.status);
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
  // getting the id of taskDataObj
  taskDataObj.id = taskIdCounter;
  // pushing the data into an array using push method that adds object to the end of an array.
  tasks.push(taskDataObj);
  // calling saveTasks function to store create list item in local storage
  saveTasks();
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
  //create a new array to hold updated list of tasks.
  var updatedTaskArr = [];
  // loop through the current list of task and  look for selected list item Id.
  // We are using parseInt method to convert taskId value from a string to number
  for (var i = 0; i < tasks.length; i++)
    // if tasks[i].id doesn't match the value of the taskId . lets keep that task and push it to into new array.
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  // reassign tasks array to be the same as updateTaskArr
  tasks = updatedTaskArr;
  // calling save task function to store tasks array in local storage after the the task has been deleted.
  saveTasks();
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

// function that is going to move task to the different column as user selected different task type
var tasksStatusChangeHandler = function (event) {
  // console.log(event.target);

  // get the task items id
  var taskId = event.target.getAttribute("data-task-id");
  // get the selected value from select element.
  var statusValue = event.target.value.toLowerCase();

  //find the parent task item based on the id.
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  if (statusValue === "to do") {
    taskToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress")
    tasksInProgressEl.appendChild(taskSelected);
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }
  // update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  //calling saveTasks function to save tasks after the status has changed.

  saveTasks();
};
// Function to save data to local storage.
var saveTasks = function () {
  // using JSON.stringify method to convert value into a string coz local storage take
  // value in string only.
  // localStorage.setItem("tasks",tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", tasksStatusChangeHandler);
