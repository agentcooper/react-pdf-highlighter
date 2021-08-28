import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// setup worker for react-pdf-highlighter
import { workerSrc } from "../react-pdf-highlighter";
import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
GlobalWorkerOptions.workerSrc = workerSrc;

ReactDOM.render(<App />, document.getElementById("root"));
