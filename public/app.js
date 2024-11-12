// Get references to DOM elements
const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Event listener for form submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form from submitting and reloading the page
    
    const taskText = taskInput.value.trim();  // Get the task input value and remove extra spaces
    
    if (taskText === '') return;  // Do nothing if input is empty

    // Create a new task item
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    // Create the task content
    const taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = taskText;

    // Create the delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash-alt', 'delete-icon');
    
    // Append content and delete icon to task item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteIcon);
    
    // Append the task item to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    taskInput.value = '';
});

// Event delegation for deleting tasks
taskList.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-icon')) {
        const taskItem = e.target.closest('li');
        taskList.removeChild(taskItem);
    }
});
