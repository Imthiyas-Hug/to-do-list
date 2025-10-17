import { appendProject, myProjects } from "./domstuff";

const newProjectBtn = document.querySelector('.new-project-btn');
const newProjectDialog = document.querySelector('.create-project-dialog');
const submitBtn = document.querySelector('#submit2');
const cancelBtn = document.querySelector('#cancel2');
const projectNameInput = document.querySelector('#project-name');
const selectElement = document.querySelector("#project-folder");
export const projectNames = ['Default Project'];

class NewProject {
    constructor(name) {
        this.name = name;
    }
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (projectNameInput.value) {
        const projectNameValue = new NewProject(projectNameInput.value);
        projectNames.push(projectNameValue.name);
        appendProject();
        addProjectToSelectElement();
        myProjects.querySelector('.active').classList.remove('active');
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
            selectElement.appendChild(option);
        }
    })
}

newProjectBtn.addEventListener('click', () => {
    projectNameInput.value = '';
    newProjectDialog.showModal();
})