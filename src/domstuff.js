import { projectNames } from "./newProject.js";
import { currentProject } from "./defaultFolder.js";
import { completedTaskBtn } from "./completed.js";
import { allTasksBtn } from "./allTasks.js";
import { selectElement1 } from "./newProject.js";
import { defaultActive } from "./defaultFolder.js";

const editTaskDialog = document.querySelector(".edit-task-dialog");
const submitBtn = document.querySelector("#submit3");
const taskNameInput = document.querySelector("#task-name2");
const projectFolderInput = document.querySelector("#project-folder2");
const dueDateInput = document.querySelector("#due-date2");
const priorityInput = document.querySelector("#my-dropdown");
const descriptionInput = document.querySelector("#description2");
const cancelBtn = document.querySelector("#cancel3");
const selectElement2 = document.querySelector("#project-folder2");

export const secondTaskBtn = document.querySelector('.second-task-btn');
export const myProjects = document.querySelector('.my-projects');
export const main = document.querySelector('.main');
export let completedBox = [];
export let taskBox = [];

export function appendToDo(task) {
    secondTaskBtn.style.display = 'none';
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
    editBtn.classList.add('edit-btn')
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
            taskBox = taskBox.filter(elem => (!(elem.querySelector('#my-checkbox').checked)));
        }
        else {
            todoItemDiv.style.display = 'none';
            taskBox.push(todoItemDiv);
            completedBox = completedBox.filter(elem => ((elem.querySelector('#my-checkbox').checked)));
            if (completedBox.length == '0') {
                main.textContent = 'Looks like no tasks have been completed.'
            }
        }
    })

    editBtn.addEventListener('click', () => {
        if (checkBox.checked) {
            return;
        }
        taskNameInput.value = taskName.textContent;
        dueDateInput.value = dueDate.textContent;
        descriptionInput.value = description.textContent;
        editTaskDialog.showModal();
    })

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        taskName.textContent = taskNameInput.value;
        todoItemDiv.id = projectFolderInput.value;
        description.textContent = descriptionInput.value;
        dueDate.textContent = dueDateInput.value;
        todoItemDiv.id = projectFolderInput.value;

        main.textContent = '';
        currentProject.textContent = projectFolderInput.options[projectFolderInput.selectedIndex].text;
        myProjects.querySelector('.active').classList.remove('active');
        myProjects.querySelector(`[data-id="${projectFolderInput.value}"]`).classList.add('active');
        taskBox.forEach(elem => {
            if (elem.id == projectFolderInput.value) {
                elem.style.display = 'block';
                main.append(elem);
            }
        })
        editTaskDialog.close();

    })

    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editTaskDialog.close();
    })

    deleteBtn.addEventListener('click', () => {
        taskBox.splice(todoItemDiv, 1);
        completedBox.splice(todoItemDiv, 1);
        main.textContent = '';
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
        taskBox.forEach(elem => {
            if (elem.id == projectFolderInput.value) {
                elem.style.display = 'block';
                main.append(elem);
            }
        })
        if (taskBox.length == '0') {
            secondTaskBtn.style.display = 'block';
        }
    })

}

export function appendProject() {

    projectNames.forEach((value, index, array) => {
        if (index == array.length - 1) {
            secondTaskBtn.style.display = 'block';

            const projectBtnDiv = document.createElement('div');
            projectBtnDiv.classList.add('project-btn');
            projectBtnDiv.dataset.id = index;

            const fileIcon = document.createElement('span');
            fileIcon.textContent = '📂';

            const projectBtn = document.createElement('button');
            projectBtn.textContent = value;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.id = index;

            projectBtnDiv.append(fileIcon, projectBtn, deleteBtn);
            myProjects.append(projectBtnDiv);

            deleteBtn.addEventListener('click', (event) => {
                projectBtnDiv.style.display = 'none';
                taskBox = taskBox.filter(elem => elem.id !== event.target.id);
                projectNames.splice(index, 1);
                selectElement1.options[index] = null;
                selectElement2.options[index] = null;
            })

            main.textContent = '';
            currentProject.textContent = value;
            projectBtnDiv.classList.add('active');

            projectBtnDiv.addEventListener('click', (event) => {
                main.textContent = '';
                currentProject.textContent = value;
                if (myProjects.querySelector('.active') !== null) {
                    myProjects.querySelector('.active').classList.remove('active');
                }
                if (completedTaskBtn.classList.contains('active')) {
                    completedTaskBtn.classList.remove('active');
                }
                if (allTasksBtn.classList.contains('active')) {
                    allTasksBtn.classList.remove('active');
                }
                projectBtnDiv.classList.add('active');
                taskBox.forEach(elem => {
                    if (event.target.dataset.id == elem.id) {
                        elem.style.display = 'block';
                        main.append(elem);
                    }
                })
                if (taskBox.length == '0') {
                    secondTaskBtn.style.display = 'block';
                }
            })
        }
    });
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

export function addProjectToSelect2Element() {
    projectNames.forEach((elem, index, array) => {
        if (index == array.length - 1) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = elem;
            selectElement2.append(option);
        }
    })
}