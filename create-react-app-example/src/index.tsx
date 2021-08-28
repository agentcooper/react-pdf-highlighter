/* eslint-disable import/first */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// setup worker for react-pdf-highlighter
import { GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
// @ts-ignore
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
GlobalWorkerOptions.workerSrc = pdfjsWorker;

ReactDOM.render(<App />, document.getElementById("root"));
