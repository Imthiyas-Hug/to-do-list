import { main, taskBox } from "./domstuff";

export const currentProject = document.querySelector('.current-project')
const projectBtn = document.querySelector('.project-btn');

projectBtn.addEventListener('click', (event) => {
    main.textContent = '';
    currentProject.textContent = 'Default Project'
    taskBox.forEach(elem => {        
        if (event.target.dataset.id == elem.id) {
            main.append(elem);
        }
    })
})

export function defaultActive(){
    main.textContent = '';
    currentProject.textContent = 'Default Project'
    projectBtn.classList.add('active');
    taskBox.forEach(elem => {        
        if ( elem.id == '0') {
            main.append(elem);
        }
    })
}