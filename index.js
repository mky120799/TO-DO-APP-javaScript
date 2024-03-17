let todoDataSection = document.getElementById('todo-data');

function addTodo(todoData){
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
    rowDiv.classList.add("row")
    todoItem.classList.add("todo-items", "d-flex", "flex-row", "justify-content-between", "align-items-center");
    todoNumber.classList.add('todo-no');
    todoDetail.classList.add("todo-detail", "text-muted");
    todoSatatus.classList.add("todo-status", "text-muted");
    todoActions.classList.add("todo-actions", "d-flex", "justify-content-start", "gap-2");
    deleteButton.classList.add("btn","btn-danger");
    finishedButton.classList.add("btn","btn-success");

    // adding the text content to the divs
    todoNumber.textContent = '1'; // You might want to change this dynamically
    todoDetail.textContent = todoData; // sets the todo text from the input element 
    todoSatatus.textContent = 'In progress';
    deleteButton.textContent = 'Delete'; // Changed from 'Finished' to 'Delete' for clarity
    finishedButton.textContent = 'Finished'; // Changed from 'Finished' to 'Delete' for clarity

    todoActions.appendChild(deleteButton);
    todoActions.appendChild(finishedButton);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoSatatus)
    todoItem.appendChild(todoActions);


    // Append todoItem and hr to todoDataSection
    todoDataSection.appendChild(todoItem);
    todoDataSection.appendChild(hr);
}

// Call addTodo with the todoData parameter
console.log("JavaScript code is working"); // Just a log to ensure script execution
console.log("JavaScript code is working"); 

