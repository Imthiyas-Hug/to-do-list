import { projectNames } from "./newProject.js";
import { currentProject } from "./defaultFolder.js";

const editTaskDialog = document.querySelector(".edit-task-dialog");
const submitBtn = document.querySelector("#submit3");
const taskNameInput = document.querySelector("#task-name2");
const projectFolderInput = document.querySelector("#project-folder");
const dueDateInput = document.querySelector("#due-date2");
const priorityInput = document.querySelector("#my-dropdown");
const descriptionInput = document.querySelector("#description2");
const cancelBtn = document.querySelector("#cancel3");

export const myProjects = document.querySelector('.my-projects');
export const main = document.querySelector('.main');
export let completedBox = [];
export let taskBox = [];

export function appendToDo(task) {
    const todoItemDiv = document.createElement('div');
    todoItemDiv.id = task.projectFolderId;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = 'my-checkbox';

    const taskDetailDueDiv = document.createElement('div');
    const taskName = document.createElement('h3');
    taskName.textContent = task.name;

    const description = document.createElement('p');
    description.textContent = task.description;

    const dueDate = document.createElement('p');
    dueDate.textContent = task.dueDate;

    taskDetailDueDiv.append(taskName, description, dueDate);

    const buttonsDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    buttonsDiv.append(editBtn, deleteBtn);

    todoItemDiv.append(checkBox, taskDetailDueDiv, buttonsDiv);
    taskBox.push(todoItemDiv);

    appendItems(task, todoItemDiv);

    checkBox.addEventListener('change', (event) => {
        if (event.target.checked) {
            todoItemDiv.style.display = 'none';
            completedBox.push(todoItemDiv);
            console.log(taskBox);
            taskBox = taskBox.filter(elem => (!(elem.querySelector('#my-checkbox').checked)));
            console.log('before taskbox', taskBox)
            console.log('before completed', completedBox)
        }
        else {
            todoItemDiv.style.display = 'none';
            taskBox.push(todoItemDiv);
            console.log('after taskbox', taskBox)
            completedBox = completedBox.filter(elem => ((elem.querySelector('#my-checkbox').checked)));
        }
    })

    editBtn.addEventListener('click', () => {
        taskNameInput.value = taskName.textContent;
        dueDateInput.value = dueDate.textContent;
        descriptionInput.value = description.textContent;
        editTaskDialog.showModal();
    })

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(taskNameInput.value)
        taskName.textContent = taskNameInput.value;
        todoItemDiv.id = projectFolderInput.value;
        description.textContent = descriptionInput.value;
        dueDate.textContent = dueDateInput.value;
        editTaskDialog.close();

    })

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editTaskDialog.close();
    })


}

export function appendProject() {

    projectNames.forEach((value, index, array) => {
        if (index == array.length - 1) {
            const projectBtnDiv = document.createElement('div');
            projectBtnDiv.classList.add('project-btn');
            projectBtnDiv.dataset.id = index;

            const fileIcon = document.createElement('span');
            fileIcon.textContent = '📂';

            const projectBtn = document.createElement('button');
            projectBtn.textContent = value;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';

            projectBtnDiv.append(fileIcon, projectBtn, deleteBtn);
            myProjects.append(projectBtnDiv);
            addActive(value, projectBtnDiv);

            projectBtnDiv.addEventListener('click', (event) => {
                main.textContent = '';
                currentProject.textContent = value;
                myProjects.querySelector('.active').classList.remove('active');
                projectBtnDiv.classList.add('active');
                taskBox.forEach(elem => {
                    if (event.target.dataset.id == elem.id) {
                        elem.style.display = 'block';
                        main.append(elem);
                    }
                })
            })
        }
    });
}

function addActive(value, projectBtnDiv) {
    main.textContent = '';
    currentProject.textContent = value;
    projectBtnDiv.classList.add('active');

}

function appendItems(task, todoItemDiv) {
    main.textContent = '';
    taskBox.forEach(elem => {
        if (task.projectFolderId == elem.id) {
            main.append(elem);
        }
    })
    main.append(todoItemDiv);
}

