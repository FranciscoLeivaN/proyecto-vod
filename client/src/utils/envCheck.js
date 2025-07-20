// Este archivo está diseñado para comprobar y advertir sobre problemas de configuración
// durante el inicio de la aplicación

(function checkEnvConfig() {
  // Comprueba si la API key de TMDB está configurada
  if (!import.meta.env.VITE_TMDB_API_TOKEN) {
    console.warn(
      '%c⚠️ API Key de TMDB no encontrada',
      'background: #FFA500; color: #000; padding: 2px 4px; border-radius: 2px; font-weight: bold;',
      '\n\nLa aplicación no podrá cargar datos de películas y series sin una API key válida.\n\n' +
      'Por favor, crea un archivo .env en el directorio client/ con el siguiente contenido:\n' +
      'VITE_TMDB_API_TOKEN=tu_token_de_api_aquí\n\n' +
      'Puedes obtener una API key registrándote en https://www.themoviedb.org'
    );
  } else {
    console.log(
      '%c✅ Configuración de API cargada correctamente',
      'background: #4CAF50; color: #FFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;'
    );
  }
})();

export {};
