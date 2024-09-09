import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// biome-ignore lint/style/noNonNullAssertion: Root element must be there
const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);
