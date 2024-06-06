import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import './index.css'
import { Auth0ProviderWithNavigate } from './Auth0'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter >
    <Auth0ProviderWithNavigate>
    <App />
    </Auth0ProviderWithNavigate>
    </HashRouter>
  </React.StrictMode>,
)
