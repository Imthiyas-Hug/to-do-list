import { main, taskBox, myProjects, secondTaskBtn } from "./domstuff";
import { completedTaskBtn } from "./completed";
import { allTasksBtn } from "./allTasks";

export const currentProject = document.querySelector('.current-project')
const projectBtn = document.querySelector('.project-btn');

projectBtn.addEventListener('click', (event) => {
    main.textContent = '';
    currentProject.textContent = 'Default Project';
    if (myProjects.querySelector('.active') !== null) {
        myProjects.querySelector('.active').classList.remove('active');
    }
    if (completedTaskBtn.classList.contains('active')) {
        completedTaskBtn.classList.remove('active');
    }
    if (allTasksBtn.classList.contains('active')) {
        allTasksBtn.classList.remove('active');
    }

    projectBtn.classList.add('active');
    taskBox.forEach(elem => {
        if (event.target.dataset.id == elem.id) {
            elem.style.display = 'block';
            main.append(elem);
        }
    })
    const items = taskBox.filter(elem => elem.id == event.target.dataset.id);
    if (taskBox.length == '0' || items.length == '0') {
        secondTaskBtn.style.display = 'block';
    }
    else{
        secondTaskBtn.style.display = 'none';
    }
})

export function defaultActive() {
    main.textContent = '';
    currentProject.textContent = 'Default Project'
    projectBtn.classList.add('active');
    taskBox.forEach(elem => {
        if (elem.id == '0') {
            main.append(elem);
        }
    })
    const items = taskBox.filter(elem => elem.id == projectBtn.dataset.id);
    if (taskBox.length == '0' || items.length == '0') {
        secondTaskBtn.style.display = 'block';
    }
    else{
        secondTaskBtn.style.display = 'none';
    }
}