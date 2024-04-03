import React from "react";
// using renderer because our lib consumers are still on react 17
import { render } from "react-dom";
import App from "./App.tsx";
import "./index.css";

import { worker } from "./mocks/browser";

async function enableMocking() {
  await worker.start();
  console.log("Mocking enabled");
}

const container = document.getElementById("root")!;

enableMocking()
  .then(() => {
    console.info("Mocking enabled");
    render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      container
    );
  })
  .catch((error) => {
    console.error("Error enabling mocking", error);
  })
  .finally(() => {
    console.log("Finally");
  });
