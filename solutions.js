//// selectors
const todoItem = document.querySelector("#todo-item");
const todoSave = document.querySelector("#todo-save");
const todoList = document.querySelector("#todo-list");
const clearBtn = document.querySelector("#todo-delall");
const clearOne = document.querySelector("#todo-delcom");
let id = 0;
var arrOfNotes = [];
var onComplete = true;
var isNewItem = false;
//////////////////////////////////////////////////////////
displayNotesFromLocalStorage();
function displayNotesFromLocalStorage() {
    arrOfNotes = JSON.parse(localStorage.getItem("arrInStorage") || "[]");
    if (arrOfNotes.length > 0) {
        console.log("arrOfNotes :", arrOfNotes);
        arrOfNotes.forEach((note) => {
            todoList.innerHTML += creatNewTodoRow(note.todoItemValue, note.id);
            todoItem.value = "";
        });
        // console.log(arrOfNotes[arrOfNotes.length - 1]);
        id = arrOfNotes[arrOfNotes.length - 1].id;
    }
}
//////////////////////////on click on + button ////////////////////////
todoSave.addEventListener("click", function (event) {
    event.preventDefault();
    let todoItemValue = todoItem.value;
    if (todoItemValue.length > 0) {
        id++;
        arrOfNotes.push({ todoItemValue, id });
        console.log("arrOfNotes :", arrOfNotes);
        todoList.innerHTML += creatNewTodoRow(todoItemValue, id);
        todoItem.value = "";
        putNewNoteInLocalStorage();
    }
});
function creatNewTodoRow(content, id) {
    return `
        <div class="todo-row" >
          <div class="todo-item" id='${id}'> ${content}  </div>
          <span class="todo-ok"  onclick="Completed(${id})">
        <h1>&#10003</h1></span>
        </div>`;
}
function putNewNoteInLocalStorage() {
    //   localStorage.clear();
    localStorage.setItem("arrInStorage", JSON.stringify(arrOfNotes));
}
//display The Note As Completed
// [t0,t1,t2,t3]
//   0  1  2  3
var idOfRowsToDelete = [];
var prevId = "";
var deletedItems; //{todoItemValue: "dsfs", id: 2}
function Completed(currentId) {
    console.log("currentId :", currentId);
    console.log("currentId :", currentId);
    console.log("prevId :", prevId);
    if (prevId !== currentId) {
        onComplete = true;
    }
    const idOfClickRow = document.getElementById(currentId);
    console.log("idOfClickRow :", idOfClickRow);
    if (onComplete) {
        idOfClickRow.classList.add("done");
        idOfRowsToDelete.push(document.getElementById(currentId));
        console.log("idOfRowsToDelete :", idOfRowsToDelete);
        deletedItems = arrOfNotes.filter((note) => note.id === currentId);
        console.log("deletedItems :", deletedItems);
        console.log("arrOfNotes :", arrOfNotes);
        arrOfNotes = arrOfNotes.filter((note) => note.id !== currentId);
        console.log("arrOfNotes :", arrOfNotes);
        //   //   arrOfNotes.splice(id, 1);
        //   //   console.log("arrOfNotes :", arrOfNotes);
        onComplete = false;
    }
    else if (!onComplete) {
        idOfClickRow.classList.remove("done");
        var itemToBringBack = deletedItems.pop();
        console.log("itemToBringBack :", itemToBringBack);
        console.log("idOfRowsToDelete :", idOfRowsToDelete);
        idOfRowsToDelete = idOfRowsToDelete.filter((note) => {
            console.log("note :", note);
            console.log("itemToBringBack :", itemToBringBack);
            return note !== document.getElementById(currentId);
        });
        //   console.log("idOfRowsToDelete2s :", idOfRowsToDelete);
        var i = 0; //.
        //   // console.log("arrOfNotes[i].id  :", arrOfNotes[i].id);
        //   //                 4              0
        // 0: {todoItemValue: "aa", id: 1. 0}
        // 1: {todoItemValue: "bbb", id: 2.1}
        // 2: {todoItemValue: "ccc", id: 3}
        // 3: {todoItemValue: "ddddd", id: 4,2}
        //                                                    4: {todoItemValue: "eeee", id: 5,3}
        var originalLength = arrOfNotes.length;
        for (var i = 0; i < originalLength; i++) {
            console.log("i :", i);
            // console.log("------------------------");
            // console.log("arrOfNotes[i].id :", arrOfNotes[i].id);
            // console.log("itemToBringBack.id :", itemToBringBack.id);
            if (arrOfNotes[i].id > itemToBringBack.id) {
                arrOfNotes.splice(i, 0, itemToBringBack);
                break;
            }
        }
        if (i === arrOfNotes.length - 1) {
            arrOfNotes.splice(i, 0, itemToBringBack);
        }
        //   console.log("i :", i);
        console.log("arrOfNotes :", arrOfNotes);
        onComplete = true;
    }
    prevId = currentId;
}
/////// delete Note
clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clear");
    localStorage.clear();
    location.reload();
});
clearOne.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear();
    localStorage.setItem("arrInStorage", JSON.stringify(arrOfNotes));
    idOfRowsToDelete.forEach((element) => {
        element.classList.remove("done");
        element.classList.add("cx");
        element.parentElement.lastElementChild.classList.remove("todo-ok");
        element.parentElement.lastElementChild.classList.add("todo-cx");
    });
    setTimeout(() => {
        location.reload();
    }, 500);
});
///////////////////////////////////////////////////
