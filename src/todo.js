const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishList = document.querySelector(".js-finishList"),
  entireTodoList = document.querySelector(".todoList__list"),
  todoButton = document.querySelector(".js-toDoButton--todo"),
  finishButton = document.querySelector(".js-toDoButton--finish"),
  alertMSG = document.querySelector(".alert-message__text"),
  alertMSGSM = document.querySelector(".alert-message__text__sm");

const TODOS_LS = "toDos";
const FINISH_LS = "finishes";
const NON_SHOWING = "non-showing";
const ACTIVE = "todoList__button__active";

let toDos = [];
let finishes = [];

const updateTodos = (id, text) => {
  toDos.map((todo) => {
    if (todo.id === id) {
      todo.text = text;
    }
  });
};

const updateFinishes = (id, text) => {
  finishes.map((finish) => {
    if (finish.id === id) {
      finish.text = text;
    }
  });
};

const isLiInTodos = (li) => {
  return li.parentNode.matches(".js-toDoList");
};

const handleKeyup = (event) => {
  if (event.target.value !== "" && event.key === "Enter") {
    event.target.lastKey = event.key;
    const li = event.target.parentNode;
    const span = document.createElement("span");
    span.innerHTML = event.target.value;
    li.replaceChild(span, event.target);
    if (isLiInTodos(li)) {
      updateTodos(li.id, span.innerHTML);
    } else {
      updateFinishes(li.id, span.innerHTML);
    }
    saveState();
    li.querySelector(".delBtn").classList.remove("non-showing");
    if (li.querySelector(".finishBtn") !== null) {
      li.querySelector(".finishBtn").classList.remove("non-showing");
    }
    if (li.querySelector(".backBtn") !== null) {
      li.querySelector(".backBtn").classList.remove("non-showing");
    }
  } else if (event.key === "Escape") {
    event.target.lastKey = event.key;
    const li = event.target.parentNode;
    const span = document.createElement("span");

    span.innerHTML = event.target.name;
    li.replaceChild(span, event.target);
    li.querySelector(".delBtn").classList.remove("non-showing");
    if (li.querySelector(".finishBtn") !== null) {
      li.querySelector(".finishBtn").classList.remove("non-showing");
    }
    if (li.querySelector(".backBtn") !== null) {
      li.querySelector(".backBtn").classList.remove("non-showing");
    }
  }
};

const handleFocusOut = (event) => {
  if (event.target.lastKey === undefined) {
    const li = event.target.parentNode;
    const span = document.createElement("span");
    span.innerHTML = event.target.name;
    li.replaceChild(span, event.target);
    li.querySelector(".delBtn").classList.remove("non-showing");
    if (li.querySelector(".finishBtn") !== null) {
      li.querySelector(".finishBtn").classList.remove("non-showing");
    }
    if (li.querySelector(".backBtn") !== null) {
      li.querySelector(".backBtn").classList.remove("non-showing");
    }
  }
};

const handleEdit = (event) => {
  const isSpan = event.target.closest("span");
  if (isSpan) {
    const li = isSpan.parentNode;
    const span = li.querySelector("span");
    const input = document.createElement("input");
    input.value = span.innerHTML;
    li.querySelector(".delBtn").classList.add("non-showing");
    if (li.querySelector(".finishBtn") !== null) {
      li.querySelector(".finishBtn").classList.add("non-showing");
    }
    if (li.querySelector(".backBtn") !== null) {
      li.querySelector(".backBtn").classList.add("non-showing");
    }
    input.name = span.innerHTML;
    input.maxLength = "100";
    input.placeholder = "값을 수정하세요";
    input.autocomplete = "off";
    input.addEventListener("focusout", handleFocusOut);
    input.addEventListener("keyup", handleKeyup);
    li.replaceChild(input, span);
    input.focus();
  }
};

const findInTodos = (id) => {
  return toDos.find((toDo) => {
    return toDo.id === id;
  });
};

const findInFinishes = (id) => {
  return finishes.find((finish) => {
    return finish.id === id;
  });
};

const removeFromTodos = (id) => {
  return (toDos = toDos.filter((toDo) => {
    return id !== toDo.id;
  }));
};

const removeFromFinishes = (id) => {
  finishes = finishes.filter((finish) => {
    return id !== finish.id;
  });
};

const pushTodoToFinish = (finish) => {
  finishes.push(finish);
};

const pushTodoToTodos = (toDo) => {
  toDos.push(toDo);
};

const handleFinish = (event) => {
  if (finishList.children.length > 29) {
    alertMSG.innerHTML = "꽉 찼습니다.";
    alertMSGSM.innerHTML = "꽉 찼습니다.";
    setTimeout(turnOffAlert, 5000);
  } else {
    const li = event.target.parentNode;

    // li를 토대로 toDos에서 taskObj를 뽑아낸다
    const taskObj = findInTodos(li.id);

    //toDos에서 taskObj를 지운다.
    removeFromTodos(taskObj.id);

    // todo ul에서 지운다
    toDoList.removeChild(li);

    // finish ul에 추가한다.
    paintFinish(taskObj);

    // finishes에 taskObj를 추가한다.
    pushTodoToFinish(taskObj);
    // LS에 반영한다.
    saveState();
  }
};

const handleBack = (event) => {
  if (toDoList.children.length > 29) {
    alertMSG.innerHTML = "꽉 찼습니다.";
    alertMSGSM.innerHTML = "꽉 찼습니다.";
    setTimeout(turnOffAlert, 5000);
  } else {
    const li = event.target.parentNode;
    // li를 토대로 toDos에서 taskObj를 뽑아낸다
    const taskObj = findInFinishes(li.id);

    //finishes에서 taskObj를 지운다.
    removeFromFinishes(taskObj.id);

    // finish ul에서 지운다
    finishList.removeChild(li);

    // todoList ul에 추가한다.
    paintToDo(taskObj);

    // toDos에 taskObj를 추가한다.
    pushTodoToTodos(taskObj);
    // LS에 반영한다.
    saveState();
  }
};

const buildGenericLi = (task, btn) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerHTML = task.text;
  delBtn.innerHTML = "╳";
  delBtn.addEventListener("click", handleDelete);
  delBtn.classList.add("delBtn");
  li.append(delBtn);
  li.append(btn);
  li.append(span);
  li.id = task.id;
  return li;
};

const paintFinish = (taskObj) => {
  const backBtn = document.createElement("button");
  backBtn.innerHTML = "🔙";
  backBtn.addEventListener("click", handleBack);
  backBtn.classList.add("backBtn");
  const genericLi = buildGenericLi(taskObj, backBtn);
  finishList.appendChild(genericLi);
};

function paintToDo(taskObj) {
  const finishBtn = document.createElement("button");
  finishBtn.innerHTML = "✔️";
  finishBtn.addEventListener("click", handleFinish);
  finishBtn.classList.add("finishBtn");
  const genericLi = buildGenericLi(taskObj, finishBtn);
  toDoList.appendChild(genericLi);
}

function handleDelete(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromTodos(li.id);
  removeFromFinishes(li.id);
  saveState();
}

function saveState() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  localStorage.setItem(FINISH_LS, JSON.stringify(finishes));
}

const getTaskObj = (text) => {
  return {
    id: String(Date.now()),
    text,
  };
};

const turnOffAlert = () => {
  alertMSG.innerHTML = "더블 클릭: 수정모드 / ESC: 취소";
  alertMSGSM.innerHTML = "터치 두 번: 수정모드";
};

function handleSubmit(event) {
  event.preventDefault();
  if (toDoList.children.length > 29) {
    toDoInput.value = "";
    alertMSG.innerHTML = "꽉 찼습니다.";
    alertMSGSM.innerHTML = "꽉 찼습니다.";
    setTimeout(turnOffAlert, 5000);
  } else {
    if (event.value !== "") {
      const taskObj = getTaskObj(toDoInput.value);
      paintToDo(taskObj);
      pushTodoToTodos(taskObj);
      saveState();
    }
    toDoInput.value = "";
  }
}

function restoreState() {
  toDos.forEach(function (toDo) {
    paintToDo(toDo);
  });

  finishes.forEach(function (finish) {
    paintFinish(finish);
  });
}

function loadState() {
  toDos = JSON.parse(localStorage.getItem(TODOS_LS)) || [];
  finishes = JSON.parse(localStorage.getItem(FINISH_LS)) || [];
}

const handleSelectButton = (event) => {
  if (event.target.matches(".js-toDoButton--todo")) {
    event.target.classList.add(ACTIVE);
    finishButton.classList.remove(ACTIVE);
    finishList.classList.add(NON_SHOWING);
    toDoList.classList.remove(NON_SHOWING);
  } else {
    event.target.classList.add(ACTIVE);
    todoButton.classList.remove(ACTIVE);
    finishList.classList.remove(NON_SHOWING);
    toDoList.classList.add(NON_SHOWING);
  }
};

function init() {
  loadState();
  restoreState();
  saveState();

  toDoForm.addEventListener("submit", handleSubmit);
  entireTodoList.addEventListener("dblclick", handleEdit);
  todoButton.addEventListener("click", handleSelectButton);
  finishButton.addEventListener("click", handleSelectButton);
}

init();
