import "normalize.css/normalize.css";
import "./style.css";
import "highlight.js/styles/vs.css";
import * as monaco from "monaco-editor";
import * as hljs from "highlight.js";

import { turbinizeHTMLString } from "./../src";

const result = document.getElementById("result");
const error = document.getElementById("error");

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "html") {
      return "./html.worker.js";
    }
    return "./editor.worker.js";
  }
};

const editorContainer = document.getElementById("editor-container");

const initialCode = `<div>
  <h1>My Blog</h1>
  <p>Lorem ipsum<p>
</div>
`;

const editor = monaco.editor.create(editorContainer, {
  value: initialCode,
  language: "html"
});

function update() {
  try {
    result.innerText = turbinizeHTMLString(editor.getValue());
    hljs.highlightBlock(result);
    error.innerText = "";
  } catch (e) {
    error.innerText = e;
  }
}

editor.onDidChangeModelContent(update);
update();
