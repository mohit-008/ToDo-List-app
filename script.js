class Task {
    constructor(text) {
        this.text = text;
        this.createTaskElement();
    }

    createTaskElement() {
        this.element = document.createElement('div');
        this.element.className = 'task' ;
        this.element.textContent = this.text;
        this.addButtons();
    }

    addButtons() {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            this.element.parentNode.removeChild(this.element);
        };

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => {
            this.editTask();
        };

        this.element.appendChild(deleteButton);
        this.element.appendChild(editButton);
    }

    editTask() {
        const originalText = this.text;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = originalText;

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.onclick = () => {
            const newText = editInput.value.trim();
            if (newText === '') {
                alert('Task cannot be empty.');
                return;
            }
            this.text = newText;
            this.element.textContent = newText;
            this.addButtons(); // Add the "Edit" and "Delete" buttons again for further edits
        };

        this.element.innerHTML = '';
        this.element.appendChild(editInput);
        this.element.appendChild(saveButton);

        editInput.focus();
    }
}

// Function to add a task to the list
function addTask() {
    const taskText = document.getElementById('task').value.trim();
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = new Task(taskText);

    const list = document.getElementById('list');
    list.appendChild(task.element);

    document.getElementById('task').value = ' ' ;
    
}

// Function to clear all tasks from the list
function clearTasks() {
    const list = document.getElementById('list');
    list.innerHTML = '';
}

// Event listener to handle clicks on tasks
document.getElementById('list').addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        const taskElement = target.parentNode;
        if (target.textContent === 'Delete') {
            taskElement.parentNode.removeChild(taskElement);
        } else if (target.textContent === 'Edit') {
            const taskText = taskElement.textContent;
            const task = new Task(taskText);
            taskElement.parentNode.replaceChild(task.element, taskElement);
        }
    }
});
