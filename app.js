const inputTask = document.querySelector('#input-task');
const buttonAddTask = document.querySelector('#add-button');
const listTasks = document.querySelector('#list');
const checkedClass = 'checked'; 
const uncheckedClass = 'unchecked'; 
const lineClass = 'line'; 
let id = 0;





function addTask(task, id, completed, deleted) {
    if (deleted) {
        return;
    }
    const CHECKED = completed ? checkedClass : uncheckedClass;
    const LINE = completed ? lineClass : '';

    const element = `
        <li id="task-${id}">
            <input type="checkbox" class="${CHECKED}" data-status="realizado" id="${id}" aria-label="Marcar tarea como completada">
            <p class="text ${LINE}">${task}</p>
            <button type="button" class="delete-button" data-status="eliminado" id="${id}">Eliminar</button>
        </li>`;
    
    listTasks.insertAdjacentHTML('beforeend', element);
}

function taskComplete(element) {
    element.classList.toggle(checkedClass);
    element.classList.toggle(uncheckedClass);
    element.parentNode.querySelector('.text').classList.toggle(lineClass);
}

function taskDelete(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
}

buttonAddTask.addEventListener('click', () => {
    const task = inputTask.value.trim();
    if (task) {
        addTask(task, id, false, false);

        id++;
    }
    inputTask.value = '';
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const task = inputTask.value.trim();
        if (task) {
            addTask(task, id, false, false);

            id++;
        }
        inputTask.value = '';
    }
});

listTasks.addEventListener('click', (event) => {
    const element = event.target;
    const status = element.dataset.status;

    if (status === 'realizado') {
        if (element.type === 'checkbox') {
            taskComplete(element);
        }
    } else if (status === 'eliminado') {
        taskDelete(element);
    }
});
