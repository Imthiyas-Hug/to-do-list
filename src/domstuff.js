import { projectNames } from "./newProject.js";
import { currentProject } from "./defaultFolder.js";
import { completedTaskBtn } from "./completed.js";
import { allTasksBtn } from "./allTasks.js";
import { defaultActive } from "./defaultFolder.js";
import { selectElement1 } from "./newProject.js";
import { saveTodos, saveProjects } from './storage.js';

let currentEditDiv = null; 
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
    checkBox.checked = task.completed || false;

    todoItemDiv.dataset.priority = task.priority;

    const taskDetailDueDiv = document.createElement('div');
    taskDetailDueDiv.classList.add('task-detail-dueDiv');

    const taskName = document.createElement('h3');
    taskName.textContent = task.name;

    const description = document.createElement('p');
    description.textContent = task.description;

    const dueDate = document.createElement('span');
    dueDate.textContent = task.dueDate;

    taskDetailDueDiv.append(taskName, description, dueDate);

    const buttonsDiv = document.createElement('div');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn')
    editBtn.textContent = 'Edit';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn')
    
    buttonsDiv.append(editBtn, deleteBtn);

    todoItemDiv.append(checkBox, taskDetailDueDiv, buttonsDiv);
    if (checkBox.checked) {
        completedBox.push(todoItemDiv);
        todoItemDiv.style.display = 'none'; // hide completed initially
    } else {
        taskBox.push(todoItemDiv);
        saveTodos(taskBox, completedBox);
    }

    taskBox.forEach((elem, index) =>{
        elem.dataset.id = index;
        editBtn.dataset.id = elem.dataset.id;
    })

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
        saveTodos(taskBox, completedBox);
    })

    editBtn.addEventListener('click', () => {
        if (checkBox.checked) {
            return;
        }        
        currentEditDiv = todoItemDiv;

        taskNameInput.value = taskName.textContent;
        projectFolderInput.value = todoItemDiv.id;
        dueDateInput.value = dueDate.textContent;
        descriptionInput.value = description.textContent;
        editTaskDialog.showModal();

    })

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (!currentEditDiv) return;

        currentEditDiv.id = projectFolderInput.value;
        currentEditDiv.dataset.priority = priorityInput.value; 
        currentEditDiv.priority = priorityInput.value;
        currentEditDiv.completed = currentEditDiv.querySelector('#my-checkbox').checked;
       

        const title = currentEditDiv.querySelector('.task-detail-dueDiv h3');
        const description = currentEditDiv.querySelector('.task-detail-dueDiv p');
        const dueDate = currentEditDiv.querySelector('.task-detail-dueDiv span');
         
        if (title) title.textContent = taskNameInput.value;
        if (description) description.textContent = descriptionInput.value;
        if (dueDate) dueDate.textContent = dueDateInput.value;
        
        const selectedPriority = priorityInput.value; // get selected priority
        currentEditDiv.dataset.priority = selectedPriority;

        saveTodos(taskBox, completedBox);

        currentProject.textContent = projectFolderInput.options[projectFolderInput.selectedIndex].text;
        myProjects.querySelector('.active').classList.remove('active');
        myProjects.querySelector(`[data-id="${projectFolderInput.value}"]`).classList.add('active');

        main.innerHTML = '';
        taskBox.forEach(elem =>{
            if(elem.id == projectFolderInput.value){
                main.append(elem);
            }
        });

        editTaskDialog.close();
        currentEditDiv = null;
    })
    
    cancelBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editTaskDialog.close();
    })

    deleteBtn.addEventListener('click', () => {
        todoItemDiv.remove();
        taskBox = taskBox.filter(elem => elem !== todoItemDiv);
        completedBox = completedBox.filter(elem => elem !== todoItemDiv);

       saveTodos(taskBox, completedBox);

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
        const items = taskBox.filter(elem => elem !== todoItemDiv);        
        if (items.length == '0') {
            secondTaskBtn.style.display = 'block';
        }
        else{
            secondTaskBtn.style.display = 'none';
        }
    })

}
export function appendProject(projectFolder) {

        const projectBtnDiv = document.createElement("div");
        projectBtnDiv.classList.add("project-btn");
        projectBtnDiv.dataset.id = projectFolder.id;

        const fileIcon = document.createElement("span");
        fileIcon.textContent = "📂";

        const projectBtn = document.createElement("span");
        projectBtn.textContent = projectFolder.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "🗑️";
        deleteBtn.id = projectFolder.id;

        projectBtnDiv.append(fileIcon, projectBtn, deleteBtn);
        myProjects.append(projectBtnDiv);

        main.textContent = "";
        currentProject.textContent = projectFolder.name;
        projectBtnDiv.classList.add("active");
        secondTaskBtn.style.display = 'block';

        projectBtnDiv.addEventListener("click", (event) => {

            main.textContent = "";
            currentProject.textContent = projectFolder.name;

            if (myProjects.querySelector(".active") !== null) {
                myProjects.querySelector(".active").classList.remove("active");
            }

            if (completedTaskBtn.classList.contains("active")) {
                completedTaskBtn.classList.remove("active");
            }

            if (allTasksBtn.classList.contains("active")) {
                allTasksBtn.classList.remove("active");
            }

            projectBtnDiv.classList.add("active");
            taskBox.forEach((elem) => {
                if (event.target.dataset.id == elem.id) {
                    elem.style.display = "block";
                    main.append(elem);
                }
            });
            const items = taskBox.filter(elem => elem.id == event.target.dataset.id);
            if (taskBox.length == '0' || items.length == '0') {
                secondTaskBtn.style.display = 'block';
            }
            else{
                secondTaskBtn.style.display = 'none';
            }
            if(myProjects.querySelector(`[data-id="${event.target.dataset.id}"]`) == null){
                defaultActive();
            }

         });

        deleteBtn.addEventListener('click',(event)=>{
                const elemToRemove =  myProjects.querySelector(`[data-id="${event.target.id}"]`)
                myProjects.removeChild(elemToRemove);
                taskBox = taskBox.filter(elem => elem.id !== event.target.id);
                completedBox = completedBox.filter(elem => elem.id !== event.target.id);
                projectNames.splice(event.target.id, 1);
                selectElement1.remove(event.target.id);
                selectElement2.remove(event.target.id);

                saveProjects(projectNames);
                saveTodos(taskBox); 
        })
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
