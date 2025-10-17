import { appendToDo } from "./domstuff";

const newTaskBtn = document.querySelectorAll(".new-task-btn");
const newTaskDialog = document.querySelector(".create-task-dialog");
const submitBtn = document.querySelector("#submit");
const cancelBtn = document.querySelector("#cancel");
const taskNameInput = document.querySelector("#task-name");
const projectFolderInput = document.querySelector("#project-folder");
const dueDateInput = document.querySelector("#due-date");
const priorityInput = document.querySelector("#my-dropdown");
const descriptionInput = document.querySelector("#description");
const main = document.querySelector(".main");

class NewTask {
  constructor(name, id, dueDate, priority, description) {
    this.name = name;
    this.projectFolderId = id;
    this.dueDate = dueDate;
    this.priority = priority;
    this.description = description;
  }
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (taskNameInput.value && projectFolderInput && dueDateInput.value && priorityInput.value && descriptionInput.value) {
        const todoItemInputs = new NewTask(taskNameInput.value, projectFolderInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value);
        appendToDo(todoItemInputs);
        newTaskDialog.close();
    }
})

cancelBtn.addEventListener('click', () => {
    newTaskDialog.close();
})

newTaskBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        taskNameInput.value = '';
        dueDateInput.value = '';
        descriptionInput.value = '';
        newTaskDialog.showModal();
    })
})