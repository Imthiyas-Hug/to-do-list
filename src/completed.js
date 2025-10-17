import { currentProject } from "./defaultFolder";
import { taskBox, main, myProjects } from "./domstuff";
import { completedBox } from "./domstuff";

const completedTaskBtn = document.querySelector('.completed-task-btn');

completedTaskBtn.addEventListener('click', () => {
    main.textContent = '';
    currentProject.textContent = 'Completed';
    console.log('array',completedBox)
    completedBox.forEach(elem => {
            elem.style.display = 'block';
            main.append(elem);
    })
})

