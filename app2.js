const inputTask = document.getElementById('input-task');
const listContainer = document.getElementById('list-container');

function addTask() {
    if (inputTask.value) {
        let li = document.createElement('li');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        let p = document.createElement('p');
        p.textContent = inputTask.value;

        let deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-x';

        li.appendChild(checkbox);
        li.appendChild(p);
        li.appendChild(deleteIcon);

        listContainer.appendChild(li);

        inputTask.value = '';

        saveData();
    }
}

inputTask.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});


listContainer.addEventListener('click', function (e) {
    const li = e.target.parentElement;
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
        if (e.target.checked) {
            li.classList.add('check-task');
        } else {
            li.classList.remove('check-task');
        }
        saveData();
    } else if (e.target.tagName === 'I') {
        li.classList.add('fade-out'); 
        setTimeout(() => {
            li.remove(); 
            saveData();
        }, 300);
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

loadData();

