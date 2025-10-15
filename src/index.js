import { appendToDo } from "./domstuff";
import { appendProject } from "./domstuff";
import './styles.css';

const newTaskBtn = document.querySelectorAll('.new-task-btn');
const newProjectBtn = document.querySelector('.new-project-btn');

const newTaskDialog = document.querySelector('.create-task-dialog');
const newProjectDialog = document.querySelector('.create-project-dialog');

const submitBtn = document.querySelector('#submit');
const cancelBtn = document.querySelector('#cancel');

const submitBtn2 = document.querySelector('#submit2');
const cancelBtn2 = document.querySelector('#cancel2');

const taskNameInput = document.querySelector('#task-name');
const projectNameInput = document.querySelector('#project-name');

const projectFolderInput = document.querySelector('#project-folder');
const dueDateInput = document.querySelector('#due-date');
const priorityInput = document.querySelector('#my-dropdown');
const descriptionInput = document.querySelector('#description');

const projectNames = [];
const selectElement = document.querySelector('#project-folder');

class NewTask {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }
}

class NewProject {
    constructor(name){
        this.name = name;
    }
}

newTaskBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        taskNameInput.value = '';
        dueDateInput.value = '';
        descriptionInput.value = '';
        newTaskDialog.showModal();
    })
})

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (taskNameInput.value && projectFolderInput.value && dueDateInput.value && priorityInput.value && descriptionInput.value) {
        const todoItemInputs = new NewTask(taskNameInput.value, descriptionInput.value, dueDateInput.value);
        appendToDo(todoItemInputs);
        newTaskDialog.close();
    }
})

cancelBtn.addEventListener('click', () => {
    newTaskDialog.close();
})

newProjectBtn.addEventListener('click',()=>{
    projectNameInput.value = '';
    newProjectDialog.showModal();
})

submitBtn2.addEventListener('click', (event) => {
    event.preventDefault();
    if (projectNameInput.value) {
        const projectNameValue = new NewProject(projectNameInput.value);
        appendProject(projectNameValue);
        projectNames.push(projectNameValue);
        newProjectDialog.close();
        console.log(projectNames)
    }
})

cancelBtn2.addEventListener('click', () => {
    newProjectDialog.close();
})

projectNames.forEach(name =>{
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    selectElement.appendChild(option);
})