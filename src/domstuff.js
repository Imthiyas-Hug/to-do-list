import { projectNames } from "./newProject.js";
import { currentProject } from "./defaultFolder.js";

export const myProjects = document.querySelector('.my-projects');
export const main = document.querySelector('.main');
export const taskBox = [];

export function appendToDo(task) {
    const todoItemDiv = document.createElement('div');
    todoItemDiv.id = task.projectFolderId;
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    const taskDetailDueDiv = document.createElement('div');
    const taskName = document.createElement('h3');
    taskName.textContent = task.name;

    const description = document.createElement('p');
    description.textContent = task.description;

    const dueDate = document.createElement('p');
    dueDate.textContent = task.dueDate;

    taskDetailDueDiv.append(taskName, description, dueDate);

    const buttonsDiv = document.createElement('div');
    const submitBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    buttonsDiv.append(submitBtn, cancelBtn);

    todoItemDiv.append(checkBox, taskDetailDueDiv, buttonsDiv);
    taskBox.push(todoItemDiv);    
    main.append(todoItemDiv);
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

            projectBtnDiv.addEventListener('click',(event)=>{
                main.textContent = '';
                currentProject.textContent = value;
                taskBox.forEach(elem => {        
                    if (event.target.dataset.id == elem.id) {
                        main.append(elem);
                    }   
            })
            })
        }   
    });
}

function addActive(value, projectBtnDiv){
    main.textContent = '';
    currentProject.textContent = value;
    projectBtnDiv.classList.add('active');
    
}
export function removeActive(projectBtnDiv){
    projectBtnDiv.classList.remove('active');
}