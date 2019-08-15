import "./js/Models/Task";
import "./scss/base.scss";
import Task from "./js/Models/Task";
import * as elements from "./js/base";
import * as taskView from "./js/Views/taskView";
import * as fetched from "./js/Views/fetchTasksView";
import * as changedTask from "./js/Views/changeTasksView";

/* State Variabe */

export const state = {
  todo: [],
  doing: [],
  done: []
};

/* Init function */

const initBoard = () => {
  let fetchedItems = fetchFromLocalStorage();

  if (fetchedItems.todo != null) {
    fetchedItems.todo.forEach(el => {
      addItem(el.title, el.id, el.class);
    });
  }
  if(fetchedItems.doing != null) {
    fetchedItems.doing.forEach(el => {
      addItem(el.title, el.id, el.class);
    });
  }
  if(fetchedItems.done != null) {
    fetchedItems.done.forEach(el => {
      addItem(el.title, el.id, el.class);
    });
  }
};

/* Fetching Data */

export const fetchFromLocalStorage = () => {
  let obj;

  obj = {
    todo: JSON.parse(localStorage.getItem("stateToDoArr")),
    doing: JSON.parse(localStorage.getItem("stateDoingArr")),
    done: JSON.parse(localStorage.getItem("stateDoneArr"))
  };

  return obj;
};

/* Saving to LocalStorage */

const saveToLocalStorage = () => {
  localStorage.setItem("stateToDoArr", JSON.stringify(state.todo));
  localStorage.setItem("stateDoingArr", JSON.stringify(state.doing));
  localStorage.setItem("stateDoneArr", JSON.stringify(state.done));
};

/* App controller */

const addItem = function(title, id, elClass = "todo") {
  // 1) Add a new Task to the state variable

  if (elClass === "todo") {
    state.task = new Task(title, taskView.generateId(), elClass);
    console.log(state.task);
    state.todo.push(state.task);
    saveToLocalStorage();
  } else if (elClass === "doing") {
    state.task = new Task(title, id, elClass);

    state.doing.push(state.task);
    saveToLocalStorage();
  } else if (elClass === "done") {
    state.task = new Task(title, id, elClass);

    state.done.push(state.task);
    saveToLocalStorage();
  }

  // 2) Prepare the UI

  taskView.clearInput();

  // 3) Display a new Task in the UI

  console.log(state);

  taskView.renderTask(state.task.title, state.task.id, elClass);
};

const fetchItems = async () => {
  await fetched.asyncFetchTasks();

  let arr = fetched.fetchedResArr;

  for (let i = 0; i < arr.length; i++) {
    addItem(arr[i], 1, "todo");
  }
};

export const getTaskData = eTarg => {
  let id, elClass;
  if (eTarg.parentNode.parentNode.id) {
    id = eTarg.parentNode.parentNode.id;
    if (eTarg.parentNode.parentNode.parentNode.classList.contains("to-do")) {
      elClass = "todo";
    } else if (eTarg.parentNode.parentNode.parentNode.classList.contains("doing")) {
      elClass = "doing";
    } else  {
      elClass = 'done';
    }
    changeState(id, elClass);
  }

  if (eTarg.classList.contains("btn-danger")) {
    changedTask.deleteItemFromUI(id);
    console.log(id);

    deleteTask(id, elClass);
  }
};

const changeState = (id, elClass) => {
  let elem;
  elem = removeFromState(id, elClass);

  if (elem.class === "todo") {
    changedTask.updateUI(elem.title, elem.id, elem.class);
    elem.class = "doing";
    state["doing"].push(elem);
    saveToLocalStorage();
  } else if (elClass === "doing") {
    elem.class = "done";
    state["done"].push(elem);
    changedTask.updateUI(elem.title, elem.id, elem.class);
    saveToLocalStorage();
  }
};

const removeFromState = (id, elClass) => {
  let index, elem;

  index = state[elClass].findIndex(cur => {return cur.id == id});
  if (index > -1) {
    elem = state[elClass].splice(index, 1)[0];
    saveToLocalStorage();
  }

  return elem;
};

const deleteTask = (id, elClass) => {
  removeFromState(id, "todo");
  removeFromState(id, "doing");
  removeFromState(id, "done");

  console.log(state);
};

/* Event listeners */

document.addEventListener("DOMContentLoaded", initBoard);

elements.elements.task.addEventListener("click", e => {
  e.preventDefault;
  addItem(taskView.getInput(), 1, "todo");
});

elements.elements.fetch.addEventListener("click", fetchItems);

elements.elements.DOMContainer.addEventListener("click", e => {
  e.preventDefault;
  getTaskData(e.target);
});

document.addEventListener("keypress", event => {
  if (event.keyCode === 13 || event.which === 13) {
    addItem(taskView.getInput(), 1, "todo");
  }
});
