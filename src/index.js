import "./newTask.js";
import "./newProject.js";
import "./defaultFolder.js";
import "./domstuff.js";
import "./allTasks.js";
import "./completed.js";
import "./styles.css";
import { defaultActive } from "./defaultFolder.js";
import { loadTodos, loadProjects } from './storage.js';
import { appendToDo, appendProject } from './domstuff.js';
import { projectNames } from './newProject.js';


// Load saved projects
const savedProjects = loadProjects();
if (savedProjects.length > 0) {
    savedProjects.forEach((proj, index) => {
        projectNames[index] = proj; // update projectNames array
        appendProject({ name: proj, id: index });
    });
}

// Load saved todos
const savedTodos = loadTodos();
savedTodos.forEach(todo => appendToDo(todo));


defaultActive();