import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// Importar verificador de variables de entorno
import './utils/envCheck'
// Importar configuración para GitHub Pages
import { setupGitHubPages } from './utils/githubPagesConfig'

// Inicializar configuración para GitHub Pages
setupGitHubPages();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
