import * as taskView from "./taskView";

export const updateUI = (title, id, elClass) => {
  if (elClass == "todo") {
    deleteItemFromUI(id);
    taskView.renderTask(title, id, "doing");
  } else if ((elClass = "doing")) {
    deleteItemFromUI(id);
    taskView.renderTask(title, id, "done");
  }
};

export const deleteItemFromUI = id => {
  let el = document.getElementById(id);

  el.remove();
};
