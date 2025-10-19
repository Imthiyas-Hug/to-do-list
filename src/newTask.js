
import { currentProject } from "./defaultFolder";
import { appendToDo, completedBox, myProjects, taskBox } from "./domstuff";
import { completedTaskBtn } from "./completed";
import { allTasksBtn } from "./allTasks";
import { saveTodos } from './storage.js';

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
    constructor(name, id, dueDate, priority, description, completed = false) {
        this.name = name;
        this.projectFolderId = id;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
        this.completed = completed;
    }
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (taskNameInput.value && projectFolderInput && dueDateInput.value && priorityInput.value && descriptionInput.value) {
        const todoItemInputs = new NewTask(taskNameInput.value, projectFolderInput.value, dueDateInput.value, priorityInput.value, descriptionInput.value);
        currentProject.textContent = projectFolderInput.options[projectFolderInput.selectedIndex].text;
        if (myProjects.querySelector('.active') !== null) {
            myProjects.querySelector('.active').classList.remove('active');
        }
        if (completedTaskBtn.classList.contains('active')) {
            completedTaskBtn.classList.remove('active');
        }
        if (allTasksBtn.classList.contains('active')) {
            allTasksBtn.classList.remove('active');
        }
        myProjects.querySelector(`[data-id="${projectFolderInput.value}"]`).classList.add('active');
        appendToDo(todoItemInputs);
        saveTodos(taskBox, completedBox); 
        newTaskDialog.classList.add("dialog-closing");
        setTimeout(() => {
            newTaskDialog.classList.remove("dialog-closing");
            newTaskDialog.close();
        }, 50); // match animation duration
    }
})

cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newTaskDialog.classList.add("dialog-closing");
    setTimeout(() => {
        newTaskDialog.classList.remove("dialog-closing");
        newTaskDialog.close();
    }, 250); // match animation duration
})

newTaskBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        taskNameInput.value = '';
        dueDateInput.value = '';
        descriptionInput.value = '';
        priorityInput.selectedIndex = 0;
        newTaskDialog.showModal();
    })
})