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

const projectNames = ['Default Project'];
const taskBox = [];
console.log('project',projectNames)
const selectElement = document.querySelector('#project-folder');

const main = document.querySelector('.main');
const projectBtn = document.querySelector('.project-btn')

class NewTask {
    constructor(name, description, dueDate, id) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.projectFolderId = id;

    }
}

class NewProject {
    constructor(name) {
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
    if (taskNameInput.value && projectFolderInput && dueDateInput.value && priorityInput.value && descriptionInput.value) {
        const todoItemInputs = new NewTask(taskNameInput.value, descriptionInput.value, dueDateInput.value, projectFolderInput.value);
        appendToDo(todoItemInputs);
        newTaskDialog.close();
    }
})

cancelBtn.addEventListener('click', () => {
    newTaskDialog.close();
})

newProjectBtn.addEventListener('click', () => {
    projectNameInput.value = '';
    newProjectDialog.showModal();
})

submitBtn2.addEventListener('click', (event) => {
    event.preventDefault();
    if (projectNameInput.value) {
        const projectNameValue = new NewProject(projectNameInput.value);
        console.log('project',projectNameInput.value);

        console.log("uhjlkjl",projectNameValue)
        projectNames.push(projectNameValue.name);
        
        appendProject();
        addProjectFolder();
        newProjectDialog.close();
    }
})

cancelBtn2.addEventListener('click', () => {
    newProjectDialog.close();
})

function addProjectFolder() {
    projectNames.forEach((elem, index, array) => {
        if (index == array.length - 1) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = elem;
            selectElement.appendChild(option);
        }
    })
}

projectBtn.addEventListener('click', (event) => {
    Array.from(main.children).forEach(elem => {        
        if (event.target.dataset.id == elem.id) {
            console.log('task id',elem.id);
            main.append(elem);
        }
    })
})

export { projectNames };

