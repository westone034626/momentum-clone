const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  greetingContainer = document.querySelector(".greetings"),
  helloMSG = greetingContainer.querySelector("h4"),
  main = document.querySelector("main");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

const handleSubmitNewGreeting = (event) => {
  if (event.target.value !== "" && event.key === "Enter") {
    const div = event.target.parentNode;
    const h4 = document.createElement("h4");
    h4.addEventListener("dblclick", handleEditGreeting);
    h4.innerHTML = event.target.value;
    saveName(event.target.value);
    div.replaceChild(h4, event.target);
    helloMSG.classList.remove("non-showing");
  } else if (event.key === "Escape") {
    const div = event.target.parentNode;
    const h4 = document.createElement("h4");
    h4.innerHTML = event.target.name;
    h4.addEventListener("dblclick", handleEditGreeting);
    div.replaceChild(h4, event.target);
    helloMSG.classList.remove("non-showing");
  }
};

const handleEditGreeting = (event) => {
  helloMSG.classList.add("non-showing");
  const div = event.target.parentNode;
  const input = document.createElement("input");
  input.placeholder = "이름이 뭐에요?";
  input.maxLength = "10";
  input.value = event.target.innerHTML;
  input.name = event.target.innerHTML;
  input.addEventListener("keyup", handleSubmitNewGreeting);
  div.replaceChild(input, event.target);
  input.focus();
};

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.parentNode.classList.add("greeting__text");
  greeting.parentNode.classList.remove("greetings");
  main.classList.add("showing--f");
  greeting.innerHTML = text;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
  greeting.addEventListener("dblclick", handleEditGreeting);
}

init();
