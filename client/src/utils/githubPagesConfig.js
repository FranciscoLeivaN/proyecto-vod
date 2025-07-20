// Este archivo contiene la configuración para ejecutar la aplicación en GitHub Pages
// Se carga solo cuando se detecta que la aplicación se está ejecutando en GitHub Pages

const isGitHubPages = () => {
  return window.location.hostname.includes('github.io');
};

// Configuraciones específicas para GitHub Pages
export const setupGitHubPages = () => {
  if (isGitHubPages()) {
    console.log('La aplicación está ejecutándose en GitHub Pages');
    
    // Si se está ejecutando en GitHub Pages y no hay un token de API,
    // muestra un mensaje más amigable al usuario
    if (!import.meta.env.VITE_TMDB_API_TOKEN) {
      console.warn(
        '%c⚠️ Ejecutando en GitHub Pages sin API Key',
        'background: #FFA500; color: #000; padding: 2px 4px; border-radius: 2px; font-weight: bold;',
        '\n\nLa aplicación está funcionando en modo demo sin una API key válida para TMDB.\n' + 
        'Algunas funciones relacionadas con películas no estarán disponibles.'
      );
    } else {
      console.log(
        '%c✅ GitHub Pages está configurado correctamente',
        'background: #4CAF50; color: #FFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;'
      );
    }
  }
};

export default { isGitHubPages, setupGitHubPages };
