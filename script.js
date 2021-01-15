const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

loadItems();

eventListeners();

function eventListeners() {
    form.addEventListener('submit', addNewItem);  // add new element
    taskList.addEventListener('click', deleteItem); // delete an item
    btnDeleteAll.addEventListener('click', deleteAllItems) // delete all items
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}
//Local storage
function getItemsFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to Local Store
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items)); // includes []
}
//delete ITEM from LS
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1)
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}
function createItem(text) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    //create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    //add a --> li
    li.appendChild(a);

    //add li --> ul
    taskList.appendChild(li);
}

//function that ran in eventListener
function addNewItem(e) {
    if (input.value === '') {
        alert('Please , add a new item');
    }

    //create item
    createItem(input.value);

    // save to LS
    setItemToLS(input.value);

    //clear input
    input.value = '';
    e.preventDefault();
}

//function that ran in eventListener
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure for this transaction ? ')) {
            e.target.parentElement.parentElement.remove();

            //delete ITEM from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

//function that ran in eventListener
function deleteAllItems(e) {
    if (confirm('Are You Sure ?')) {
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }

    e.preventDefault();
}

