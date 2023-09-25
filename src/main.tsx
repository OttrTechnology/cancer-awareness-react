import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { GameContextProvider } from "context";
import App from "./App.tsx";
import "./styles/_main.scss";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new Sentry.Replay()],
  // Session Replay
  replaysSessionSampleRate: import.meta.env.PROD ? 0.05 : 1.0,
  replaysOnErrorSampleRate: 1.0,
  enabled: import.meta.env.PROD
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
