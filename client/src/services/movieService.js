import axios from 'axios';

// API base URL
const API_BASE_URL = 'https://api.themoviedb.org/3';

// Configuración de axios con método de autenticación v4 (bearer token)
const movieAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjYwZTAwNGUzMmNlZTU2NjJmMDIxZjFhNzg4OWIzOSIsIm5iZiI6MTc1MzAzODk0MS4yMzMsInN1YiI6IjY4N2Q0MDVkMGU0ODE4YTk5OTUyOGMwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K4YQ9V6SkxDRmC0TQudpVi00HjjbG0G5ksw2m1hfSrg',
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    language: 'es-ES'
  },
  timeout: 10000 // 10 segundos de timeout
});

// Interceptor para manejar errores
movieAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en solicitud a TMDB API:', error.message);
    // Devolvemos un array vacío para que la UI pueda manejar la falta de datos
    // en lugar de mostrar errores
    return Promise.resolve({ data: { results: [] } });
  }
);

// Servicio para obtener datos de películas
const movieService = {
  // Obtener películas populares
  getPopularMovies: async () => {
    try {
      const response = await movieAPI.get('/movie/popular');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Obtener películas mejor valoradas
  getTopRatedMovies: async () => {
    try {
      const response = await movieAPI.get('/movie/top_rated');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },

  // Obtener películas que se están proyectando actualmente
  getNowPlayingMovies: async () => {
    try {
      const response = await movieAPI.get('/movie/now_playing');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  },

  // Obtener películas próximas a estrenarse
  getUpcomingMovies: async () => {
    try {
      const response = await movieAPI.get('/movie/upcoming');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  // Obtener detalles de una película específica
  getMovieDetails: async (movieId) => {
    try {
      const response = await movieAPI.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching movie details for ID ${movieId}:`, error);
      // Devolvemos un objeto con datos por defecto para evitar errores en la UI
      return {
        id: movieId,
        title: 'Película no disponible',
        backdrop_path: '',
        poster_path: '',
        overview: 'No se pudieron cargar los detalles de esta película.',
        release_date: '',
        vote_average: 0,
        runtime: 0
      };
    }
  },

  // Obtener series populares
  getPopularTVShows: async () => {
    try {
      const response = await movieAPI.get('/tv/popular');
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      throw error;
    }
  }
};

export default movieService;
