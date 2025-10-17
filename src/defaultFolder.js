import { main, taskBox, myProjects} from "./domstuff";

export const currentProject = document.querySelector('.current-project')
const projectBtn = document.querySelector('.project-btn');

projectBtn.addEventListener('click', (event) => {
    main.textContent = '';
    currentProject.textContent = 'Default Project'
    myProjects.querySelector('.active').classList.remove('active');
    projectBtn.classList.add('active');
    taskBox.forEach(elem => {        
        if (event.target.dataset.id == elem.id) {
            elem.style.display = 'block';   
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