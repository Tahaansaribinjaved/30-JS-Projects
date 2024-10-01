// Helper function to create a new task element
function createTaskElement(id, taskName) {
    const task = document.createElement('div');
    task.classList.add('task', "h-16",'bg-blue-100', 'p-3', 'rounded-md', 'cursor-pointer', 'flex', 'justify-between', 'items-center');
    task.setAttribute('draggable', 'true');
    task.id = id;
    
    const taskContent = document.createElement('span');
    taskContent.textContent = taskName;
    taskContent.classList.add('task-content');
  
    const actions = document.createElement('div');
    actions.classList.add('flex', 'gap-2');
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('text-blue-500', 'text-sm');
    editButton.onclick = () => editTask(id);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('text-red-500', 'text-sm');
    deleteButton.onclick = () => deleteTask(id);
  
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    
    task.appendChild(taskContent);
    task.appendChild(actions);
    
    task.addEventListener('dragstart', dragStart);
    
    return task;
  }
  
  // Initialize task counters and drag data
  let taskIdCounter = 1;
  let draggedTask = null;
  
  // Add new task functionality
  document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskName = document.getElementById('new-task-name').value;
    if (taskName) {
      const taskElement = createTaskElement(`task-${taskIdCounter}`, taskName);
      document.getElementById('todo').appendChild(taskElement);
      document.getElementById('new-task-name').value = ''; // Clear input field
      taskIdCounter++;
    }
  });
  
  // Drag and Drop Functionality
  document.querySelectorAll('.task-list').forEach(list => {
    list.addEventListener('dragover', dragOver);
    list.addEventListener('drop', drop);
  });
  
  function dragStart(e) {
    draggedTask = e.target;
    setTimeout(() => e.target.style.display = 'none', 0); // Hide while dragging
  }
  
  function dragOver(e) {
    e.preventDefault(); // Allow dropping
    e.dataTransfer.dropEffect = 'move'; // Explicitly show it's a move
  }
  
  function drop(e) {
    e.preventDefault();
    const targetList = e.target.closest('.task-list');
    
    if (targetList && draggedTask) {
      targetList.appendChild(draggedTask);
      draggedTask.style.display = 'block'; // Show after dropping
      draggedTask = null; // Reset after drop
    } else if (e.target.classList.contains('task-list')) {
      // Handles empty columns
      e.target.appendChild(draggedTask);
      draggedTask.style.display = 'block'; // Show after dropping
      draggedTask = null; // Reset after drop
    }
  }
  
  // CRUD Operations
  function editTask(id) {
    const taskElement = document.getElementById(id);
    const taskContent = taskElement.querySelector('.task-content');
    const newTaskName = prompt('Edit task name:', taskContent.textContent);
    if (newTaskName) {
      taskContent.textContent = newTaskName;
    }
  }
  
  function deleteTask(id) {
    const taskElement = document.getElementById(id);
    taskElement.remove();
  }
  