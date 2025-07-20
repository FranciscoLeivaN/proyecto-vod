import { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // URL base para las imágenes de la API
  const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropPath = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
  
  return (
    <div 
      className={`movie-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-poster">
        <img 
          src={posterPath} 
          alt={movie.title || movie.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
      </div>
      
      {isHovered && (
        <div className="card-details">
          <div className="card-backdrop">
            <img 
              src={backdropPath} 
              alt={movie.title || movie.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/780x440?text=No+Image';
              }}
            />
          </div>
          
          <div className="card-info">
            <h3 className="card-title">{movie.title || movie.name}</h3>
            <div className="card-meta">
              <span className="card-year">
                {(movie.release_date || movie.first_air_date)?.substring(0, 4)}
              </span>
              <span className="card-rating">{movie.vote_average.toFixed(1)}/10</span>
            </div>
            <p className="card-overview">
              {movie.overview.length > 100
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
            <div className="card-buttons">
              <button className="card-btn play-btn">▶</button>
              <button className="card-btn add-btn">+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
