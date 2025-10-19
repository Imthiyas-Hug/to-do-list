import { currentProject } from "./defaultFolder";
import { taskBox, main, myProjects } from "./domstuff";
import { completedBox } from "./domstuff";
import { allTasksBtn } from "./allTasks";
import { secondTaskBtn } from "./domstuff";

export const completedTaskBtn = document.querySelector('.completed-task-btn');

completedTaskBtn.addEventListener('click', () => {
    main.textContent = '';
    secondTaskBtn.style.display = 'none';
    currentProject.textContent = 'Completed';
    if (myProjects.querySelector('.active') !== null) {
        myProjects.querySelector('.active').classList.remove('active');
    }
    if (allTasksBtn.classList.contains('active')) {
        allTasksBtn.classList.remove('active');
    }
    completedTaskBtn.classList.add('active');
    completedBox.forEach(elem => {
        elem.style.display = 'flex';
        main.append(elem);
        elem.querySelector('.edit-btn').addEventListener('click', () => {
            if (elem.querySelector('input').checked) {
                alert('Cannot Edit Completed Tasks!.');
                return;
            }

        })
    })
    if (completedBox.length == '0') {
        const text = document.createElement('p');
        text.textContent = 'Looks like no tasks have been completed.';
        text.classList.add('text')
        main.append(text);
    }
})

