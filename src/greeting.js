const main = document.querySelector("main"),
  form = document.querySelector(".js-greetings-form"),
  input = form.querySelector("input"),
  greetingContainer = document.querySelector(".js-greetings"),
  greetingName = greetingContainer.querySelector(".js-greetings__name"),
  greetingEmoticon = greetingContainer.querySelector(".js-greetings__emoticon");

const USER_LS = "currentUser",
  SHOWING_B = "showing-b",
  SHOWING_F = "showing-f",
  NONE_SHOWING = "non-showing",
  ENTER = "Enter",
  ESC = "Escape";

const handleSubmitModifiedGreeting = (event) => {
  if ((event.target.value !== "" && event.key === ENTER) || event.key === ESC) {
    if (event.key === ENTER) {
      setGreetingName(event.target.value);
      saveName(event.target.value);
    }
    showGreetingNameAndEmoticon();
    greetingContainer.removeChild(event.target);
  }
};

const handleFocusOutFromGreetingInput = (event) => {
  showGreetingNameAndEmoticon();
  greetingContainer.removeChild(event.target);
};

const handleEditGreetingName = () => {
  hideGreetingNameAndEmoticon();
  const input = generateInputForEdit();
  greetingContainer.appendChild(input);
  input.focus();
};

function handleSubmit(event) {
  event.preventDefault();
  saveName(input.value);
  paintGreeting(input.value);
  form.classList.remove(SHOWING_B);
}

function generateInputForEdit() {
  const dummyInput = document.createElement("input");
  dummyInput.placeholder = "이름이 뭐에요?";
  dummyInput.maxLength = "10";
  dummyInput.value = greetingName.innerHTML;
  dummyInput.name = greetingName.innerHTML;
  dummyInput.autocomplete = "off";
  dummyInput.addEventListener("focusout", handleFocusOutFromGreetingInput);
  dummyInput.addEventListener("keyup", handleSubmitModifiedGreeting);
  return dummyInput;
}

function showGreetingNameAndEmoticon() {
  greetingName.classList.remove(NONE_SHOWING);
  greetingEmoticon.classList.remove(NONE_SHOWING);
}

function hideGreetingNameAndEmoticon() {
  greetingName.classList.add(NONE_SHOWING);
  greetingEmoticon.classList.add(NONE_SHOWING);
}

function askForName() {
  form.classList.add(SHOWING_B);
  form.addEventListener("submit", handleSubmit);
}

function setGreetingName(text) {
  greetingName.innerHTML = text;
}

function paintGreeting(text) {
  setGreetingName(text);
  main.classList.add(SHOWING_F);
  greetingContainer.classList.add(SHOWING_F);
  greetingName.addEventListener("dblclick", handleEditGreetingName);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  return currentUser;
}

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function isNull(data) {
  return data === null;
}

function init() {
  const name = loadName();
  isNull(name) ? askForName() : paintGreeting(name);
}

init();
