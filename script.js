const inputtask = document.getElementById("task");
const tasklist = document.getElementById("tasklist");
const completed = document.getElementById("completedlist");
const uncompleted = document.getElementById("uncompletedlist");

let completedcount = 0;
let uncompletedcount = 0;

function updatecounters() {
    completed.textContent = completedcount;
    uncompleted.textContent = uncompletedcount;
}

function addtask() {
    const newtask = inputtask.value.trim();
    if (!newtask) {
        alert("Enter a task");
        return;
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const dltbtn = document.createElement("button");
    dltbtn.textContent = "Delete";
    dltbtn.style.marginLeft = "10px";

    const li = document.createElement("li");

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + newtask));
    li.appendChild(dltbtn);

    tasklist.appendChild(li);

    uncompletedcount++;
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
    });
    
    dltbtn.addEventListener("click", function () {
        if (checkbox.checked) {
            completedcount--;
        } else {
            uncompletedcount--;
        }
        tasklist.removeChild(li);
        updatecounters();
    });
}
