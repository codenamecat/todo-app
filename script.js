// model

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

const allBtn = document.getElementById('all-button');
const activeBtn = document.getElementById('active-button');
const completedBtn = document.getElementById('completed-button');

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
    todos = todos.filter(function (todo) {
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

// view

function renderList(arr) {

    todoListElement.innerHTML = ''; // resetting the list

    arr.forEach(function (todo) {
        const listItem = document.createElement('div');
        const todoCheckbox = document.createElement('input');

        listItem.classList.add('todo-element');

        todoCheckbox.setAttribute('type', 'checkbox');
        todoCheckbox.setAttribute('name', 'todo-item');
        todoCheckbox.id = todo.id;
        todoCheckbox.onclick = toggleChecked;

        if (todo.isChecked) {
            todoCheckbox.setAttribute('checked', true);
        }

        const checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', todo.id);
        checkboxLabel.appendChild(document.createTextNode(todo.title));

        const deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', 'images/icon-cross.svg');
        deleteButton.id = todo.id;
        deleteButton.onclick = deleteTodo;

        listItem.appendChild(todoCheckbox);
        listItem.appendChild(checkboxLabel);
        listItem.appendChild(deleteButton);
        todoListElement.appendChild(listItem);
    })
}

function updateItemsLeft() {
    // probably not the best way to rewrite same code again but oh well
    const activeTodos = [];

    todos.forEach(function(todo) {
        if (todo.isChecked === false) {
            activeTodos.push(todo);
        }
    })
    itemsLeft.textContent = `${activeTodos.length} item(s) left`; 
}

// controller

todoTextbox.addEventListener('keyup', function (event) {
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

    todos.forEach(function(todo) {
        if (todo.id === thisCheckbox) {
            todo.isChecked = !(todo.isChecked);
        }
    })

    saveTodos();
    updateItemsLeft();
}

allBtn.addEventListener('click', function() {
    renderList(todos);
    allBtn.classList.add('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
})

activeBtn.addEventListener('click', function() {
    const activeTodos = [];

    todos.forEach(function(todo) {
        if (todo.isChecked === false) {
            activeTodos.push(todo);
        }
    })
    renderList(activeTodos);
    activeBtn.classList.add('active');
    allBtn.classList.remove('active');
    completedBtn.classList.remove('active');
})

completedBtn.addEventListener('click', function() {
    const completedTodos = [];

    todos.forEach(function(todo) {
        if (todo.isChecked) {
            completedTodos.push(todo);
        }
    })
    renderList(completedTodos);
    completedBtn.classList.add('active');
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
})

renderList(todos);
updateItemsLeft();

// graveyard of stuff that didn't work for their purpose but i might still need for something

// i can create the elements but they aren't connected with an id

// todos.forEach(function (todo) {
    //     const listItem = document.createElement('div');
    //     listItem.textContent = todo;

    //     const todoCheckbox = document.createElement('input');
    //     todoCheckbox.setAttribute('type', 'checkbox');
    //     listItem.prepend(todoCheckbox);

    //     const deleteButton = document.createElement('img');
    //     deleteButton.setAttribute('src', 'images/icon-cross.svg');
    //     listItem.appendChild(deleteButton);

    //     todoListElement.appendChild(listItem);
    // });

    // i can remove the elements but not delete them from the array i think

    // clearCompleted.addEventListener('click', function() {
    //     const todoboxes = document.getElementsByName('todo-item');
    //     const labels = document.getElementsByTagName('label');
    //     todoboxes.forEach(function(todobox) {
    //         if (todobox.checked) {
    //             todobox.parentNode.removeChild(todobox);
    //         }
    //     })
    //     renderList();
    // })

    // steps in getting the checkbox boolean to work

    // localStorage.getItem("todos");
    // checkbox.isChecked = !(checkbox.isChecked);
    // console.log(checkbox.id,checkbox.isChecked);