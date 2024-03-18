let todos = [];

let todoDataSection = document.getElementById('todo-data');
let todoDataList = document.createElement('div');
    todoDataList.classList.add('todo-data-list')
let saveButton = document.getElementById('save-todo');
let todoInputBar = document.getElementById('todo-input-bar');

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

saveButton.addEventListener('click',function getTextAndTodo(){
    let todotext = todoInputBar.value;
    if(todotext.length == 0) return;
    todos.push(todotext);
    addTodo(todotext,todos.length);
    todoInputBar.value='';
});

function removeTodo (event){
    // event.target.parentElement.parentElement.parentElement.remove();
    let deleteButtonPressed = event.target;
    todoDataList.innerHTML=' ';
    console.log("the button is getting triggered");

    
    let indexTobeRemoved=Number(deleteButtonPressed.getAttribute("todo-idx"));
    console.log(indexTobeRemoved-1)
    todos.splice((indexTobeRemoved-1), 1);
    console.log(todos)
    
    todos.forEach((element,idx)=>{

        addTodo(element,idx+1);
    })

}

function addTodo(todoData,todoCount){

    let rowDiv = document.createElement('div');
    let todoItem = document.createElement('div');
    let todoNumber = document.createElement('div');
    let todoDetail = document.createElement('div');
    let todoSatatus = document.createElement('div');
    let todoActions = document.createElement('div');
    let deleteButton = document.createElement('button');
    let finishedButton = document.createElement('button');
    let hr = document.createElement('hr');

    //adding classes

    rowDiv.classList.add("row");
    todoItem.classList.add("todo-items", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add('todo-no');
    todoDetail.classList.add("todo-detail", "text-muted");
    todoSatatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn","btn-danger", "delete-todo");
    finishedButton.classList.add("btn","btn-success", "finish-todo");
    deleteButton.setAttribute("todo-idx", todoCount);
    deleteButton.onclick = removeTodo;

    // adding the text content to the divs
    todoNumber.textContent = `${todoCount}`; // You might want to change this dynamically
    todoDetail.textContent = todoData; // sets the todo text from the input element 
    todoSatatus.textContent = 'In progress';
    deleteButton.textContent = 'Delete'; // Changed from 'Finished' to 'Delete' for clarity
    finishedButton.textContent = 'Finished'; // Changed from 'Finished' to 'Delete' for clarity

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoSatatus);
    todoItem.appendChild(todoActions);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);
    todoDataList.appendChild(rowDiv);

    // Append todoItem and hr to todoDataSection
    todoDataSection.appendChild(todoDataList);
    
}


