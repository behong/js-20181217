const toDoForm = document.querySelector(".js-toDoForm")
    ,toDoInput  = toDoForm.querySelector("input")
    ,toDoList  = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function deleteToDos(event){
    // console.log(event.target.parentNode);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    // 전체 1,2,3 중
    // 내가 아이디 2를 넘기면
    // 선택한 아이디 2 제외하고 1,3 넘긴다(필터)
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    // console.log(cleanToDos);
    // const toDos--> let 타입 으로 변경 
    // toDos 배열로 필터된 array 복사 ? 리플레이스
    toDos = cleanToDos;
    // 복사된 toDos localStorage 저장
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
 const li = document.createElement("li");
 const delBtn = document.createElement("button");
 const span = document.createElement("span");
 const newId = toDos.length + 1;
 delBtn.innerHTML= "❌";
 delBtn.addEventListener("click",deleteToDos )
 span.innerText = text;
 li.appendChild(delBtn);
 li.appendChild(span);
 li.id = newId;
 toDoList.appendChild(li);
 const toDoObj = {
     text : text,
     id : newId
 };
 toDos.push(toDoObj);
 saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue= toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value ="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //console.log(loadedToDos)
        const parsedToDos =JSON.parse(loadedToDos);
        //console.log(parsedToDos);
        parsedToDos.forEach(function(todo){
            // console.log(todo.text);
            paintToDo(todo.text);
        });
    }
}    


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}   

init();