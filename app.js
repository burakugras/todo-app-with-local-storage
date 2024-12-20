const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');

const startConf = () => {
    //start settings
    const todos = localStorage.getItem('todos');
    if (!todos) {
        localStorage.setItem('todos', JSON.stringify([]));
    }
}

startConf();

const addTodo = (e) => {
    e.preventDefault();

    const todoText = input.value;

    const todo = {
        text: todoText,
        isCompleted: false,
    }

    const todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log(todos);
}

form.addEventListener('submit', addTodo);