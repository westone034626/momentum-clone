const clockContainer = document.querySelector(".js-clock");
const clockDate = document.querySelector(".js-clock-date");
const clockTitle = document.querySelector(".js-clock-time");

function getTodayDate(date) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return `
    ${y}. 
    ${m + 1 < 10 ? `0${m + 1}` : m + 1}.
    ${d < 10 ? `0${d}` : d}
  `;
}

function getTodayTime(date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${
    s < 10 ? `0${s}` : s
  }`;
}

function setClock(date) {
  clockDate.innerHTML = getTodayDate(date);
  clockTitle.innerHTML = getTodayTime(date);
}

function getTime() {
  const date = new Date();
  return date;
}

function init() {
  const time = getTime();
  setClock(time);
}

init();
setInterval(init, 1000);
