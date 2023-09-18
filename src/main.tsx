import React from "react";
import ReactDOM from "react-dom/client";
import { GameContextProvider } from "context";
import App from "./App.tsx";
import "./styles/_main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
);
