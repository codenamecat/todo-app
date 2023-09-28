let todos;

const savedTodos = JSON.parse(localStorage.getItem("todos"));

if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [{
        title: 'Todo 1',
        id: 'id1',
        isChecked: false
    }, {
        title: 'Todo 2',
        id: 'id2',
        isChecked: false
    }, {
        title: 'Todo 3',
        id: 'id3',
        isChecked: false
    }];
}

const todoListElement = document.getElementById('todo-list-element');
const todoTextbox = document.getElementById('todo-textbox');
const itemsLeft = document.getElementById('items-left');
const clearCompleted = document.getElementById('clear-completed');

let deleteButtons;

const allBtn = document.getElementById('all-button');
const activeBtn = document.getElementById('active-button');
const completedBtn = document.getElementById('completed-button');

const modeToggler = document.getElementById('mode-toggler');
const documentBody = document.getElementById('document-body');
const listContainer = document.getElementById('list-container');
const filterContainer = document.getElementById('filter-container');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

let tasksForDragging;

function createTodo(title) {
    const id = "" + new Date().getTime();

    todos.push({
        title: title,
        id: id,
        isChecked: false
    });
    saveTodos();
}

function deleteTodoFromArray(idToDelete) {
    todos = todos.filter(todo => {
        if (todo.id === idToDelete) {
            return false;
        } else {
            return true;
        }
    })
    saveTodos();
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function renderList(arr) {

    todoListElement.innerHTML = ''; // resetting the list

    arr.forEach(todo => {
        const listItem = document.createElement('div');
        const todoCheckbox = document.createElement('input');

        listItem.classList.add('todo-element');
        listItem.setAttribute('draggable', true);

        if (documentBody.classList.contains('dark-mode')) {
            listItem.classList.add('dark-mode');
        } else {
            listItem.classList.remove('dark-mode');
        }

        todoCheckbox.setAttribute('type', 'checkbox');
        todoCheckbox.setAttribute('name', 'todo-item');
        todoCheckbox.id = todo.id;
        todoCheckbox.onclick = toggleChecked;

        if (todo.isChecked) {
            todoCheckbox.setAttribute('checked', true);
        }

        if (documentBody.classList.contains('dark-mode')) {
            todoCheckbox.classList.add('dark-mode');
        } else {
            todoCheckbox.classList.remove('dark-mode');
        }

        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', todo.id);
        checkboxLabel.appendChild(document.createTextNode(todo.title));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = `<img src='images/icon-cross.svg' alt='delete' class='delete-button' id=${todo.id} />`
        deleteButton.onclick = deleteTodo;

        listItem.appendChild(todoCheckbox);
        listItem.appendChild(checkboxLabel);
        listItem.appendChild(deleteButton);
        todoListElement.appendChild(listItem);
    })
}

function updateItemsLeft() {
    const activeTodos = [];

    todos.forEach(todo => {
        if (todo.isChecked === false) {
            activeTodos.push(todo);
        }
    })
    itemsLeft.textContent = `${activeTodos.length} item(s) left`;
}

function toggleStyling() {
    const todoElements = Array.from(document.getElementsByClassName('todo-element'));
    todoElements.forEach(todo => {
        todo.classList.toggle('dark-mode');
    })

    const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    checkboxes.forEach(checkbox => {
        checkbox.classList.toggle('dark-mode');
    })

    documentBody.classList.toggle('dark-mode');
    listContainer.classList.toggle('dark-mode');
    todoTextbox.classList.toggle('dark-mode');
    filterContainer.classList.toggle('dark-mode');
    moonIcon.classList.toggle('dark-mode');
    sunIcon.classList.toggle('dark-mode');
}

todoTextbox.addEventListener('keyup', event => {
    let key = event.key;
    if (key === 'Enter' && todoTextbox.value !== '') {
        const title = todoTextbox.value;
        createTodo(title);

        todoTextbox.value = '';
        renderList(todos);
        updateItemsLeft();
    }
})

clearCompleted.addEventListener('click', function () {

    const todoboxes = document.getElementsByName('todo-item');
    todoboxes.forEach(function (todobox) {
        if (todobox.checked) {
            deleteTodoFromArray(todobox.id);
        }
    })
    renderList(todos);
    updateItemsLeft();
})

function deleteTodo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    deleteTodoFromArray(idToDelete);

    renderList(todos);
    updateItemsLeft();
}

function toggleChecked(event) {
    const checkbox = event.target;
    checkbox.classList.toggle('checked');
    const thisCheckbox = checkbox.id;

    todos.forEach(todo => {
        if (todo.id === thisCheckbox) {
            todo.isChecked = !(todo.isChecked);
        }
    })

    saveTodos();
    updateItemsLeft();
}

allBtn.addEventListener('click', () => {
    renderList(todos);
    allBtn.classList.add('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
})

activeBtn.addEventListener('click', () => {
    const activeTodos = [];

    todos.forEach(todo => {
        if (todo.isChecked === false) {
            activeTodos.push(todo);
        }
    })
    renderList(activeTodos);
    activeBtn.classList.add('active');
    allBtn.classList.remove('active');
    completedBtn.classList.remove('active');
})

completedBtn.addEventListener('click', () => {
    const completedTodos = [];

    todos.forEach(todo => {
        if (todo.isChecked) {
            completedTodos.push(todo);
        }
    })
    renderList(completedTodos);
    completedBtn.classList.add('active');
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
})

modeToggler.addEventListener('click', () => {
    toggleStyling();
})

// drag and drop to reorder tasks

todoListElement.addEventListener('mouseover', () => {
    activateDragging();
})

function activateDragging() {
    tasksForDragging = todoListElement.querySelectorAll('.todo-element');
    tasksForDragging.forEach(task => {
        task.addEventListener('dragstart', () => {
            task.classList.add('dragging');
        });
        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        })
    });
}

const initSortableList = (event) => {
    event.preventDefault();
    const draggingItem = todoListElement.querySelector('.dragging');
    const siblings = [...todoListElement.querySelectorAll('.todo-element:not(.dragging)')];

    let nextSibling = siblings.find(sibling => {
        return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    todoListElement.insertBefore(draggingItem, nextSibling);
}

todoListElement.addEventListener('dragover', initSortableList);

renderList(todos);
updateItemsLeft();