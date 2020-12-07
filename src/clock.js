const clockContainer = document.querySelector(".js-clock");
const clockDate = document.querySelector(".js-clock-date");
const clockTitle = document.querySelector(".js-clock-time");
const dayOfWeeks = {
  0: "SUN",
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
};

function getTodayDate(y, m, d) {
  return `
    ${y}. 
    ${m + 1 < 10 ? `0${m + 1}` : m + 1}.
    ${d < 10 ? `0${d}` : d}
  `;
}

function getTodayTime(h, m, s) {
  return `${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${
    s < 10 ? `0${s}` : s
  }`;
}

function getTime() {
  const date = new Date();
  const years = date.getFullYear();
  const months = date.getMonth();
  const days = date.getDate();
  const dayOfWeek = dayOfWeeks[date.getDay()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockDate.innerHTML = getTodayDate(years, months, days);
  clockTitle.innerHTML = getTodayTime(hours, minutes, seconds);
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
