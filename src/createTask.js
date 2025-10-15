const createTaskDialog = document.querySelector('.create-task-dialog');
const taskName = document.querySelector('#task-name').value;
const projectFolder = document.querySelector('#project-folder').value;
const dueDate = document.querySelector('#due-date').value;
const priority = document.querySelector('#my-dropdown').value;
const description = document.querySelector('#description').value;
const submitBtn = document.querySelector('#submit');
const cancelBtn = document.querySelector('#cancel');

class NewTask{
    constructor(name, projectFolder, dueDate, priority, description){
        this.name = name;
        this.projectFolder = projectFolder;
        this.dueDate = dueDate;
        this.priority = priority;
        this.description = description;
    }
}

const task1 = new NewTask(taskName, projectFolder, dueDate, priority, description);
