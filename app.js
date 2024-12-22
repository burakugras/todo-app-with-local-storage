const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoContainer = document.querySelector('.todo-container');
let deleteBtns;
let checkboxes;
let editBtns;

const addHTML = (todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLeft = document.createElement('div');
    todoLeft.classList.add('todo-left');

    const todoCb = document.createElement('input');
    todoCb.type = 'checkbox';
    todoCb.checked = todo.isCompleted;
    todoCb.classList.add('todo-cb');

    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text;

    todoLeft.appendChild(todoCb);
    todoLeft.appendChild(todoText);

    const todoRight = document.createElement('div');
    todoRight.classList.add('todo-right');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todo-delete');
    deleteBtn.textContent = 'Delete';

    const editBtn = document.createElement('button');
    editBtn.classList.add('todo-edit');
    editBtn.textContent = ('Edit');

    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todoContainer.appendChild(todoDiv);
}

const startConf = () => {
    //start settings
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (!todos) {
        localStorage.setItem('todos', JSON.stringify([]));
    } else {
        todos.forEach((todo) => {
            addHTML(todo);
        })
        deleteBtns = document.querySelectorAll('.todo-delete');
        checkboxes = document.querySelectorAll('.todo-cb')
        editBtns = document.querySelectorAll('.todo-edit')
    }
}

startConf();

const addTodo = (e) => {
    e.preventDefault();

    const inputVal = input.value;

    const todo = {
        text: inputVal,
        isCompleted: false,
    }

    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    addHTML(todo);

    form.reset();

}

const deleteTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;

    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(td => td.text !== text);
    localStorage.setItem('todos', JSON.stringify(todos));

    todo.remove();
}

const completeTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.firstChild.children[1].textContent;

    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(td => {
        if (td.text === text)
            td.isCompleted = !td.isCompleted;
    })

    localStorage.setItem('todos', JSON.stringify(todos));
}

const editTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const text = todo.querySelector('.todo-text').textContent;
    const checkVal = todo.querySelector('.todo-cb').checked;

    let todos = JSON.parse(localStorage.getItem('todos'));
    todos = todos.filter(td => td.text !== text);
    localStorage.setItem('todos', JSON.stringify(todos));

    todo.remove();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLeft = document.createElement('div');
    todoLeft.classList.add('todo-left');

    const todoRight = document.createElement('div');
    todoRight.classList.add('todo-right');

    const todoCb = document.createElement('input');
    todoCb.type = 'checkbox';
    todoCb.checked = checkVal;
    todo.classList.add('todo-cb')

    const todoEditInput = document.createElement('input');
    todoEditInput.type = 'text';
    todoEditInput.classList.add('edit-input');
    todoEditInput.value = text;

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('todo-save');
    saveBtn.textContent = 'Save';

    todoLeft.appendChild(todoCb);
    todoLeft.appendChild(todoEditInput);

    todoRight.appendChild(saveBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todoContainer.appendChild(todoDiv);

    saveBtn.addEventListener('click', () => {
        const newText = todoEditInput.value;
        const isCompleted = todoCb.checked;

        const updatedTodo = {
            text: newText,
            isCompleted: isCompleted,
        };

        todos.push(updatedTodo);
        localStorage.setItem('todos', JSON.stringify(todos));

        location.reload();
    });

}

form.addEventListener('submit', addTodo);
deleteBtns.forEach((btn) => btn.addEventListener('click', deleteTodo));
checkboxes.forEach((cb) => cb.addEventListener('click', completeTodo));
editBtns.forEach((cb) => cb.addEventListener('click', editTodo));
