window.onload = () => {
  console.log("STARTING PROJECT");

  //// selectors
  const todoItem = document.querySelector("#todo-item");

  const todoSave = document.querySelector("#todo-save");

  const todoList = document.querySelector("#todo-list");

  const clearBtn = document.querySelector("#todo-delall");

  const clearOne = document.querySelector("#todo-delcom");

  let id: number = 0;
  var arrOfNotes: number[] = [];

  //////////////////////////////////////////////////////////

  displayNotesFromLocalStorage();

  function displayNotesFromLocalStorage(): void {
    arrOfNotes = JSON.parse(localStorage.getItem("arrInStorage") || "[]");

    arrOfNotes.forEach((note) => {
      todoList.innerHTML += `
        <div class="todo-row" id='${note.id}'>
          <div class="todo-item" onclick="deleteNote(${note.id++})">${
        note.todoItemValue
      }</div>
          <span class="todo-ok"></span>
        </div>
`;

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
      let todoItemValue: string = todoItem.value;

      arrOfNotes.push({ todoItemValue: string, id: number });
      console.log("arrOfNotes :", arrOfNotes);

      todoList.innerHTML += `
        <div class="todo-row" id='${id}'>
          <div class="todo-item" onclick="deleteNote(${id++})">${todoItemValue}</div>
          <span class="todo-ok"></span>
        </div>
`;

      ////////////////////////

      ////////////////////////////

      todoItem.value = "";
    }

    putNewNoteInLocalStorage();
  });

  function putNewNoteInLocalStorage(): void {
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
    todoList.innerHTML = ``;
  });

  clearOne.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clear");

    localStorage.clear();
    todoList.innerHTML = ``;
  });
};
