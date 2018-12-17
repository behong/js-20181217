const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function init(){
    getTime();
    setInterval(getTime,1000);
}


function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const secods = date.getSeconds();

    clockTitle.innerText =
    `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${secods < 10 ? `0${secods}` : secods }`;
}

init();