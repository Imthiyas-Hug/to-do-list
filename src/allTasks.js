import { main, taskBox, myProjects } from './domstuff.js';
import { currentProject } from './defaultFolder.js';
import { completedTaskBtn } from './completed.js';
import { secondTaskBtn } from './domstuff.js';

export const allTasksBtn = document.querySelector('.all-tasks-btn');

allTasksBtn.addEventListener('click', () => {
    main.textContent = '';
    currentProject.textContent = 'All Tasks';
    if (myProjects.querySelector('.active') !== null) {
        myProjects.querySelector('.active').classList.remove('active');
    }
    if (completedTaskBtn.classList.contains('active')) {
        completedTaskBtn.classList.remove('active');
    }
    allTasksBtn.classList.add('active');
    taskBox.forEach(elem => {
        main.append(elem);
    })
    if (taskBox.length == '0') {
        secondTaskBtn.style.display = 'flex';
    }
})