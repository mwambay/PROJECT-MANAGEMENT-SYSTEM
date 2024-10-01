document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const projectList = document.getElementById('project-list');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Gestion de l'ajout de projets
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectName = document.getElementById('project-name').value;
            addProject(projectName);
        });
    }

    // Gestion de l'ajout de tâches
    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const taskName = document.getElementById('task-name').value;
            const taskPriority = document.getElementById('task-priority').value;
            const taskDeadline = document.getElementById('task-deadline').value;
            addTask(taskName, taskPriority, taskDeadline);
        });
    }

    // Fonction pour ajouter un projet à la liste
    function addProject(name) {
        const li = document.createElement('li');
        li.textContent = name;
        projectList.appendChild(li);
        // Ici tu pourrais appeler une API backend pour enregistrer le projet
    }

    // Fonction pour ajouter une tâche à la liste
    function addTask(name, priority, deadline) {
        const li = document.createElement('li');
        li.textContent = `${name} (Priorité : ${priority}, Date limite : ${deadline})`;
        taskList.appendChild(li);
        // Ici tu pourrais appeler une API backend pour enregistrer la tâche
    }
});
