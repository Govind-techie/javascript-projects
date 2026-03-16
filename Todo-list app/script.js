// Selecting important elements from the HTML
// input field where user types the todo
const input = document.querySelector('.todo-input');

// button used to add a new todo
const addBtn = document.querySelector('.add-btn');

// the <ul> or <ol> element where todos will be displayed
const todoList = document.querySelector('.todo-list');


// Try to get previously saved todos from the browser storage
// localStorage stores data as a string
const saved = localStorage.getItem("todo");

// If saved data exists → convert string back to JS array using JSON.parse
// If nothing exists → create an empty array
const todos = saved ? JSON.parse(saved) : [];


// Function to save current todos array into localStorage
function saveTodo() {

    // Convert JS object/array to string using JSON.stringify
    // Then store it in browser storage with key "todo"
    localStorage.setItem("todo", JSON.stringify(todos));
}


// Function that creates a single todo list item
function createTodo(todo, index) {

    // create <li> element for the todo
    const li = document.createElement('li');


    // create checkbox to mark todo as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // set checkbox checked state based on todo.completed
    checkbox.checked = !!todo.completed;


    // when checkbox is changed (checked / unchecked)
    checkbox.addEventListener("change", () => {

        // update the todo object's completed state
        todo.completed = checkbox.checked;

        // re-render UI to reflect changes
        render();

        // save updated state to localStorage
        saveTodo();
    })


    // create span element to display todo text
    const textSpan = document.createElement('span')

    // insert todo text inside span
    textSpan.textContent = todo.text;

    // add spacing between elements
    textSpan.style.margin = '5px 10px';

    // if todo is completed → show strike-through text
    if(todo.completed) textSpan.style.textDecoration = "line-through";


    // allow editing the todo by double clicking text
    textSpan.addEventListener('dblclick', () => {

        // open browser prompt to edit text
        const newText = prompt("Edit Todo", todo.text);

        // check if user didn't cancel and input is not empty
        if (newText !== null && newText.trim() !== ""){

            // update todo text
            todo.text = newText.trim();

            // update UI
            render();

            // save updated todo
            saveTodo();
        }
    })


    // create delete button
    const delBtn = document.createElement('button');

    // button label
    delBtn.textContent = "Delete";


    // when delete button is clicked
    delBtn.addEventListener('click', () => {

        // remove this todo from the array
        // splice(index,1) removes one element at position index
        todos.splice(index, 1);

        // re-render the list
        render();

        // update storage
        saveTodo();
    });


    // attach all elements to <li>
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    // return the fully constructed todo node
    return li;
}


// Function responsible for displaying todos in the UI
function render() {

    // clear current list before rebuilding it
    todoList.innerHTML = '';

    // loop through todos array
    todos.forEach((todo, index) => {

        // create todo DOM node
        const todoNode = createTodo(todo, index);

        // add it to the list
        todoList.appendChild(todoNode);
    });
}


// Function that runs when user adds a new todo
function addTodo(){

    // get text from input field and remove extra spaces
    const text = input.value.trim();

    // if input is empty → do nothing
    if (!text) return;

    // add new todo object to array
    todos.push({
        text,
        completed: false
    });

    // clear input field
    input.value = '';

    // update UI
    render();

    // save to browser storage
    saveTodo();
}


// when add button is clicked → run addTodo function
addBtn.addEventListener('click', addTodo);


// render todos when page first loads
// this restores saved todos from localStorage
render();