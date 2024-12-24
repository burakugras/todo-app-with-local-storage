const form = document.querySelector('.todo-form');
const input = document.querySelector('.todo-input');
const todoContainer = document.querySelector('.todo-container');
const container = document.querySelector('.container');

const startConf = () => {
    //start settings
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (!todos) {
        localStorage.setItem('todos', JSON.stringify([]));
    } else {
        todos.forEach(todo => {
            addHTML(todo);
        })
    }
}

const showWarning = () => {
    const warningDiv = document.createElement('div');
    warningDiv.classList.add('warning-div');

    const warningText = document.createElement('span');
    warningText.classList.add('warning-text');
    warningText.textContent = 'You can not leave empty input.';

    warningDiv.appendChild(warningText);
    container.prepend(warningDiv);


    setTimeout(() => {
        warningDiv.remove();
    }, 2000);
}

const addTodo = (e) => {
    e.preventDefault();

    const inputVal = input.value;

    if (inputVal == '') {
        showWarning();
        return false;
    }

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
    todos = todos.filter(td => td.text != text);
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

const saveTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    const prevText = todo.firstChild.children[1].textContent;
    const newText = todo.firstChild.children[2].value;

    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(td => {
        if (td.text === prevText) {
            td.text = newText;
        }
    })

    localStorage.setItem('todos', JSON.stringify(todos))
    todo.firstChild.children[1].textContent = newText;
    todo.classList.remove('-edited');
}

const editTodo = (e) => {
    const todo = e.target.parentElement.parentElement;
    todo.classList.add('-edited');

}

const addHTML = (todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const todoLeft = document.createElement('div');
    todoLeft.classList.add('todo-left');

    const editInput = document.createElement('input');
    editInput.classList.add('todo-editInput');
    editInput.defaultValue = todo.text;

    const todoCb = document.createElement('input');
    todoCb.type = 'checkbox';
    todoCb.checked = todo.isCompleted;
    todoCb.classList.add('todo-cb');
    todoCb.addEventListener('click', completeTodo);

    const todoText = document.createElement('span');
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text;

    todoLeft.appendChild(todoCb);
    todoLeft.appendChild(todoText);
    todoLeft.appendChild(editInput);

    const todoRight = document.createElement('div');
    todoRight.classList.add('todo-right');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todo-delete');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteTodo);

    const editBtn = document.createElement('button');
    editBtn.classList.add('todo-edit');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', editTodo);

    const saveBtn = document.createElement('button');
    saveBtn.classList.add('todo-save');
    saveBtn.textContent = 'Save';
    saveBtn.addEventListener('click', saveTodo);


    todoRight.appendChild(deleteBtn);
    todoRight.appendChild(editBtn);
    todoRight.appendChild(saveBtn);

    todoDiv.appendChild(todoLeft);
    todoDiv.appendChild(todoRight);

    todoContainer.appendChild(todoDiv);
}

startConf();
form.addEventListener('submit', addTodo);
