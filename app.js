const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoContainer = document.querySelector('.todo-container');
let deleteBtns;

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
        console.log(deleteBtns)
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
    todo.remove();
}

form.addEventListener('submit', addTodo);
deleteBtns.forEach((btn) => btn.addEventListener('click', deleteTodo))