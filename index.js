const taskIconDiv = document.querySelector(".task-icon"),
  plusIcon = document.querySelector(".fa-plus"),
  closeIcon = document.querySelector(".fa-times"),
  formDiv = document.querySelector(".flex3-task"),
  formEl = document.querySelector("form"),
  totalTask = document.querySelector(".task-total"),
  taskEl = document.querySelector(".wraper-2");

const inputDate = document.getElementById("task-calendar"),
  inputText = document.getElementById("text-input"),
  taskInputBtn = document.querySelector(".task-btn"),
  taskClearBtn = document.getElementById("clear-btn");

taskIconDiv.addEventListener("click", displayForm);

// ===== show and hide form from page function=====

function displayForm(event) {
  if (event.target.classList.contains("fa-plus")) {
    showForm();
  } else if (event.target.classList.contains("fa-times")) {
    hideForm();
  }
}

// ====== show form on page function=======

function showForm(params) {
  formDiv.style.top = "0";
  plusIcon.style.display = "none";
  closeIcon.style.display = "block";
}

// ======hide form from page function=====

function hideForm(params) {
  formDiv.style.top = "-100%";
  closeIcon.style.display = "none";
  plusIcon.style.display = "block";
  formEl.reset();
}

// ======save values from input to local storage======

taskInputBtn.addEventListener("click", (event) => {
  event.preventDefault();

  getTask();
  // console.log(taskObj.length);

  myObject = {
    date: inputDate.value,
    text: inputText.value,
    completed: false,
  };

  taskObj.push(myObject);

  localStorage.setItem("tasks", JSON.stringify(taskObj));

  showTask();
  hideForm();
});

// ============FUNCTIONS==============

// ====get item from local Storage function======

function getTask() {
  if (inputDate == "" || inputText == "") {
    return alert("Please enter a valid task date and task");
  }

  let tasks = localStorage.getItem("tasks");
  if (tasks == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(tasks);
  }
}

// ===== show item on page from local storage function======

function showTask() {
  taskEl.innerHTML = "";

  getTask();

  if (taskObj == 0) {
    taskEl.innerHTML = "<p> No Task added. please enter task </p>";
  }

  taskObj.forEach(function (tasks, index) {
    let taskItems = document.createElement("div");
    let taskContents = document.createElement("div");
    let taskIcons = document.createElement("div");

    taskItems.classList.add("main-index");
    taskContents.classList.add("task-content");
    taskIcons.classList.add("task-index-icon");

    taskContents.innerHTML = `
      <p id="task-index-date"> ${tasks.date} </p>
      <span class="task-index"> ${index + 1} </span>
      <div class="task-text"> ${tasks.text} </div>
      <div class="task-hidden"> ${tasks.completed} </div>

      `;

    taskIcons.innerHTML = `
      <i class="fas fa-check" id="${index}" onclick="taskComplete (this.id)"></i>

      <i class="fas fa-edit" id="${index}" onclick="taskEdit (this.id)" ></i>

      <i class="fas fa-trash-alt" id="${index}" onclick="taskDelete (this.id)"></i>
      `;

    taskItems.appendChild(taskContents);
    taskItems.appendChild(taskIcons);

    if (taskObj != 0) {
      taskEl.appendChild(taskItems);

      // console.log(taskEl.childElementCount);
      console.log(taskItems.firstChild.children[3].innerText);

      const taskStatus = taskItems.firstChild.children[3].innerText;

      if (taskStatus == "true") {
        taskItems.classList.add("completed");
      }
    }
  });

  // if (taskObj.length > 0) {
  //   totalTask.innerHTML = `${taskObj.length} Tasks`;
  // }

  taskObj.length > 1
    ? (totalTask.innerHTML = `${taskObj.length} tasks`)
    : (totalTask.innerHTML = `${taskObj.length} task `);
}

// =====delete task from page function==========

function taskDelete(index) {
  deleteThisTask.trigger(deleteTask);

  function deleteTask() {
    getTask();
    taskObj.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskObj));
    showTask();
  }

  // const confirmDelete = confirm("You want to delete task?");

  // if (confirmDelete) {
  //   getTask();
  //   taskObj.splice(index, 1);
  //   localStorage.setItem("tasks", JSON.stringify(taskObj));
  //   showTask();
  // }
}

// ====delete all task ===========

taskClearBtn.addEventListener("click", () => {
  deleteAllTask.trigger(deleteAll);

  function deleteAll() {
    localStorage.clear();
    showTask();
  }

  // const confirmDelete = confirm("Delete all tasks");

  // if (confirmDelete) {
  //   localStorage.clear();
  //   showTask();
  // }
});

// =========edit task function===========

function taskEdit(index) {
  formEl.reset();
  showForm();

  getTask();
  inputText.focus();

  // console.log(taskObj[index].text);
  // console.log(taskObj[index].date);

  inputDate.value = taskObj[index].date;
  inputText.value = taskObj[index].text;

  taskObj.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taskObj));
  showTask();
}

function taskComplete(index) {
  taskEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("fa-check")) {
      getTask();

      // console.log(taskObj[index].text);
      // console.log(taskObj[index].completed);

      taskObj[index].completed = true;
      localStorage.setItem("tasks", JSON.stringify(taskObj));
      showTask();
    }
  });
}
showTask();
