let todos = ['Todo 1', 'Todo 2'];

const todoListElement = document.getElementById('todo-list-element');

function renderList() {
    todos.forEach(function (todo) {
        const listItem = document.createElement('div');
        listItem.textContent = todo;

        const todoCheckbox = document.createElement('input');
        todoCheckbox.setAttribute('type', 'checkbox');
        listItem.prepend(todoCheckbox);

        const deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', 'images/icon-cross.svg');
        listItem.appendChild(deleteButton);

        todoListElement.appendChild(listItem);
    });
}

renderList();