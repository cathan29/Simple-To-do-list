document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearAllBtn = document.getElementById('clear-all-btn');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
        toggleClearAllButton();
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.querySelector('.task-text').classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to the DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.className = 'task-text';
        if (completed) span.classList.add('completed');
        span.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        // Mark task as completed
        span.addEventListener('click', () => {
            span.classList.toggle('completed');
            saveTasks();
        });

        // Delete task
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTasks();
            toggleClearAllButton();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    // Add task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = '';
            toggleClearAllButton();
        }
    });

    // Add task on Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Clear all tasks
    clearAllBtn.addEventListener('click', () => {
        taskList.innerHTML = '';
        saveTasks();
        toggleClearAllButton();
    });

    // Toggle Clear All button visibility
    const toggleClearAllButton = () => {
        clearAllBtn.classList.toggle('hidden', taskList.children.length === 0);
    };

    // Initialize app
    loadTasks();
});