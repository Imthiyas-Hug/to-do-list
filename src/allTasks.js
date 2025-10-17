import { main, taskBox } from './domstuff.js';
import { currentProject } from './defaultFolder.js';

const allTasksBtn = document.querySelector('.all-tasks-btn');
allTasksBtn.addEventListener('click', () => {
    main.textContent = '';
    currentProject.textContent = 'All Tasks';
    taskBox.forEach(elem => {
        main.append(elem);
    })
})