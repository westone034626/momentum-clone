const URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "219d5c33fe9ba8193da807e030e2aa36";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");

async function getWeather(lat, lng) {
  const response = await fetch(
    `${URL}lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  );
  const jsonData = await response.json();
  const temperature = jsonData.main.temp;
  const city = jsonData.name;
  return `🌡 : ${temperature} ℃ | 🧭 : ${city}`;
}

function stringfyData(data) {
  return JSON.stringify(data);
}

function saveCoords(coords) {
  const stringfiedCoords = stringfyData(coords);
  localStorage.setItem(COORDS, stringfiedCoords);
}

function getCoords(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  return coordsObj;
}

function handleGeoSucces(position) {
  const coords = getCoords(position);
  saveCoords(coords);
  setWeather(coords);
}

function getErrorMSG() {
  return "날씨정보 조회실패";
}

function setWeatherMessage(message) {
  weather.innerHTML = message;
}

function handleGeoError() {
  const errorMessage = getErrorMSG();
  setWeatherMessage(errorMessage);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const coordsInfo = localStorage.getItem(COORDS);
  return coordsInfo;
}

function getParsedData(info) {
  return JSON.parse(info);
}

function isNull(data) {
  return data === null;
}

async function displayWeather(coords) {
  const weatherInfo = await getWeather(coords.latitude, coords.longitude);
  setWeatherMessage(weatherInfo);
}

function init() {
  const coordsInfo = loadCoords();
  const parsedCoords = getParsedData(coordsInfo);
  isNull(coordsInfo) ? askForCoords() : displayWeather(parsedCoords);
}

init();
setInterval(init, 60000);
