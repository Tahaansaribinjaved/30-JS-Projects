// Select DOM elements
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const taskModal = document.getElementById('taskModal');
const loader = document.getElementById('loader');

// Initialize tasks array
let tasks = [];

// Event listeners
openModalBtn.addEventListener('click', () => {
    taskModal.classList.remove('hidden');
});
closeModalBtn.addEventListener('click', () => {
    taskModal.classList.add('hidden');
});
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);
clearTasksBtn.addEventListener('click', clearTasks);
document.getElementById('filterAll').addEventListener('click', () => renderTasks('all'));
document.getElementById('filterCompleted').addEventListener('click', () => renderTasks('completed'));
document.getElementById('filterIncomplete').addEventListener('click', () => renderTasks('incomplete'));

// Add Task
function addTask() {
    const task = taskInput.value.trim();
    const date = taskDate.value;

    if (task === '' || date === '') return;

    const taskObj = {
        task,
        date,
        completed: false,
    };

    tasks.push(taskObj);
    storeTasks();
    renderTasks();

    taskInput.value = '';
    taskDate.value = '';
    taskModal.classList.add('hidden');

    showToast('Task added successfully!', 'success');
}

// Handle Task Actions
function handleTaskActions(e) {
    const index = e.target.dataset.index;
    if (e.target.classList.contains('edit-task')) {
        editTask(index);
    } else if (e.target.classList.contains('delete-task')) {
        deleteTask(index);
    } else if (e.target.classList.contains('toggle-complete')) {
        toggleComplete(index);
    }
}

// Edit Task
function editTask(index) {
    const updatedTask = prompt('Edit your task:', tasks[index].task);
    if (updatedTask !== null) {
        tasks[index].task = updatedTask;
        storeTasks();
        renderTasks();
        showToast('Task updated successfully!', 'success');
    }
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    storeTasks();
    renderTasks();
    showToast('Task deleted successfully!', 'error');
}

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    storeTasks();
    renderTasks();
    showToast('Task updated successfully!', 'success');
}

// Clear All Tasks
function clearTasks() {
    tasks = [];
    storeTasks();
    renderTasks();
    showToast('All tasks cleared!', 'error');
}

// Render Tasks with Filters
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;  // 'all' filter shows all tasks
    });

    if (filteredTasks.length === 0) {
        const message = document.createElement('div');
        message.className = 'bg-yellow-100 text-yellow-800 p-4 rounded-md text-center';
        message.textContent = `No ${filter === 'completed' ? 'completed' : filter === 'incomplete' ? 'incomplete' : 'available'} tasks available.`;
        taskList.appendChild(message);
        return;
    }

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `bg-gray-200 p-2 rounded flex justify-between items-center ${task.completed ? 'bg-green-200' : ''}`;
        li.innerHTML = `
            <div>
                <strong>${task.task}</strong>
                <span class="block text-sm text-gray-600">${task.date}</span>
            </div>
            <div>
                <button data-index="${index}" class="edit-task text-blue-500 hover:underline mr-2">Edit</button>
                <button data-index="${index}" class="delete-task text-red-500 hover:underline mr-2">Delete</button>
                <button data-index="${index}" class="toggle-complete text-${task.completed ? 'yellow' : 'green'}-500 hover:underline">
                    ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Show Toast Notifications
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex items-center">
            <div class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${type === 'success' ? 'M9 12l2 2 4-4' : 'M6 18L18 6M6 6l12 12'}" />
                </svg>
            </div>
            <div>${message}</div>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Store Tasks in Local Storage
function storeTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = storedTasks || [];
    renderTasks();
}

// Show Loader
function showLoader() {
    loader.style.display = 'flex';
}

// Hide Loader
function hideLoader() {
    loader.style.display = 'none';
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    showLoader();
    loadTasks();
    setTimeout(()=>{
        hideLoader();

    },800)
});
