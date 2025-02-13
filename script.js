// Sélection des éléments
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

// Charger les tâches au démarrage
document.addEventListener("DOMContentLoaded", loadTasks);
addTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);
filters.forEach(filter => filter.addEventListener("click", filterTasks));

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="complete">✔</button>
        <button class="edit">✏️</button>
        <button class="delete">🗑️</button>
    `;

    taskList.appendChild(taskItem);
    saveTasks();
    taskInput.value = "";
}

function handleTaskClick(e) {
    const taskItem = e.target.closest("li"); // Trouve l'élément <li> correct

    if (!taskItem) return;

    if (e.target.classList.contains("delete")) {
        taskItem.remove();
        saveTasks();
    }

    if (e.target.classList.contains("edit")) {
        const newText = prompt("Modifier la tâche :", taskItem.querySelector("span").textContent);
        if (newText) {
            taskItem.querySelector("span").textContent = newText;
            saveTasks();
        }
    }

    if (e.target.classList.contains("complete")) {
        taskItem.classList.toggle("completed"); // Marquer/Démarquer comme terminé
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="complete">✔</button>
            <button class="edit">✏️</button>
            <button class="delete">🗑️</button>
        `;

        if (task.completed) {
            taskItem.classList.add("completed"); // Restaurer l'état terminé
        }

        taskList.appendChild(taskItem);
    });
}

function filterTasks(e) {
    const filter = e.target.dataset.filter;
    document.querySelectorAll("#taskList li").forEach(task => {
        if (filter === "all") {
            task.style.display = "flex";
        } else if (filter === "completed") {
            task.style.display = task.classList.contains("completed") ? "flex" : "none";
        } else if (filter === "pending") {
            task.style.display = !task.classList.contains("completed") ? "flex" : "none";
        }
    });
}
