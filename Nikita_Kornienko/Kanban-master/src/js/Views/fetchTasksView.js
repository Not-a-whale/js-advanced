import * as taskView from "./taskView";
import * as app from "../../app";
import Axios from "axios";

export let fetchedResArr = [];

export const asyncFetchTasks = async () => {
  let href = "https://jsonplaceholder.typicode.com/todos";
  try {
    const res = await Axios(href);

    for (let i = 0; i < 10; i++) {
      fetchedResArr.push(res.data[i].title);
    }
  } catch (err) {
    alert(err);
  }
};
