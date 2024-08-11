document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => createTodoItem(task));
    }

    // Function to save tasks to localStorage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to create a new task item
    function createTodoItem(taskText) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div class="actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <input type="checkbox" class="complete-checkbox">
            </div>
        `;
        todoList.appendChild(li);

        // Add event listeners for edit, delete, and complete actions
        const editButton = li.querySelector(".edit-btn");
        const deleteButton = li.querySelector(".delete-btn");
        const completeCheckbox = li.querySelector(".complete-checkbox");

        editButton.addEventListener("click", function() {
            editTodoItem(li);
        });

        deleteButton.addEventListener("click", function() {
            deleteTodoItem(li);
        });

        completeCheckbox.addEventListener("change", function() {
            toggleComplete(li);
        });

        // Save tasks to localStorage after creating a new task
        saveTasks(getTasks());
    }

    // Function to handle form submission
    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText !== "") {
            createTodoItem(taskText);
            todoInput.value = "";
        }
    });

    // Function to edit a task item
    function editTodoItem(li) {
        const taskText = li.querySelector(".task-text").textContent;
        const newTaskText = prompt("Edit task:", taskText);
        if (newTaskText !== null) {
            li.querySelector(".task-text").textContent = newTaskText;
            updateTasks();
        }
    }

    // Function to delete a task item
    function deleteTodoItem(li) {
        li.remove();
        updateTasks();
    }

    // Function to mark a task as completed or incomplete
    function toggleComplete(li) {
        li.querySelector(".task-text").classList.toggle("completed");
        updateTasks();
    }

    // Function to get tasks from the DOM
    function getTasks() {
        const tasks = [];
        const taskElements = todoList.querySelectorAll("li");
        taskElements.forEach(taskElement => {
            tasks.push(taskElement.querySelector(".task-text").textContent);
        });
        return tasks;
    }

    // Function to update tasks in localStorage
    function updateTasks() {
        const tasks = getTasks();
        saveTasks(tasks);
    }

    // Load tasks when the page loads
    loadTasks();
});
