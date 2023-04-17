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

        deleteButtons = document.querySelectorAll('.delete-button');
        updateDeleteButtons();
    })
}

function updateItemsLeft() {
    // probably not best policy to rewrite the same code but oh well
    const activeTodos = [];

    todos.forEach(function (todo) {
        if (todo.isChecked === false) {
            activeTodos.push(todo);
        }
    })
    itemsLeft.textContent = `${activeTodos.length} item(s) left`;
}

function toggleStyling() {
    const todoElements = Array.from(document.getElementsByClassName('todo-element'));
    todoElements.forEach(function (todo) {
        todo.classList.toggle('dark-mode');
    })

    const checkboxes = Array.from(document.querySelectorAll('input[type=checkbox]'));
    checkboxes.forEach(function (checkbox) {
        checkbox.classList.toggle('dark-mode');
    })

    documentBody.classList.toggle('dark-mode');
    listContainer.classList.toggle('dark-mode');
    todoTextbox.classList.toggle('dark-mode');
    filterContainer.classList.toggle('dark-mode');
    moonIcon.classList.toggle('dark-mode');
    sunIcon.classList.toggle('dark-mode');
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

function updateDeleteButtons() {
    deleteButtons.forEach(function(deleteButton) {
        deleteButton.addEventListener('keydown', (event) => {
            let key = event.key;
            if (key === 'Space') {
                console.log('deletebutton pushed')
            }
        })
    })
}

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

    todos.forEach(function (todo) {
        if (todo.id === thisCheckbox) {
            todo.isChecked = !(todo.isChecked);
        }
    })

    saveTodos();
    updateItemsLeft();
}

allBtn.addEventListener('click', function () {
    renderList(todos);
    allBtn.classList.add('active');
    activeBtn.classList.remove('active');
    completedBtn.classList.remove('active');
})

activeBtn.addEventListener('click', function () {
    const activeTodos = [];

    todos.forEach(function (todo) {
        if (todo.isChecked === false) {
            activeTodos.push(todo);
        }
    })
    renderList(activeTodos);
    activeBtn.classList.add('active');
    allBtn.classList.remove('active');
    completedBtn.classList.remove('active');
})

completedBtn.addEventListener('click', function () {
    const completedTodos = [];

    todos.forEach(function (todo) {
        if (todo.isChecked) {
            completedTodos.push(todo);
        }
    })
    renderList(completedTodos);
    completedBtn.classList.add('active');
    allBtn.classList.remove('active');
    activeBtn.classList.remove('active');
})

modeToggler.addEventListener('click', function () {
    toggleStyling();
})

// vv drag and drop tasks, however the order does not get saved when you refresh vv

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


// attempts with drag and drop that didn't work

// listItem.ondragstart=onDragStart;
// listItem.ondragover=allowDrop;

// function onDragStart(event) {
//     event.dataTransfer.setData('text/plain', event.target.id);
// }

// function allowDrop(event) {
//     event.preventDefault();
// }

// function drop(event) {
//     event.preventDefault();
//     const data = event.dataTransfer.getData('text/plain', event.target.id);
//     event.target.appendChild(document.getElementById(data));
// }

// todoListElement.addEventListener('mouseover', function reorderList() {
// (A) SET CSS + GET ALL LIST ITEMS
// target.classList.add("slist");
//     let items = document.getElementsByClassName('todo-element'), dragged = null;

//     // (B) MAKE ITEMS DRAGGABLE + SORTABLE
//     for (let i of items) {
//         // (B1) ATTACH DRAGGABLE
//         i.draggable = true;

//         // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
//         i.addEventListener('dragover', function(event) {
//             event.preventDefault();
//         })

//         // (B7) ON DROP - DO SOMETHING
//         i.addEventListener('drop', function(event) {
//             event.preventDefault();
//             if (this !== dragged) {
//                 this.parentNode.insertBefore(dragged, this);
//             }
//         })
//     }
// }
// )