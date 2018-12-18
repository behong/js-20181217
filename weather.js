const weather = document.querySelector(".js-weather");

const COORDS = 'coords';
const API_KEY = 'a773b4ba59673270291a9161898c9bbc';

function getWeather(lat,lng){

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response ){
        //console.log(response.json());
        return response.json()
    })
    .then(function(json){
        //console.log(json);
        const temperature = json.main.temp;
        const pleace = json.name;
        weather.innerText= `${temperature} ${pleace}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}


function handleGeoError(){
    console.log("Cant access geo location");
}

function handleGeoSucces(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude :  latitude,
        longitude:  longitude
    } 
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);

    if(loadedCoords === null){
        askForCoords();
    }else{
        //getWeather
        const parseCoords = JSON.parse(loadedCoords);
        // console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();