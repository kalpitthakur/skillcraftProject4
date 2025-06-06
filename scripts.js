let tasks = [];

function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const datetime = document.getElementById('taskDateTime').value;

    if (title === '') {
        alert("Please enter a task title.");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        datetime: datetime,
        completed: false
    };

    tasks.push(task);
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDateTime').value = '';
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newTitle = prompt("Edit Task Title:", task.title);
    const newDateTime = prompt("Edit Date & Time (YYYY-MM-DDTHH:MM):", task.datetime);

    if (newTitle) {
        task.title = newTitle;
        if (newDateTime) task.datetime = newDateTime;
    }

    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task ${task.completed ? 'completed' : ''}`;

        const title = document.createElement('div');
        title.className = 'title';
        title.innerHTML = `<strong>${task.title}</strong><br><span class="date-time">${task.datetime || ''}</span>`;

        const actions = document.createElement('div');
        actions.className = 'actions';
        actions.innerHTML = `
      <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

        taskDiv.appendChild(title);
        taskDiv.appendChild(actions);
        taskList.appendChild(taskDiv);
    });
}
