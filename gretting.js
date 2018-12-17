const form = document.querySelector(".js-form")
, input = document.querySelector("input")
, greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUesr",
    SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}
    
function handleSubmit(event){
// 이벤트는 상위로 계속 이동하여 document 까지    
// submit 기본 이벤트 막기
    event.preventDefault();
    const currentValue  =  input.value;
    //console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue)
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit)
}    

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greetings.classList.add(SHOWING_CN);
    greetings.innerText = `Hello ${text}`;
}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if( currentUser === null){
        // she is not
        askForName();
    } else {
        // she is
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();