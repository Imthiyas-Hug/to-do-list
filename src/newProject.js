import { appendProject, myProjects, addProjectToSelect2Element } from "./domstuff";
import { completedTaskBtn } from "./completed";
import { allTasksBtn } from "./allTasks";
import { saveProjects } from "./storage";

const newProjectBtn = document.querySelector('.new-project-btn');
const newProjectDialog = document.querySelector('.create-project-dialog');
const submitBtn = document.querySelector('#submit2');
const cancelBtn = document.querySelector('#cancel2');
const projectNameInput = document.querySelector('#project-name');
export const selectElement1 = document.querySelector("#project-folder");

export const projectNames = ['Default Project'];

class NewProject {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (projectNameInput.value) {
        const folderId = projectNames.length;
        const projectNameInputs = new NewProject(projectNameInput.value, folderId);
        projectNames.push(projectNameInputs.name);
        if (myProjects.querySelector('.active') !== null) {
            myProjects.querySelector('.active').classList.remove('active');
        }
        if (completedTaskBtn.classList.contains('active')) {
            completedTaskBtn.classList.remove('active');
        }
        if (allTasksBtn.classList.contains('active')) {
            allTasksBtn.classList.remove('active');
        }
        appendProject(projectNameInputs);
        saveProjects(projectNames);
        addProjectToSelectElement();
        addProjectToSelect2Element();
        newProjectDialog.close();
    }
})

cancelBtn.addEventListener('click', () => {
    newProjectDialog.close();
})

function addProjectToSelectElement() {
    projectNames.forEach((elem, index, array) => {
        if (index == array.length - 1) {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = elem;
            selectElement1.append(option);
        }
    })
}

newProjectBtn.addEventListener('click', () => {
    projectNameInput.value = '';
    newProjectDialog.showModal();
})