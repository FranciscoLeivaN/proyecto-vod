import { useState, useEffect } from 'react';
import './FeaturedMovie.css';
import movieService from '../../services/movieService';

const FeaturedMovie = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedMovie = async () => {
      try {
        // Obtenemos películas populares y seleccionamos una al azar
        const popularMovies = await movieService.getPopularMovies();
        if (popularMovies && popularMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, popularMovies.length));
          const randomMovie = popularMovies[randomIndex];
          
          // Obtenemos los detalles completos de la película seleccionada
          const movieDetails = await movieService.getMovieDetails(randomMovie.id);
          setMovie(movieDetails);
        }
      } catch (error) {
        console.error('Error loading featured movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovie();
  }, []);

  if (loading) {
    return (
      <div className="featured-movie loading">
        <div className="loading-content">
          <div className="spinner"></div>
          <p>Cargando película destacada...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="featured-placeholder">
        <div className="featured-placeholder-content">
          <div className="placeholder-title"></div>
          <div className="placeholder-meta"></div>
          <div className="placeholder-overview"></div>
          <div className="placeholder-buttons"></div>
        </div>
      </div>
    );
  }

  // URL base para las imágenes de la API
  const backdropPath = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080/141414/E50914?text=VOD+Platform';
  
  return (
    <div className="featured-movie" style={{ backgroundImage: `url(${backdropPath})` }}>
      <div className="featured-overlay">
        <div className="featured-content">
          <h1 className="featured-title">{movie.title}</h1>
          <div className="featured-meta">
            {movie.release_date && (
              <span className="featured-year">{movie.release_date.substring(0, 4)}</span>
            )}
            {movie.vote_average !== undefined && (
              <span className="featured-rating">{movie.vote_average.toFixed(1)}/10</span>
            )}
            {movie.runtime && (
              <span className="featured-runtime">
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
              </span>
            )}
          </div>
          <p className="featured-overview">{movie.overview}</p>
          <div className="featured-buttons">
            <button className="btn btn-play">▶ Reproducir</button>
            <button className="btn btn-more">+ Mi Lista</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
