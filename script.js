document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => renderTasks(task));

    addTaskButton.addEventListener('click', () => {
        let taskText = todoInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks(newTask);  // Add the new task to the UI
        todoInput.value = ""; // Clear Input
    });

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(task) {
        const li = document.createElement("li");
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>
`;

        const deleteBtn = li.querySelector(".delete-btn");
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            li.remove();
        });

        todoList.appendChild(li);
    }
});
