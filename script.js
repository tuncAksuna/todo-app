const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
// tasks
const taskList1 = document.querySelector('#task-list1');
const taskList2 = document.querySelector('#task-list2');
const taskList3 = document.querySelector('#task-list3');
// buttons
const btnWarning = document.querySelector('#btnWarning');
const btnInfo = document.querySelector('#btnInfo');
const btnSuccess = document.querySelector('#btnSuccess');

arayuzGuncelle();

eventListeners();

function eventListeners() {

    form.addEventListener('submit', addNewItem);

    $(document).on('click', '.delete-item', function (element) {
        var silinecek_id = $(element.target).attr('item-id');
        console.log("silme butonu tıklandı : " + silinecek_id);
        deleteItemById(silinecek_id);
        arayuzGuncelle();
    });

    $(document).on('click', '.isleme-al-item', function (element) {
        // item status güncelle 
        var id = $(element.target).attr('item-id');
        console.log("İşleme al butonuna tıklandı : " + id);
        setItemStatus(id, 1)
        arayuzGuncelle();
    });

    $(document).on('click', '.tamamla-item', function (element) {
        // item status güncelle 
        var id = $(element.target).attr('item-id');
        console.log('Tamamla butonuna basıldı ' + id);
        setItemStatus(id,2);
        arayuzGuncelle();
    });
}


function addNewItem(e) {
    var date = new Date();

    var item = {
        title: input.value,
        id: date.getTime(),
        time: date.getTime(),
        status: 0
    }

    saveItem(item);

    arayuzGuncelle();

}

function arayuzGuncelle() {
    taskList1.innerHTML = ""
    taskList2.innerHTML = ""
    taskList3.innerHTML = ""
    input.value = '';

    var bekleyenler = getItemsByStatus(0);
    var yapilanlar = getItemsByStatus(1);
    var bitenler = getItemsByStatus(2);

    //bekleyenler for
    for (let index = 0; index < bekleyenler.length; index++) {
        const item = bekleyenler[index];
        //task-list1 içerisini item'i ekle...
        //eklenecek olan liste elemanına item verilerini de ekle
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(item.title));

        const a = document.createElement('button');
        a.setAttribute('item-id', item.id);
        a.classList = 'btn btn-danger delete-item float-right mr-2 p-1';
        a.innerText = "Sil"


        const btn1 = document.createElement('button');
        btn1.setAttribute('item-id', item.id);
        btn1.classList = 'btn btn-danger isleme-al-item float-right mr-2 p-1';
        btn1.innerText = "İşleme al"

        li.appendChild(a);
        li.appendChild(btn1);
        taskList1.appendChild(li);
    }
    //yapilanlar for
    for (let index = 0; index < yapilanlar.length; index++) {
        const item = yapilanlar[index];

        //task-list2 içerisini item'i ekle...
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(item.title));

        const a = document.createElement('button');
        a.setAttribute('item-id', item.id);
        a.classList = 'btn btn-danger delete-item float-right mr-2 p-1';
        a.innerText = "İptal et"

        const btn2 = document.createElement('button');
        btn2.setAttribute('item-id', item.id);
        btn2.classList = 'btn btn-danger tamamla-item float-right mr-2 p-1';
        btn2.innerText = "Tamamla"

        li.appendChild(a);
        li.appendChild(btn2);
        taskList2.appendChild(li);
    }
    //bitenler for
    for (let index = 0; index < bitenler.length; index++) {
        const item = bitenler[index];

        //task-list3 içerisini item'i ekle...
        const li = document.createElement('li');
        li.className = 'list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(item.title));

        const a = document.createElement('button');
        a.setAttribute('item-id', item.id);
        a.classList = 'btn btn-danger delete-item float-right mr-2 p-1';
        a.innerText = "Sil";

        const btn3 = document.createElement('button');
        btn3.setAttribute('item-id', item.id);
        btn3.classList = 'btn btn-danger tamamlandı-item float-right mr-2 p-1';
        btn3.innerText = 'İşlem tamamlandı';

        li.appendChild(a);
        li.appendChild(btn3);
        taskList3.appendChild(li);
    }
}
/**
 * verilen objeyi items isimli storage'a ekler
 * @param {*} item 
 */
function saveItem(item) {
    var tumu = getAllItems();
    tumu.push(item)
    saveAllItems(tumu);
}

/**
 * items isimli storage içerisinden status değerine göre verileri array olarak döner
 * @param {*} status 
 */
function getItemsByStatus(status) {
    var tumu = getAllItems();

    var statusList = [];
    for (let index = 0; index < tumu.length; index++) {
        const item = tumu[index];
        if (item.status == status)
            statusList.push(item)
    }
    return statusList;
}

/**
 * items storageındaki verilen id değerine sahip itemin status değerini günceller
 * @param {*} id 
 * @param {*} status 
 */
function setItemStatus(id, new_status) {
    var tumu = getAllItems();

    for (let index = 0; index < tumu.length; index++) {
        const item = tumu[index];
        if (item.id == id)
            item.status = new_status;
    }

    saveAllItems(tumu);
}

/**
 * verilen id değerine göre items storage içerisinde item siler.
 * @param {*} id 
 */
function deleteItemById(id) {
    var tumu = getAllItems();

    var tumuYeni = [];

    for (let index = 0; index < tumu.length; index++) {
        const item = tumu[index];
        if (item.id != id)
            tumuYeni.push(item);
    }

    saveAllItems(tumuYeni);
}

/**
 * items storage içerisindeki tüm verilei döner, veri yoksa boş array dönsün
 */
function getAllItems() {
    var itemsString = localStorage.getItem('items');
    if (itemsString) {
        return JSON.parse(itemsString);
    }
    return [];
}

/**
 * itemArray isimli objeyi items isimli storage'a ekler.
 * @param {*} itemArray 
 */
function saveAllItems(itemArray) {
    localStorage.setItem('items', JSON.stringify(itemArray));
}
























