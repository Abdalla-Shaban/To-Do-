let input = document.querySelector(".input");

let add = document.querySelector(".add");

let tasksDiv = document.querySelector(".tasks");

let delAll = document.querySelector(".delet-all");

let tasksContent = [];

if (window.localStorage.getItem("tasks")) {
  tasksContent = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

add.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    addTasks(input.value);
    input.value = "";
  }
});

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    removeTask(e.target.parentElement.id);
  }
  if (e.target.classList.contains("task")) {
    toggleTaskDiv(e.target.id);
    console.log(e.target.id);
    e.target.classList.toggle("done");
  }
});

delAll.addEventListener("click", (e) => {
  e.preventDefault();
});

delAll.onclick = () => {
  tasksDiv.innerHTML = "";
  tasksContent = [];
  addDataToLocalStorage(tasksContent);
};

function addTasks(taskText) {
  const task = {
    id: Date.now(),
    content: taskText,
    completed: false,
  };

  tasksContent.push(task);

  appendTasks(tasksContent);

  addDataToLocalStorage(tasksContent);
}

function appendTasks(ele) {
  tasksDiv.innerHTML = "";

  tasksContent.forEach((task) => {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = task.id;
    taskDiv.appendChild(document.createTextNode(task.content));
    if (task.completed) {
      taskDiv.classList.add("done");
    }
    let deleteButton = document.createElement("button");
    deleteButton.className = "del";
    deleteButton.appendChild(document.createTextNode("Delete"));
    taskDiv.appendChild(deleteButton);
    tasksDiv.appendChild(taskDiv);
  });
}

function addDataToLocalStorage(ele) {
  window.localStorage.setItem("tasks", JSON.stringify(ele));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  appendTasks(JSON.parse(data));
}

function removeTask(id) {
  tasksContent = tasksContent.filter((task) => task.id != id);
  addDataToLocalStorage(tasksContent);
}

function toggleTaskDiv(id) {
  for (let i = 0; i < tasksContent.length; i++) {
    if (tasksContent[i].id == id) {
      tasksContent[i].completed == false
        ? (tasksContent[i].completed = true)
        : (tasksContent[i].completed = false);
    }
  }
  addDataToLocalStorage(tasksContent);
}
