'use strict';


class Todo {
    constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));

    }

    render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.input.value = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
    }

    createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = todo.key;
    li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
        </div>
    `);

    if (todo.completed) {
        this.todoCompleted.append(li);
    } else {
        this.todoList.append(li);
    }
    }
    addTodo(event) {
    event.preventDefault();
    if (this.input.value.trim()) {
        const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey()
        };
        this.todoData.set(newTodo.key, newTodo);
        this.render();
    } else {
        alert('Поле не заполненно!');
        this.input.value = '';
    }
    }

    generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(key) {
    this.todoData.delete(key);
    this.render();
    }

    completedItem(key) {
    this.todoData.forEach((item) => {
        if (item.key === key) {
        item.completed = !item.completed;
        }
        this.render();
    });
    }

    handler() {
    document.querySelector('.todo-container').addEventListener('click', (event) => {
        let target = event.target;
        if (target.matches('.todo-remove')) {
        this.deleteItem(target.closest('li').key);
        }
        if (target.matches('.todo-complete')) {
        this.completedItem(target.closest('li').key);
        }

    });

    }

    init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.handler();
    this.render();
    }


};

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();