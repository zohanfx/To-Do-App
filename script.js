// Retreive TODO from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// INITIALIZE
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function deleteAllTasks() {
  // some logic
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox"
                id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
            </div>
        `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toogleTask(index);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });

  // Agregar evento de escucha para la tecla "Enter"
  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Evitar que se ejecute la acción predeterminada del Enter (como agregar un salto de línea)
      event.preventDefault();

      const updatedText = inputElement.value.trim();
      if (updatedText) {
        todo[index].text = updatedText;
        saveToLocalStorage();
      }
      displayTasks();
    }
  });
}

function toogleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}


function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
      const p = document.createElement("p");
      p.innerHTML = `
        <div class="todo-container">
          <input type="checkbox" class="todo-checkbox"
            id="input-${index}" ${item.disabled ? "checked" : ""}>
          <p id="todo-${index}" class="${
            item.disabled ? "disabled" : ""
          }">${item.text}</p>
          <span class="delete-icon" onclick="deleteTask(${index})">&#128465;</span>
        </div>
      `;
      p.querySelector(".todo-checkbox").addEventListener("change", () => {
        toogleTask(index);
      });
      todoList.appendChild(p);
    });
    todoCount.textContent = todo.length;
  }
  
  function deleteTask(index) {
    todo.splice(index, 1);
    saveToLocalStorage();
    displayTasks();
  }

// console.log(todoInput);
