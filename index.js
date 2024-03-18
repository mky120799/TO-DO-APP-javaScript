// Define an array to store the todos
let todos = [];

// Get reference to the todo data section in the HTML
let todoDataSection = document.getElementById('todo-data');

// Create a div element to hold the todo list
let todoDataList = document.createElement('div');
todoDataList.classList.add('todo-data-list');

// Get reference to the save button and input bar
let saveButton = document.getElementById('save-todo');
let todoInputBar = document.getElementById('todo-input-bar');

// Add event listener to input bar to toggle save button
todoInputBar.addEventListener('input', function toggleSaveButton(){
    let todotext = todoInputBar.value;
    if(todotext.length == 0){
        if(!saveButton.classList.contains('disabled')) {
            saveButton.classList.add("disabled");
        }
    }
    else if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled");
    }
});

// Add event listener to save button to add todo
saveButton.addEventListener('click', function getTextAndTodo(){
    let todotext = todoInputBar.value;
    if(todotext.length == 0) return;
    let todo = { text: todotext, status: 'In progress', finishedButtonText: 'Finished' };   
    todos.push(todo);
    addTodo(todo, todos.length);
    todoInputBar.value = '';
    // Save todos to local storage after adding a new todo
    saveTodosToLocalStorage();
});

// Function to render todos
function reRenderTodos() {
    todoDataList.innerHTML = '';
    todos.forEach((element, idx) => {
        addTodo(element, idx + 1);
    });
}

// Function to remove todo
function removeTodo (event) {
    let deleteButtonPressed = event.target;
    let indexTobeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
    todos.splice(indexTobeRemoved, 1);
    reRenderTodos();
    // Save todos to local storage after removing a todo
    saveTodosToLocalStorage();
}

// Function to mark todo as finished
function finishTodo(event) {
    let finishedButtonPressed = event.target;
    let indexToFinished = Number(finishedButtonPressed.getAttribute("todo-idx"));
    if(todos[indexToFinished].status == "Finished"){
        todos[indexToFinished].status = 'In progress';
        todos[indexToFinished].finishedButtonText= 'Finished';
    } else {
        todos[indexToFinished].status = "Finished";
        todos[indexToFinished].finishedButtonText="Undo";
    }
    todos.sort((a,b)=>{
        if(a.status == 'Finished')
           return 1;
        else{
            return -1;
        }
    });
    reRenderTodos();
    // Save todos to local storage after finishing a todo
    saveTodosToLocalStorage();
}

// Function to add todo
function addTodo(todo, todoCount) {
    let rowDiv = document.createElement('div');
    let todoItem = document.createElement('div');
    let todoNumber = document.createElement('div');
    let todoDetail = document.createElement('div');
    let todoSatatus = document.createElement('div');
    let todoActions = document.createElement('div');
    let deleteButton = document.createElement('button');
    let finishedButton = document.createElement('button');
    let hr = document.createElement('hr');

    rowDiv.classList.add("row");
    todoItem.classList.add("todo-items", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add('todo-no');
    todoDetail.classList.add("todo-detail", "text-muted");
    todoSatatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn","btn-danger", "delete-todo");
    finishedButton.classList.add("btn","btn-success", "finish-todo");
    deleteButton.setAttribute("todo-idx", todoCount - 1);
    finishedButton.setAttribute("todo-idx", todoCount - 1);
    deleteButton.onclick = removeTodo;
    finishedButton.onclick = finishTodo;

    todoNumber.textContent = `${todoCount}`;
    todoDetail.textContent = todo.text;
    todoSatatus.textContent = todo.status;
    deleteButton.textContent = 'Delete';
    finishedButton.textContent = todo.finishedButtonText;

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoSatatus);
    todoItem.appendChild(todoActions);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);
    todoDataList.appendChild(rowDiv);

    todoDataSection.appendChild(todoDataList);
}

// Function to save todos to local storage
function saveTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to retrieve todos from local storage
function getTodosFromLocalStorage() {
    let storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
        reRenderTodos();
    }
}

// Load todos from local storage when the page loads
window.addEventListener('load', getTodosFromLocalStorage);
