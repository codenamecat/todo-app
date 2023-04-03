// model

let todos = [{
    title: 'Todo 1',
    id: 'id1'
}, {
    title: 'Todo 2',
    id: 'id2'
}, {
    title: 'Todo 3',
    id: 'id3'
}];

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
            id: id
        });
}

function deleteTodoFromArray(idToDelete) {
    todos = todos.filter(function(todo) {
        if (todo.id === idToDelete) {
            return false;
        } else {
            return true;
        }
    })
}

// view

function renderList() {

    todoListElement.innerHTML = ''; // resetting the list

    todos.forEach(function (todo) {
        const listItem = document.createElement('div');
        const todoCheckbox = document.createElement('input');

        todoCheckbox.setAttribute('type', 'checkbox');
        todoCheckbox.setAttribute('name', 'todo-item');
        todoCheckbox.id = todo.id;

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
    itemsLeft.textContent = todos.length + ' item(s) left'; //has to be unchecked items left later on
}

// controller

todoTextbox.addEventListener('keyup', function (event) {
    let key = event.key;
    if (key === 'Enter' && todoTextbox.value !== '') {
        const title = todoTextbox.value;
        createTodo(title);

        todoTextbox.value = '';
        renderList();
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
    renderList();
    updateItemsLeft();
})

function deleteTodo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    deleteTodoFromArray(idToDelete);

    renderList();
    updateItemsLeft();
}

renderList();
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