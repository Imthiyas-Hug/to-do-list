const main = document.querySelector('.main');
const myProjects = document.querySelector('.my-projects');

export function appendToDo(task){
    const todoItemDiv = document.createElement('div');

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

export function appendProject(project){
    const projectBtnDiv = document.createElement('div');
    projectBtnDiv.classList.add('project-btn');

    const fileIcon = document.createElement('span');
    fileIcon.textContent = '📂';

    const projectBtn = document.createElement('button');
    projectBtn.textContent = project.name;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';

    projectBtnDiv.append(fileIcon, projectBtn, deleteBtn);
    myProjects.append(projectBtnDiv);
}