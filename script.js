const inputtask = document.getElementById("task");
const tasklist = document.getElementById("tasklist");
const completed = document.getElementById("completedlist");
const uncompleted = document.getElementById("uncompletedlist");

let completedcount = 0;
let uncompletedcount = 0;


document.addEventListener("DOMContentLoaded", loadTasks);

function updatecounters() {
    completed.textContent = completedcount;
    uncompleted.textContent = uncompletedcount;
}


function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#tasklist li").forEach(li => {
        tasks.push({
            text: li.textContent.replace("Delete", "").trim(),
            completed: li.querySelector("input").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => addtask(task.text, task.completed));
}

function addtask(text = inputtask.value.trim(), isCompleted = false) {
    if (!text) {
        alert("Enter a task");
        return;
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const dltbtn = document.createElement("button");
    dltbtn.textContent = "Delete";
    dltbtn.style.marginLeft = "10px";

    const li = document.createElement("li");

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + text));
    li.appendChild(dltbtn);

    tasklist.appendChild(li);

    if (isCompleted) {
        completedcount++;
    } else {
        uncompletedcount++;
    }
    updatecounters();

    inputtask.value = "";

    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            completedcount++;
            uncompletedcount--;
        } else {
            completedcount--;
            uncompletedcount++;
        }
        updatecounters();
        saveTasks();
    });
    
    dltbtn.addEventListener("click", function () {
        if (checkbox.checked) {
            completedcount--;
        } else {
            uncompletedcount--;
        }
        tasklist.removeChild(li);
        updatecounters();
        saveTasks();
    });

    saveTasks();
}
