window.onload = function () {
    console.log("STARTING PROJECT");
    //// selectors
    var todoItem = document.querySelector("#todo-item");
    var todoSave = document.querySelector("#todo-save");
    var todoList = document.querySelector("#todo-list");
    var clearBtn = document.querySelector("#todo-delall");
    var clearOne = document.querySelector("#todo-delcom");
    var id = 0;
    var arrOfNotes = [];
    //////////////////////////////////////////////////////////
    displayNotesFromLocalStorage();
    function displayNotesFromLocalStorage() {
        arrOfNotes = JSON.parse(localStorage.getItem("arrInStorage") || "[]");
        arrOfNotes.forEach(function (note) {
            todoList.innerHTML += "\n        <div class=\"todo-row\" id='" + note.id + "'>\n          <div class=\"todo-item\" onclick=\"deleteNote(" + note.id++ + ")\">" + note.todoItemValue + "</div>\n          <span class=\"todo-ok\"></span>\n        </div>\n";
            ////////////////////////
            ////////////////////////////
            todoItem.value = "";
        });
    }
    ////////////////////////////////////////////////////
    todoSave.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("clicked");
        creatNewNote();
        function creatNewNote() {
            var todoItemValue = todoItem.value;
            arrOfNotes.push({ todoItemValue: todoItemValue, id: id });
            console.log("arrOfNotes :", arrOfNotes);
            todoList.innerHTML += "\n        <div class=\"todo-row\" id='" + id + "'>\n          <div class=\"todo-item\" onclick=\"deleteNote(" + id++ + ")\">" + todoItemValue + "</div>\n          <span class=\"todo-ok\"></span>\n        </div>\n";
            ////////////////////////
            ////////////////////////////
            todoItem.value = "";
        }
        putNewNoteInLocalStorage();
    });
    function putNewNoteInLocalStorage() {
        localStorage.setItem("arrInStorage", JSON.stringify(arrOfNotes));
    }
    /////// delete Note
    //   function deleteNote(id) {
    //     document.getElementById(id).remove();
    //     arrOfNotes = arrOfNotes.filter((note) => note.id !== id);
    //     putNewNoteInLocalStorage();
    //     console.log(localStorage.getItem("arrInStorage"));
    //   }
    clearBtn.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("clear");
        localStorage.clear();
        todoList.innerHTML = "";
    });
    clearOne.addEventListener("click", function (event) {
        event.preventDefault();
        console.log("clear");
        localStorage.clear();
        todoList.innerHTML = "";
    });
};
