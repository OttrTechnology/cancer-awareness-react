import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { GameContextProvider } from "context";
import App from "./App.tsx";
import "./styles/_main.scss";

Sentry.init({
  dsn: "https://12e8b1071e1bb5c9dd44bf9708349442@o573914.ingest.sentry.io/4505928027996160",
  integrations: [new Sentry.Replay()],
  // Session Replay
  replaysSessionSampleRate: import.meta.env.PROD ? 0.05 : 1.0,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>} showDialog>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
