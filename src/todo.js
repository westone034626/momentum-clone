const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishList = document.querySelector(".js-finishList"),
  entireTodoList = document.querySelector(".todoList");

const TODOS_LS = "toDos";
const FINISH_LS = "finishes";

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
  } else if (event.key === "Escape") {
    const li = event.target.parentNode;
    const span = document.createElement("span");
    span.innerHTML = event.target.name;
    li.replaceChild(span, event.target);
  }
};

const handleEdit = (event) => {
  const isLi = event.target.closest("li");
  if (isLi) {
    const li = event.target.closest("li");
    const span = li.querySelector("span");
    const input = document.createElement("input");
    input.value = span.innerHTML;
    input.name = span.innerHTML;
    input.addEventListener("keyup", handleKeyup);
    li.replaceChild(input, span);
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
};

const handleBack = (event) => {
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
};

const buildGenericLi = (task) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerHTML = task.text;
  delBtn.innerHTML = "❎";
  delBtn.addEventListener("click", handleDelete);
  li.append(span, delBtn);
  li.id = task.id;
  return li;
};

const paintFinish = (taskObj) => {
  const genericLi = buildGenericLi(taskObj);
  const backBtn = document.createElement("button");
  backBtn.innerHTML = "⏪";
  backBtn.addEventListener("click", handleBack);
  genericLi.appendChild(backBtn);
  finishList.appendChild(genericLi);
};

function paintToDo(taskObj) {
  const genericLi = buildGenericLi(taskObj);
  const finishBtn = document.createElement("button");
  finishBtn.innerHTML = "✅";
  finishBtn.addEventListener("click", handleFinish);
  genericLi.appendChild(finishBtn);
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

function handleSubmit(event) {
  event.preventDefault();
  if (event.value !== "") {
    const taskObj = getTaskObj(toDoInput.value);
    paintToDo(taskObj);
    pushTodoToTodos(taskObj);
    saveState();
  }
  toDoInput.value = "";
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

function init() {
  loadState();
  restoreState();
  saveState();

  toDoForm.addEventListener("submit", handleSubmit);
  entireTodoList.addEventListener("dblclick", handleEdit);
}

init();
