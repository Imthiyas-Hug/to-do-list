// storage.js

// Save all tasks
export function saveTodos(taskBox, completedBox = []) {
    const allTasks = [...taskBox, ...completedBox].map(todoDiv => ({
        name: todoDiv.querySelector('h3').textContent,
        description: todoDiv.querySelector('p').textContent,
        dueDate: todoDiv.querySelector('span').textContent,
        projectFolderId: todoDiv.id,
        completed: todoDiv.querySelector('input[type=checkbox]').checked
    }));
    localStorage.setItem('todos', JSON.stringify(allTasks));
}


// Load all tasks
export function loadTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

// Save projects
export function saveProjects(projectNames) {
    localStorage.setItem('projects', JSON.stringify(projectNames));
}

// Load projects
export function loadProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
}
