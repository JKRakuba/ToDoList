// Select DOM elements
const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Event listener for form submission (Adding tasks)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent page reload on form submission
    
    // Get the task text
    const taskText = taskInput.value.trim();

    // If the task is empty, do nothing
    if (taskText === '') return;

    // Create a new list item (task)
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Create task content span
    const taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = taskText;

    // Create the delete icon (Font Awesome)
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fas', 'fa-edit', 'edit-icon');

    
    // Append task content and delete icon to the list item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editIcon);
    taskItem.appendChild(deleteIcon);

    // Append the task item to the task list (ul)
    taskList.appendChild(taskItem);

    // Clear the input field after adding the task
    taskInput.value = '';
});

// Event delegation for deleting tasks
taskList.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-icon')) {
        
        // Find the closest <li> (task) and remove it
        const taskItem = e.target.closest('li');
        taskList.removeChild(taskItem);

    } else if (e.target && e.target.classList.contains('task-content')) {
        
        // Toggle completed state of task when clicked
        const taskItem = e.target.closest('li');
        taskItem.classList.toggle('completed');
    }
});