"use strict";
const form = document.getElementById('todo-form');
const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const todoList = document.getElementById('todo-list');
const submitBtn = document.getElementById('submit-btn');
let todos = [];
let editingId = null;
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    if (!title)
        return;
    if (editingId !== null) {
        const todo = todos.find((t) => t.id === editingId);
        if (todo) {
            todo.title = title;
            todo.description = description;
        }
        editingId = null;
        submitBtn.textContent = 'Add';
    }
    else {
        const newTodo = {
            id: Date.now(),
            title,
            description,
            completed: false,
        };
        todos.push(newTodo);
    }
    titleInput.value = '';
    descInput.value = '';
    renderTodos();
});
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed)
            li.classList.add('completed');
        const span = document.createElement('span');
        span.textContent = todo.title;
        const btns = document.createElement('div');
        btns.className = 'todo-buttons';
        const doneBtn = document.createElement('button');
        doneBtn.className = 'done';
        doneBtn.innerHTML = '✔️';
        doneBtn.onclick = () => {
            todo.completed = !todo.completed;
            renderTodos();
        };
        const editBtn = document.createElement('button');
        editBtn.className = 'edit';
        editBtn.innerHTML = '✏️';
        editBtn.onclick = () => {
            titleInput.value = todo.title;
            descInput.value = todo.description;
            editingId = todo.id;
            submitBtn.textContent = 'Update';
        };
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.onclick = () => {
            todos = todos.filter((t) => t.id !== todo.id);
            renderTodos();
        };
        btns.append(doneBtn, editBtn, deleteBtn);
        li.append(span, btns);
        todoList.appendChild(li);
    });
}
renderTodos();
