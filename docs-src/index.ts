import "normalize.css/normalize.css";
import "./style.scss";
import "highlight.js/styles/vs.css";
import * as monaco from "monaco-editor";
import * as hljs from "highlight.js";

import { turbinizeHTMLString } from "./../src";

const result = document.getElementById("result");
const error = document.getElementById("error");
const editorContainer = document.getElementById("editor-container");
const namespace = <HTMLInputElement>document.getElementById("namespace");

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "html") {
      return "./html.worker.js";
    }
    return "./editor.worker.js";
  }
};

const initialCode = `<div>
  <h1>My Blog</h1>
  <p>Lorem ipsum</p>
</div>
`;

const editor = monaco.editor.create(editorContainer, {
  value: initialCode,
  language: "html"
});
editor.onDidChangeModelContent(update);
namespace.addEventListener("input", update);

function update() {
  try {
    const tscode = turbinizeHTMLString(editor.getValue(), {
      elementNamespace: namespace.value !== "" ? namespace.value : undefined
    });
    result.innerText = tscode;
    hljs.highlightBlock(result);
    error.innerText = "";
  } catch (e) {
    error.innerText = e;
  }
}

update();
