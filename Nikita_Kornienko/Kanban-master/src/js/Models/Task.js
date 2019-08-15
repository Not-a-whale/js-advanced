import * as state from "../../app";

export default class Task {
  constructor(title, id, elClass) {
    (this.title = title), (this.id = id), (this.class = elClass);
  }
}
