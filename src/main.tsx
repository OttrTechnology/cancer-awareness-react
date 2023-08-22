import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/_main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* TODO wrap App in GameContext Provider */}
    <App />
  </React.StrictMode>,
)
