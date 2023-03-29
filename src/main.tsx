import "./assets/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { Demo } from "./demo/Demo";
import { App } from "./ui/App";
import { StoreProvider } from "./ui/Store";

const isDemo = localStorage.getItem("demo") === "true";

const rootNode = document.getElementById("root") as HTMLDivElement;
const root = ReactDOM.createRoot(rootNode);
root.render(
  isDemo ? (
    <Demo />
  ) : (
    <React.StrictMode>
      <StoreProvider>
        <App />
      </StoreProvider>
    </React.StrictMode>
  )
);
