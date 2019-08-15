import * as elements from "../base";
import * as app from "../../app";

export const getInput = () => {
  return elements.elements.inputForm.value;
};

export const clearInput = () => {
  elements.elements.inputForm.value = "";
};

export const generateId = () => {
  let ID;

  if (app.state.todo.length > 0) {
    ID = app.state.todo[app.state.todo.length - 1].id + 1;
  } else {
    ID = 1;
  }

  return ID;
};

export const renderTask = (title, id, elClass) => {
  if (elClass == "todo") {
    let markup = `<div class="card to-do__card mt-4 mb-4" id='${id}'>
        <div class="card-header to-do__card-header" style="font-size:18px;">
            <p class="text-primary">${title}</p>
        </div>
        <div class="card-body to-do__card-body">
            <button type="button" class="btn btn-primary">Move --></button>
            <button type="button" class="btn btn-danger" id="delete">Delete</button>
        </div>
        </div>`;
    elements.elements.todoContainer.insertAdjacentHTML("beforeend", markup);
  } else if (elClass == "doing") {
    let markup = `<div class="card doing__card mt-4 mb-4" id='${id}'>
        <div class="card-header to-do__card-header" style="font-size:18px;">
            <p class="text-warning">${title}</p>
        </div>
        <div class="card-body to-do__card-body">
            <button type="button" class="btn btn-warning">Move --></button>
            <button type="button" class="btn btn-danger" id="delete" >Delete</button>
        </div>
        </div>`;
    elements.elements.doingContainer.insertAdjacentHTML("beforeend", markup);
  } else if (elClass == "done") {
    let markup = `<div class="card done__card mt-4 mb-4" id='${id}'>
        <div class="card-header to-do__card-header" style="font-size:18px;">
            <p class="text-success">${title}</p>
        </div>
        <div class="card-body to-do__card-body">
            <button type="button" class="btn btn-success disabled" disabled>Move --></button>
            <button type="button" class="btn btn-danger delete" id="delete">Delete</button>
        </div>
        </div>`;
    elements.elements.doneContainer.insertAdjacentHTML("beforeend", markup);
  }
};
