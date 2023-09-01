import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/_main.scss";
import { GameContextProvider } from "context/GameContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* TODO wrap App in GameContext Provider */}
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>
);
