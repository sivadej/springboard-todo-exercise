//Sivadej Kitchpanich
//todo list
//add listeners to events for adding items, marking items done, and removing.
//load and save items into localstorage. use JSON stringify and parse.
const todoList = document.querySelector('#todo-list');

//load list from localstorage if items exist
let todoListArray = JSON.parse(localStorage.getItem("todoList"));
if(todoListArray){
    for (item of todoListArray)
        addItem(item);
    }

function addItem(item){
    let itemLi = document.createElement('li');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.setAttribute('class','delete-btn');
    itemLi.innerHTML = `<span>${item}</span>`;
    itemLi.append(deleteBtn);
    todoList.appendChild(itemLi);
    //console.log(item + ' added');
    document.querySelector('#new-item').value = '';
    document.querySelector('#new-item').focus();
}

//add-item-btn button logic
const addItemBtn = document.querySelector('#add-item-btn');
addItemBtn.addEventListener('click', function(e){
    e.preventDefault();
    const newItem = document.querySelector('#new-item').value;
    if (newItem)
        addItem(newItem);
})

//toggle strikethough styling for items on click. NOTE: strikethrough status not stored in localstorage
//delete item on button click
todoList.addEventListener('click',function(e) {
    if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('strikethrough');
    }
    else if (e.target.tagName === 'BUTTON') {
        //console.log('delete button pressed ' + e.target.tagName);
        const itemToDelete = todoList.querySelector(e.target.tagName).parentElement;
        itemToDelete.remove();
    }
})

//save-btn logic: save to localStorage
const saveBtn = document.querySelector('#save-btn');
saveBtn.addEventListener('click', function(e){
    e.preventDefault();
    todoListArray = [];
    localStorage.removeItem("todoList");
    const items = todoList.querySelectorAll('li > span');
    for (let item of items) {
        todoListArray.push(item.innerText);
    }
    localStorage.setItem("todoList", JSON.stringify(todoListArray));
})