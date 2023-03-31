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

    // in the middle of changing these into objects instead of strings

const todoListElement = document.getElementById('todo-list-element');
const todoTitle = document.getElementById('todo-title');
const itemsLeft = document.getElementById('items-left');
const clearCompleted = document.getElementById('clear-completed');

const allBtn = document.getElementById('all-button');
const activeBtn = document.getElementById('active-button');
const completedBtn = document.getElementById('completed-button');

// view

function renderList() {

    todoListElement.innerHTML = ''; // resetting the list

    todos.forEach(function (todo) {
        const listItem = document.createElement('div');
        listItem.textContent = todo.title;

        const todoCheckbox = document.createElement('input');
        todoCheckbox.setAttribute('type', 'checkbox');
        listItem.prepend(todoCheckbox);

        const deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', 'images/icon-cross.svg');
        listItem.appendChild(deleteButton);

        todoListElement.appendChild(listItem);
    });
}

function updateItemsLeft() {
    itemsLeft.textContent = todos.length + ' items left'; //has to be unchecked items left later on
}

renderList();
updateItemsLeft();

// controller

todoTitle.addEventListener('keyup', function(event) {
    let key = event.key;
    if (key === 'Enter') {
        todos.push(todoTitle.value);
        todoTitle.value = '';
        renderList();
        updateItemsLeft();
    }
})

clearCompleted.addEventListener('click', function() {
    
})