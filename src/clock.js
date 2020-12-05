const clockContainer = document.querySelector(".js-clock");
const clockDate = document.querySelector(".js-clock-date")
const clockTitle = document.querySelector(".js-clock-time");
const dayOfWeeks = {
    0: "일요일",
    1: "월요일",
    2: "화요일",
    3: "수요일",
    4: "목요일",
    5: "금요일",
    6: "토요일"
}

function getTodayDate(y, m, d, dOW) {
    return `${y}년 ${m}월 ${d}일 ${dOW}`;
}

function getTodayTime(h, m, s) {
    return `${h < 10? `0${h}`:h}:${m < 10? `0${m}`:m}:${s < 10? `0${s}`:s}`;
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
    clockDate.innerHTML = getTodayDate(years, months, days, dayOfWeek);
    clockTitle.innerHTML = getTodayTime(hours, minutes, seconds);
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();