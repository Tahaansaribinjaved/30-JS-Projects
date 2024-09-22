// script.js
document.getElementById('add-task').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const taskList = document.getElementById('task-list');
    
    const taskText = taskInput.value.trim();
    const taskPriority = prioritySelect.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = `flex justify-between items-center p-2 mb-2 rounded-md 
                          ${taskPriority === 'High' ? 'bg-red-100' : taskPriority === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'}`;

    taskItem.innerHTML = `
        <span>${taskText}</span>
        <span class="font-bold text-sm text-${taskPriority === 'High' ? 'red' : taskPriority === 'Medium' ? 'yellow' : 'green'}-700">${taskPriority}</span>
        <button class=" ${taskPriority === 'High' ? 'bg-red-700' : taskPriority === 'Medium' ? 'bg-yellow-700' : 'bg-green-700'} text-white px-2 py-1 rounded-md ml-4 remove-task">Remove</button>
    `;

    taskList.appendChild(taskItem);

    // Clear input
    taskInput.value = '';

    // Remove task
    taskItem.querySelector('.remove-task').addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });
});
