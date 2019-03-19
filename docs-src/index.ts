import "normalize.css/normalize.css";
import "./style.css";

import { turbinizeHTMLString } from "./../src";

const editor = <HTMLTextAreaElement>document.getElementById("editor");
const result = document.getElementById("result");
const error = document.getElementById("error");

editor.addEventListener("input", evt => {
  try {
    result.innerText = turbinizeHTMLString(editor.value);
    error.innerText = "";
  } catch (e) {
    error.innerText = e;
  }
});
