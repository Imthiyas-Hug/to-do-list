import { projectNames } from "./index.js";

const myProjects = document.querySelector('.my-projects');
const main = document.querySelector('.main');

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

            projectBtnDiv.addEventListener('click',(event)=>{
                Array.from(main.children).forEach(elem=>{
                    if(event.target.dataset.id == elem.id){
                        main.textContent = '';
                        main.append(elem);
                    }
                })
            })
        }
    });
}
