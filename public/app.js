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

// Function to reorder tasks in the list (move completed tasks below)
function reorderTasks() {
    const tasks = Array.from(taskList.children);
    
    // Sort tasks: completed tasks go to the bottom
    tasks.sort((a, b) => {
        const isCompletedA = a.classList.contains('completed');
        const isCompletedB = b.classList.contains('completed');
        
        if (isCompletedA && !isCompletedB) return 1; 
        if (!isCompletedA && isCompletedB) return -1; 
        return 0; // if both are the same (either both completed or both not completed)
    });

    // Reattach the sorted tasks to the list
    tasks.forEach(task => taskList.appendChild(task));
}

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

     // Reorder tasks after toggling the completion state
     reorderTasks();
    } else if (e.target && e.target.classList.contains('edit-icon')) {
        // Find the task item and its content
        const taskItem = e.target.closest('li');
        const taskContent = taskItem.querySelector('.task-content');

    } else if (e.target && e.target.classList.contains('edit-icon')) {
        // Find the task item and its content
        const taskItem = e.target.closest('li');
        const taskContent = taskItem.querySelector('.task-content');
        
        // Make the task content editable (turn it into an input field)
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = taskContent.textContent;
        inputField.classList.add('edit-input');
        
        // Replace the task content with the input field
        taskItem.replaceChild(inputField, taskContent);
        
        // Focus on the input field
        inputField.focus();

        // Event listener to save the new content
        inputField.addEventListener('blur', function() {
            const updatedText = inputField.value.trim();
            if (updatedText) {
                taskContent.textContent = updatedText;
                taskItem.replaceChild(taskContent, inputField);
            } else {
                // If input is empty, just revert to the original text
                taskItem.replaceChild(taskContent, inputField);
            }
        });

        // Allow pressing 'Enter' to save changes
        inputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                inputField.blur();  // Trigger blur event to save the changes
            }
        });
    }
});